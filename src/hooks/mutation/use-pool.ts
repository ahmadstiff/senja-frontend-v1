"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { factoryAbi } from "@/lib/abis/factory-abi";
import { erc20Abi, parseUnits } from "viem";
import { config } from "@/lib/config";
import { getContractAddress } from "@/lib/addresses/contracts";
import { Network, type Address } from "@/lib/addresses/types";

type Status = "idle" | "loading" | "success" | "error";

type HexAddress = `0x${string}`;

interface CreatePoolParams {
  collateralTokenAddress: HexAddress;
  borrowTokenAddress: HexAddress;
  borrowTokenDecimals: number;
  ltvValue: string;
  supplyBalance: string;
}

const isUserRejectedError = (error: Error): boolean => {
  const message = error.message.toLowerCase();
  return message.includes("rejected") || message.includes("denied");
};

const QUERY_REFETCH_DELAY = 2000;

export const useCreatePool = () => {
  const queryClient = useQueryClient();
  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([
    { step: 1, status: "idle" },
    { step: 2, status: "idle" },
  ]);

  const [txHash, setTxHash] = useState<HexAddress | null>(null);
  const [approveTxHash, setApproveTxHash] = useState<HexAddress | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      collateralTokenAddress,
      borrowTokenAddress,
      borrowTokenDecimals,
      ltvValue,
      supplyBalance,
    }: CreatePoolParams) => {
      try {
        setSteps([
          { step: 1, status: "idle" },
          { step: 2, status: "idle" },
        ]);

        if (
          !collateralTokenAddress ||
          !borrowTokenAddress ||
          !ltvValue ||
          !supplyBalance
        ) {
          throw new Error("Invalid parameters");
        }

        const network = Network.KAIROS;
        const factoryAddress = getContractAddress(network, "FACTORY");

        if (!factoryAddress) {
          throw new Error(
            "Factory address is not configured for current network"
          );
        }

        const ltvFloat = parseFloat(ltvValue);
        if (isNaN(ltvFloat) || ltvFloat < 0 || ltvFloat > 100) {
          throw new Error("Invalid LTV value. Must be between 0 and 100");
        }
        const ltvBigInt = BigInt(Math.floor(ltvFloat * 1e16));

        const supplyFloat = parseFloat(supplyBalance);
        if (isNaN(supplyFloat) || supplyFloat <= 0) {
          throw new Error("Invalid supply balance. Must be greater than 0");
        }

        const supplyBigInt = parseUnits(supplyBalance, borrowTokenDecimals);

        const baseRate = BigInt(Math.floor(0.05 * 1e16));
        const rateAtOptimal = BigInt(Math.floor(6 * 1e16));
        const optimalUtilization = BigInt(Math.floor(92 * 1e16));
        const maxUtilization = BigInt(Math.floor(100 * 1e16));
        const liquidationThreshold = BigInt(Math.floor(85 * 1e16));
        const liquidationBonus = BigInt(Math.floor(5 * 1e16));

        setSteps([
          { step: 1, status: "loading" },
          { step: 2, status: "idle" },
        ]);

        const approveHash = await writeContract(config, {
          address: borrowTokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [factoryAddress as Address, supplyBigInt],
        });
        setApproveTxHash(approveHash);

        await waitForTransactionReceipt(config, {
          hash: approveHash,
          confirmations: 1,
          pollingInterval: 1000,
        });

        setSteps([
          { step: 1, status: "success" },
          { step: 2, status: "loading" },
        ]);

        const hash = await writeContract(config, {
          address: factoryAddress as Address,
          abi: factoryAbi,
          functionName: "createLendingPool",
          args: [
            {
              collateralToken: collateralTokenAddress,
              borrowToken: borrowTokenAddress,
              ltv: ltvBigInt,
              supplyLiquidity: supplyBigInt,
              baseRate: baseRate,
              rateAtOptimal: rateAtOptimal,
              optimalUtilization: optimalUtilization,
              maxUtilization: maxUtilization,
              liquidationThreshold: liquidationThreshold,
              liquidationBonus: liquidationBonus,
            },
          ],
        });
        setTxHash(hash);

        const result = await waitForTransactionReceipt(config, {
          hash,
          confirmations: 1,
          pollingInterval: 1000,
        });

        setSteps([
          { step: 1, status: "success" },
          { step: 2, status: "success" },
        ]);

        await new Promise((resolve) =>
          setTimeout(resolve, QUERY_REFETCH_DELAY)
        );

        await queryClient.invalidateQueries({
          queryKey: ["pools"],
        });

        return result;
      } catch (e) {
        const error = e as Error;

        if (isUserRejectedError(error)) {
          setSteps([
            { step: 1, status: "idle" },
            { step: 2, status: "idle" },
          ]);
        } else {
          console.error("Error creating pool:", error);

          setSteps((prev) =>
            prev.map((step) => {
              if (step.status === "loading") {
                return { ...step, status: "error", error: error.message };
              }
              return step;
            })
          );
        }

        throw e;
      }
    },
  });

  const reset = () => {
    setSteps([
      { step: 1, status: "idle" },
      { step: 2, status: "idle" },
    ]);
    setTxHash(null);
    setApproveTxHash(null);
    mutation.reset();
  };

  return {
    steps,
    mutation,
    txHash,
    approveTxHash,
    reset,

    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
