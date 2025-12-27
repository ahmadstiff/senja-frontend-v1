import { NextRequest, NextResponse } from "next/server";

const BINANCE_KLINES_URL = "https://api4.binance.com/api/v3/klines";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const interval = searchParams.get("interval") ?? "1h";
  const limit = searchParams.get("limit") ?? "100";

  if (!symbol) {
    return NextResponse.json(
      { error: "Missing required 'symbol' query parameter" },
      { status: 400 },
    );
  }

  const url = `${BINANCE_KLINES_URL}?symbol=${encodeURIComponent(
    symbol,
  )}&interval=${encodeURIComponent(interval)}&limit=${encodeURIComponent(limit)}`;

  try {
    const res = await fetch(url, {
      // Cache for 60 seconds on the server; adjust as needed
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          error: "Failed to fetch klines from Binance",
          status: res.status,
          body: text,
        },
        { status: 502 },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error proxying Binance klines:", err);
    return NextResponse.json(
      { error: "Error fetching klines from Binance" },
      { status: 500 },
    );
  }
}
