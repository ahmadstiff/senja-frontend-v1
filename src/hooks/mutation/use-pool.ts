"use client";

import { useState } from "react";
import { useChainId } from "wagmi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";

import { factoryAbi } from "@/lib/abis/factory-abi";
import { config } from "@/lib/config";
import { getContractAddress } from "@/lib/addresses/contracts";
import { Network, type Address } from "@/lib/addresses/types";

type Status = "idle" | "loading" | "success" | "error";

type HexAddress = `0x${string}`;

interface CreatePoolParams {
  collateralTokenAddress: HexAddress;
  borrowTokenAddress: HexAddress;
  ltvValue: string;
}


const isUserRejectedError = (error: Error): boolean => {
  const message = error.message.toLowerCase();
  return message.includes("rejected") || message.includes("denied");
};

export const useCreatePool = () => {
  const chainId = useChainId();
  const queryClient = useQueryClient();

  const [steps, setSteps] = useState<
    Array<{
      step: number;
      status: Status;
      error?: string;
    }>
  >([
    {
      step: 1,
      status: "idle",
    },
  ]);

  const [txHash, setTxHash] = useState<HexAddress | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      collateralTokenAddress,
      borrowTokenAddress,
      ltvValue,
    }: CreatePoolParams) => {
      try {
        setSteps([{ step: 1, status: "idle" }]);

        if (!collateralTokenAddress || !borrowTokenAddress || !ltvValue) {
          throw new Error("Invalid parameters");
        }

        // Saat ini kita hanya mendukung jaringan BASE
        const network = Network.BASE;
        const factoryAddress = getContractAddress(network, "FACTORY");

        if (!factoryAddress) {
          throw new Error("Factory address is not configured for current network");
        }

        const ltvFloat = parseFloat(ltvValue);
        if (isNaN(ltvFloat) || ltvFloat < 0 || ltvFloat > 100) {
          throw new Error("Invalid LTV value. Must be between 0 and 100");
        }
        const ltvBigInt = BigInt(Math.floor(ltvFloat * 1e16));

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "loading" };
            }
            return item;
          })
        );

        const hash = await writeContract(config, {
          address: factoryAddress as Address,
          abi: factoryAbi,
          functionName: "createLendingPool",
          args: [collateralTokenAddress, borrowTokenAddress, ltvBigInt],
        });
        setTxHash(hash);

        const result = await waitForTransactionReceipt(config, {
          hash,
        });

        setSteps((prev) =>
          prev.map((item) => {
            if (item.step === 1) {
              return { ...item, status: "success" };
            }
            return item;
          })
        );

        queryClient.invalidateQueries({
          queryKey: ["pools"],
        });

        return result;
      } catch (e) {
        const error = e as Error;

        if (isUserRejectedError(error)) {
          setSteps([{ step: 1, status: "idle" }]);
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
    setSteps([{ step: 1, status: "idle" }]);
    setTxHash(null);
    mutation.reset();
  };

  return { steps, mutation, txHash, reset };
};
