"use client";

import { useState } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { TokenPriceChart } from "@/components/swap/token-price-chart";
import { getTokensArray } from "@/lib/addresses/tokens";
import { Network, type TokenConfig } from "@/lib/addresses/types";

const AVAILABLE_TOKENS: TokenConfig[] = getTokensArray(Network.BASE);

const getInitialTokens = (): { base: TokenConfig | null; quote: TokenConfig | null } => {
  if (AVAILABLE_TOKENS.length === 0) return { base: null, quote: null };
  if (AVAILABLE_TOKENS.length === 1) return { base: AVAILABLE_TOKENS[0], quote: null };
  return { base: AVAILABLE_TOKENS[0], quote: AVAILABLE_TOKENS[1] };
};

export const SwapPage = () => {
  const initial = getInitialTokens();
  const [baseToken, setBaseToken] = useState<TokenConfig | null>(initial.base);
  const [quoteToken, setQuoteToken] = useState<TokenConfig | null>(initial.quote);

  return (
    <PageContainer>
      <section className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-neutral-50">Swap</h1>
          <p className="text-sm text-neutral-400">
            Swap tokens and monitor live market prices with a TradingView-style chart.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
          <TokenPriceChart
            baseToken={baseToken}
            quoteToken={quoteToken}
            onChangeBaseToken={setBaseToken}
            onChangeQuoteToken={setQuoteToken}
          />

          <div className="rounded-none border border-neutral-800 bg-neutral-950 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
              Swap
            </h2>
            <p className="mt-2 text-[11px] text-neutral-500">
              Swap card UI will go here. It will use the selected base/quote tokens from
              the chart.
            </p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
export default SwapPage;
