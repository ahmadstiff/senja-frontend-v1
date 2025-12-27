import { useConnection } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "wagmi/actions";
import { config } from "@/lib/config";

const useUserBalance = () => {
  const { address } = useConnection();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      if (!address) return null;
      return await getBalance(config, { address });
    },
    enabled: !!address,
    refetchInterval: 10000,
    staleTime: 5000,
  });

  return {
    address,
    balance: data?.value,
    decimals: data?.decimals,
    symbol: data?.symbol,
    isPending,
    isError,
    refetch,
  };
};

export default useUserBalance;
