import { Network, ContractAddresses } from "./types";

export const CONTRACT_ADDRESSES: Record<Network, ContractAddresses> = {
  [Network.KAIA]: {
    FACTORY: "0x0000000000000000000000000000000000000000", 
    HELPER: "0x0000000000000000000000000000000000000000", 
  },
  [Network.BASE]: {
    FACTORY: "0xa8e2E14AA272d360235B9444f8214bA5fa2A2888", 
    HELPER: "0x67165C24A886AAAf1bFA81934e44a2063c6B608C", 
  },
};

export const getContractAddress = (
  network: Network,
  contractName: keyof ContractAddresses
): string | undefined => {
  return CONTRACT_ADDRESSES[network][contractName];
};

export const getContractAddresses = (network: Network): ContractAddresses => {
  return CONTRACT_ADDRESSES[network];
};
