import { Market, Event } from "@/src/schemas/polymarket";
import { safeJsonParse } from "@/src/utils/safe-json-parse";

// Transform external API market data to internal Market schema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformMarket = (raw: any): Market => ({
  id: raw.id,
  createdAt: raw.createdAt ? new Date(raw.createdAt) : null,
  startDate: raw.startDate ? new Date(raw.startDate) : null,
  endDate: raw.endDate ? new Date(raw.endDate) : null,
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

// Transform external API event data to internal Event schema
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformEvent = (raw: any): Event => ({
  id: raw.id,
  slug: raw.slug,
  title: raw.title ?? null,
  description: raw.description ?? null,
  createdAt: raw.createdAt ? new Date(raw.createdAt) : null,
  startDate: raw.startDate ? new Date(raw.startDate) : null,
  endDate: raw.endDate ? new Date(raw.endDate) : null,
  image: raw.image ?? null,
  icon: raw.icon ?? null,
  active: raw.active ?? null,
  closed: raw.closed ?? null,
  liquidity: raw.liquidity ?? null,
  volume: raw.volume ?? null,
  markets: (raw.markets ?? []).map(transformMarket),
});

const getEventBySlug = async (eventSlug: string): Promise<Event | null> => {
  const response = await fetch(
    `/api/polymarket/events/${encodeURIComponent(eventSlug)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch event for slug ${eventSlug}: ${response.statusText}`
    );
  }

  const { data, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  if (!data.event) {
    return null;
  }

  return transformEvent(data.event);
};

export { getEventBySlug };