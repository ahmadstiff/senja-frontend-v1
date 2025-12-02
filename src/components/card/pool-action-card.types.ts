export const TABS = ["Supply", "Borrow", "Repay", "Withdraw"] as const;

export type Tab = (typeof TABS)[number];

export type Mode = "liquidity" | "collateral";

export interface PoolActionCardProps {
  collateralSymbol?: string;
  borrowSymbol?: string;
  collateralLogoUrl?: string;
  borrowLogoUrl?: string;
}
