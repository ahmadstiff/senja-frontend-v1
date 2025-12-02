import { Network, TokensConfig, TokenSymbol, TokenConfig } from "./types";
export const TOKENS: Record<Network, TokensConfig> = {
  [Network.KAIA]: {
    [TokenSymbol.KAIA]: {
      name: "KAIA",
      symbol: "KAIA",
      logo: "/token/ethereum.png",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000001",
      oftAddress: "0x0000000000000000000000000000000000000000", // OFT for cross-chain
    },
    [TokenSymbol.USDT]: {
      name: "Tether USD",
      symbol: "USDT",
      logo: "/token/usdt.png",
      decimals: 6,
      address: "0x0000000000000000000000000000000000000000",
      oftAddress: "0x0000000000000000000000000000000000000000", // OFT for cross-chain
    },
    [TokenSymbol.USDC]: {
      name: "USD Coin",
      symbol: "USDC",
      logo: "/token/usdc.png",
      decimals: 6,
      address: "0x0000000000000000000000000000000000000000",
      oftAddress: "0x0000000000000000000000000000000000000000", // OFT for cross-chain
    },
    [TokenSymbol.WETH]: {
      name: "Wrapped Ether",
      symbol: "WETH",
      logo: "/token/weth.png",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
      oftAddress: "0x0000000000000000000000000000000000000000",
    },
    [TokenSymbol.WBTC]: {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      logo: "/token/wbtc.png",
      decimals: 8,
      address: "0x0000000000000000000000000000000000000000",
    },
  },
  [Network.BASE]: {
    [TokenSymbol.KAIA]: {
      name: "KAIA",
      symbol: "KAIA",
      logo: "/token/ethereum.png",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000001",
      oftAddress: "0x0000000000000000000000000000000000000000",
    },
    [TokenSymbol.USDT]: {
      name: "Tether USD",
      symbol: "USDT",
      logo: "/token/usdt.png",
      decimals: 6,
      address: "0xd61F31154bF292c7bE2fD81fAc9810f6d93Ecc2B", // mock usdt
      oftAddress: "0x0000000000000000000000000000000000000000",
    },
    [TokenSymbol.USDC]: {
      name: "USD Coin",
      symbol: "USDC",
      logo: "/token/usdc.png",
      decimals: 6,
      address: "0xD2E0F459A2518b9459B9b11dB5Aa014F0BF622A7", // mock wkaia
      oftAddress: "0x0000000000000000000000000000000000000000",
    },
    [TokenSymbol.WETH]: {
      name: "Wrapped Ether",
      symbol: "WETH",
      logo: "/token/weth.png",
      decimals: 18,
      address: "0x7954270F038BFaE7760cCF8D9094745d3E9cf4A3", // mock weth
      oftAddress: "0x0000000000000000000000000000000000000000",
    },
    [TokenSymbol.WBTC]: {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      logo: "/token/wbtc.png",
      decimals: 8,
      address: "0x6AE5E129054a5dBFCeBb9Dfcb1CE1AA229fB1Ddb",
      oftAddress: "0x0000000000000000000000000000000000000000",
    },
  },
};

// get token by network and symbol
export const getToken = (
  network: Network,
  symbol: TokenSymbol
): TokenConfig => {
  return TOKENS[network][symbol];
};

// get token address by network and symbol
export const getTokenAddress = (
  network: Network,
  symbol: TokenSymbol
): string => {
  return TOKENS[network][symbol].address;
};

// get token OFT address for cross-chain (LayerZero)
export const getTokenOftAddress = (
  network: Network,
  symbol: TokenSymbol
): string | undefined => {
  return TOKENS[network][symbol].oftAddress;
};

// Get all tokens for a specific network
export const getAllTokens = (network: Network): TokensConfig => {
  return TOKENS[network];
};

// get all tokens
export const getTokensArray = (network: Network): TokenConfig[] => {
  return Object.values(TOKENS[network]);
};
