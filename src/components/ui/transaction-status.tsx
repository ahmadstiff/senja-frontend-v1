"use client";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type TransactionStatus = "idle" | "loading" | "pending" | "success" | "error";

export interface TransactionStatusDisplayProps {
  status: TransactionStatus;
  title?: string;
  error?: string | null;
  txHash?: string | null;
  className?: string;
}

export const TransactionStatusDisplay = ({
  status,
  title = "Transaction",
  error,
  txHash,
  className,
}: TransactionStatusDisplayProps) => {
  if (status === "idle") return null;

  const isSuccess = status === "success";
  const isError = status === "error";
  const isPending = status === "pending" || status === "loading";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-none border p-4",
        isSuccess && "border-emerald-800/60 bg-emerald-950/40",
        isError && "border-red-800/60 bg-red-950/40",
        isPending && "border-neutral-800 bg-neutral-900/50",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {isPending && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-blue-400" />}
          {isSuccess && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}
          {isError && <XCircle className="h-4 w-4 shrink-0 text-red-400" />}
          <span className="truncate text-sm font-medium text-neutral-100">{title}</span>
        </div>
        <span
          className={cn(
            "shrink-0 text-xs font-semibold uppercase",
            isSuccess && "text-emerald-400",
            isError && "text-red-400",
            isPending && "text-blue-400"
          )}
        >
          {status}
        </span>
      </div>
      {error && <p className="mt-2 wrap-break-word text-sm text-red-300">{error}</p>}
      {txHash && (
        <div className="mt-2 min-w-0">
          <p className="text-xs text-neutral-400">Transaction Hash:</p>
          <p className="mt-1 break-all font-mono text-xs text-neutral-300">{txHash}</p>
        </div>
      )}
    </div>
  );
};
