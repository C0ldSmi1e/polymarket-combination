import { Market } from "@/src/schemas/polymarket";
import { safeJsonParse } from "@/src/utils/safe-json-parse";

// Transform external API market data to internal Market schema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformMarket = (raw: any): Market => ({
  id: raw.id,
  createdAt: raw.createdAt ? new Date(raw.createdAt) : null,
  question: raw.question ?? null,
  conditionId: raw.conditionId,
  description: raw.description ?? null,
  slug: raw.slug ?? null,
  volume: raw.volume ? parseFloat(raw.volume) : null,
  liquidity: raw.liquidity ? parseFloat(raw.liquidity) : null,
  active: raw.active ?? null,
  closed: raw.closed ?? null,
  outcomes: safeJsonParse<string[]>(raw.outcomes, []),
  outcomePrices: safeJsonParse<string[]>(raw.outcomePrices, []).map(Number),
  clobTokenIds: safeJsonParse<string[]>(raw.clobTokenIds, []),
});

const getMarketsByEventSlug = async (eventSlug: string): Promise<Market[]> => {
  const response = await fetch(
    `https://gamma-api.polymarket.com/events/slug/${encodeURIComponent(
      eventSlug
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch markets for event slug ${eventSlug}: ${response.statusText}`
    );
  }

  const data = await response.json();
  const rawMarkets = data.markets ?? [];

  return rawMarkets.map(transformMarket);
};

export { getMarketsByEventSlug };