import { Network, TokensConfig, TokenSymbol, TokenConfig } from "./types";
export const TOKENS: Record<Network, TokensConfig> = {
  [Network.KAIROS]: {
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
      address: "0xEb36AA674745c48381AA3A8074E5485586dBD308",
      oftAddress: "0x1e68394DBd41F77Adf0644CE47b25D1023D664B1", // OFT for cross-chain
    },
    [TokenSymbol.WKAIA]: {
      name: "WKAIA",
      symbol: "WKAIA",
      logo: "/token/usdc.png",
      decimals: 6,
      address: "0xFE4f79Ea2211660A221bed8b4E2de7Eb8579Fe67",
      oftAddress: "0xd506b22a6b3216b736021FA262D0F5D686e07b35", // OFT for cross-chain
    },
    [TokenSymbol.WETH]: {
      name: "Wrapped Ether",
      symbol: "WETH",
      logo: "/token/weth.png",
      decimals: 18,
      address: "0x7B3C20D2B3F8C205f624e62D356354Ed1Ae9F64b",
      oftAddress: "0x31fC86E13108A098830eea63A8A9f6d80DfC89Aa",
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
