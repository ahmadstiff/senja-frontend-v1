"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatUnits } from "viem";

import { WalletButton } from "@/components/wallet/custom-wallet";
import useUserBalance from "@/hooks/use-balance";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Swap", href: "/swap" },
  { label: "History", href: "/history" },
  { label: "Dashboard", href: "/dashboard" },
];

const BalanceBadge = () => {
  const { address, balance, decimals, symbol, isPending } = useUserBalance();

  if (!address) {
    return null;
  }

  if (isPending) {
    return (
      <div className="navbar__balance navbar__balance--loading">
        <span className="navbar__balance-label">Balance</span>
        <span className="navbar__balance-value">...</span>
      </div>
    );
  }

  if (!balance || decimals == null) {
    return null;
  }

  const formatted = formatUnits(balance, decimals);

  let displayValue: string;
  try {
    const num = Number(formatted);
    displayValue = Number.isNaN(num) ? formatted : num.toFixed(4);
  } catch {
    displayValue = formatted;
  }

  return (
    <div className="navbar__balance">
      <span className="navbar__balance-label">Balance</span>
      <span className="navbar__balance-value">
        {displayValue} {symbol}
      </span>
    </div>
  );
};

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__left">
          <div className="navbar__brand">
            <span className="navbar__brand-mark" aria-hidden="true" />
            <span className="navbar__brand-text">Senja</span>
          </div>

          <nav className="navbar__nav" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === "/home"
                  ? pathname === "/" || pathname?.startsWith("/home")
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`navbar__link${
                    isActive ? " navbar__link--active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="navbar__right">
          <BalanceBadge />
          <WalletButton />
        </div>
      </div>
    </header>
  );
};
