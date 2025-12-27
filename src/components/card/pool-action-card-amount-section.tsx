import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Tab } from "./pool-action-card.types";

interface AmountSectionProps {
  activeTab: Tab;
  actionLabel: string;
  assetSymbol: string;
  assetLogoUrl?: string;
  amount: string;
  onAmountChange: (value: string) => void;
}

export const AmountSection = ({
  activeTab,
  actionLabel,
  assetSymbol,
  assetLogoUrl,
  amount,
  onAmountChange,
}: AmountSectionProps) => {
  if (
    activeTab === "Supply" ||
    activeTab === "Withdraw" ||
    activeTab === "Repay"
  ) {
    return (
      <div className="space-y-3 border border-neutral-800 bg-neutral-900 p-4 text-xs text-neutral-300">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-200">
            {actionLabel} {assetSymbol}
          </span>
          {assetLogoUrl && (
            <Image
              src={assetLogoUrl}
              alt={assetSymbol}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full"
            />
          )}
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className="h-10 w-full bg-transparent text-3xl font-semibold text-neutral-500 outline-none placeholder:text-neutral-700"
          />
          <Button
            type="button"
            onClick={() => onAmountChange("100")}
            className="h-7 rounded-none bg-neutral-800 px-3 text-[11px] font-medium text-neutral-100 hover:bg-neutral-700"
          >
            MAX
          </Button>
        </div>

        <span className="text-[11px] text-neutral-500">
          Wallet: 0.00 {assetSymbol}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2 border border-neutral-800 bg-neutral-900 p-3 text-xs text-neutral-300">
      <div className="border border-neutral-700 bg-neutral-950 px-3 py-3">
        <div className="grid grid-cols-[1fr_auto] items-start gap-x-3 gap-y-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-100">
              {actionLabel} {assetSymbol}
            </span>
          </div>

          <div className="flex justify-end">
            {assetLogoUrl && (
              <Image
                src={assetLogoUrl}
                alt={assetSymbol}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
            )}
          </div>

          <div className="col-span-1">
            <input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.00"
              className="h-9 w-full bg-transparent text-2xl font-semibold text-neutral-400 outline-none placeholder:text-neutral-600"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => onAmountChange("100")}
              className="h-7 rounded-none bg-neutral-800 px-3 text-[11px] font-medium text-neutral-100 hover:bg-neutral-700"
            >
              MAX
            </Button>
          </div>
        </div>
      </div>
      <span className="text-[11px] text-neutral-500">
        Wallet: 0.00 {assetSymbol}
      </span>
    </div>
  );
};
