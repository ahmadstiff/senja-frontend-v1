export const StatsSection = () => {
  return (
    <div className="space-y-1 border border-neutral-800 bg-neutral-900 p-3 text-[11px] text-neutral-400">
      <div className="flex items-center justify-between">
        <span>Supply APY</span>
        <span className="font-medium text-emerald-400">4.23%</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Collateral factor</span>
        <span className="font-medium text-neutral-100">75% LTV</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Health factor (after)</span>
        <span className="font-medium text-neutral-100">1.00 1.25</span>
      </div>
    </div>
  );
};
