import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Mode, PoolActionCardProps, Tab } from "./pool-action-card.types";
import {
  resolveActionLabel,
  resolveAssetLogo,
  resolveAssetSymbol,
} from "./pool-action-card-helpers";
import { ActionTabs } from "./pool-action-card-tabs";
import { ModeToggle } from "./pool-action-card-mode-toggle";
import { AmountSection } from "./pool-action-card-amount-section";
import { StatsSection } from "./pool-action-card-stats-section";

export const PoolActionCard = ({
  collateralSymbol,
  borrowSymbol,
  collateralLogoUrl,
  borrowLogoUrl,
}: PoolActionCardProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("Supply");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<Mode>("liquidity");

  const assetSymbol = resolveAssetSymbol(
    activeTab,
    mode,
    collateralSymbol,
    borrowSymbol
  );
  const assetLogoUrl = resolveAssetLogo(
    activeTab,
    mode,
    collateralLogoUrl,
    borrowLogoUrl
  );
  const actionLabel = resolveActionLabel(activeTab);

  const primaryLabel =
    activeTab === "Supply"
      ? `${activeTab} ${mode === "collateral" ? "Collateral" : "Liquidity"}`
      : activeTab;

  return (
    <Card className="flex h-full w-104 flex-col rounded-none border-neutral-800 bg-neutral-950 gap-0 p-4">
      <ActionTabs activeTab={activeTab} onChange={setActiveTab} />

      <CardContent className="flex flex-1 flex-col gap-3 p-0">
        <ModeToggle activeTab={activeTab} mode={mode} onChange={setMode} />

        <AmountSection
          activeTab={activeTab}
          actionLabel={actionLabel}
          assetSymbol={assetSymbol}
          assetLogoUrl={assetLogoUrl}
          amount={amount}
          onAmountChange={setAmount}
        />

        <StatsSection />

        <div className="mt-auto pt-1">
          <Button
            type="button"
            className="h-10 w-full rounded-none bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600"
            onClick={() => {
              if (!amount) {
                setAmount("1");
              }
            }}
          >
            {primaryLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PoolActionCard;
