export type Address = `0x${string}`;

export enum Network {
  KAIA = "kaia",
  BASE = "base",
}

export interface TokenConfig {
  name: string;
  symbol: string;
  logo: string;
  decimals: number;
  address: Address;
  oftAddress?: Address; // OFT address for LayerZero cross-chain
}

export enum TokenSymbol {
  KAIA = "KAIA",
  USDT = "USDT",
  USDC = "USDC",
  WETH = "WETH",
  WBTC = "WBTC",
}

export type TokensConfig = {
  [key in TokenSymbol]: TokenConfig;
};

export interface ContractAddresses {
  FACTORY: Address;
  HELPER: Address;
}
