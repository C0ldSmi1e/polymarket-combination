"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { ComboWithEvents } from "@/src/schemas/combo";
import { getEventBySlug } from "@/src/actions/client/polymarket";
import { Event, Market } from "@/src/schemas/polymarket";

const ComboDetail = ({ combo }: { combo: ComboWithEvents }) => {
  // Fetch events for all event slugs in parallel
  const eventQueries = useQueries({
    queries: combo.eventSlugs.map((slug) => ({
      queryKey: ["event", slug],
      queryFn: () => getEventBySlug(slug),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  });

  const isLoading = eventQueries.some((q) => q.isLoading);
  const events = eventQueries
    .filter((q) => q.data)
    .map((q) => q.data as Event);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Combos
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2">{combo.name}</h1>
      {combo.description && (
        <p className="text-gray-600 mb-4">{combo.description}</p>
      )}

      <div className="mb-4">
        <span
          className={`px-2 py-1 rounded text-sm text-white ${
            combo.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {combo.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <h2 className="text-lg font-semibold mb-3">
        Events ({combo.eventSlugs.length})
      </h2>

      {isLoading ? (
        <p className="text-gray-600">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No events found.</p>
      )}
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold mb-3">{event.title || event.slug}</h3>
      {event.markets.length > 0 ? (
        <div className="flex flex-col gap-3">
          {event.markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No markets</p>
      )}
    </div>
  );
};

const MarketCard = ({ market }: { market: Market }) => {
  const outcomes = market.outcomes;
  const prices = market.outcomePrices;

  return (
    <div className="p-3 border border-gray-200 rounded bg-white">
      <div className="font-medium mb-2">
        {market.question || "Unnamed market"}
      </div>

      {outcomes.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {outcomes.map((outcome, idx) => {
            const price = prices[idx] ?? 0;
            const percentage = (price * 100).toFixed(1);

            return (
              <div
                key={outcome}
                className={`px-2 py-1 rounded text-sm ${
                  idx === 0 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <span className="font-medium">{outcome}:</span> ${percentage}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComboDetail;
