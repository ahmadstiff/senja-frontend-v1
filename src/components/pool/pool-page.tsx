"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import CardSupply from "@/components/card/supply-card";
import { usePoolByAddress } from "@/hooks/use-pools";
import { formatCompactNumber, formatLtvFromRaw } from "@/lib/format/pool";
import { PageContainer } from "@/components/layout/page-container";

const buildMockStats = (indexSeed: number) => {
  const totalLiquidity = 1_000_000 + indexSeed * 50_000;
  const totalBorrow = 400_000 + indexSeed * 25_000;
  const supplyApy = 4 + indexSeed * 0.2;
  const borrowApy = 6 + indexSeed * 0.25;

  return { totalLiquidity, totalBorrow, supplyApy, borrowApy };
};

export const PoolPage = () => {
  const params = useParams<{ poolAddress: string }>();
  const poolAddress = params.poolAddress;

  const { data: pool, isLoading, isError } = usePoolByAddress(poolAddress);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-300 lg:px-8">
        Loading pool...
      </div>
    );
  }

  if (isError || !pool) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-red-300 lg:px-8">
        Pool not found.
      </div>
    );
  }

  const indexSeed = 1; 
  const stats = buildMockStats(indexSeed);

  return (
    <PageContainer>
      <div className="flex flex-col gap-8 lg:flex-row">
        <section className="flex-1 space-y-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-16">
                <div className="absolute left-0 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-neutral-800 bg-neutral-950">
                  <Image
                    src={pool.collateral.logoUrl}
                    alt={pool.collateral.symbol}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="absolute right-0 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-neutral-800 bg-neutral-950">
                  <Image
                    src={pool.borrow.logoUrl}
                    alt={pool.borrow.symbol}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-neutral-50">
                  {pool.collateral.symbol} / {pool.borrow.symbol}
                </h1>
                <p className="text-xs text-neutral-500">
                  Pool address: {pool.lendingPool}
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-4 border border-neutral-800 bg-neutral-950/80 p-4 text-sm text-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-xs text-neutral-500">Total Liquidity</div>
              <div className="mt-1 text-base font-semibold text-neutral-50">
                ${formatCompactNumber(stats.totalLiquidity)}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">Total Borrow</div>
              <div className="mt-1 text-base font-semibold text-neutral-50">
                ${formatCompactNumber(stats.totalBorrow)}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">Supply APY</div>
              <div className="mt-1 text-base font-semibold text-emerald-400">
                {stats.supplyApy.toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">Borrow APY</div>
              <div className="mt-1 text-base font-semibold text-sky-400">
                {stats.borrowApy.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="space-y-4 border border-neutral-800 bg-neutral-950/80 p-4 text-sm text-neutral-300">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">LTV</span>
              <span className="font-medium text-neutral-50">
                {formatLtvFromRaw(pool.ltv)}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-500">
            lopor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
            </p>
          </div>
        </section>

        <aside className="w-full shrink-0 lg:w-104">
          <div className="sticky top-24">
            <CardSupply
              collateralSymbol={pool.collateral.symbol}
              borrowSymbol={pool.borrow.symbol}
              collateralLogoUrl={pool.collateral.logoUrl}
              borrowLogoUrl={pool.borrow.logoUrl}
            />
          </div>
        </aside>
      </div>
    </PageContainer>
  );
};
