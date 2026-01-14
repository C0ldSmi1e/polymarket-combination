"use client";

import { useQueries } from "@tanstack/react-query";
import { ComboWithEvents } from "@/src/schemas/combo";
import { getEventBySlug } from "@/src/actions/client/polymarket";
import { Event, Market } from "@/src/schemas/polymarket";

const ComboItem = ({ combo }: { combo: ComboWithEvents }) => {
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
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
      <div className="mb-3">
        <h3 className="font-semibold">{combo.name}</h3>
        {combo.description && (
          <p className="mt-1 text-gray-600 text-sm">{combo.description}</p>
        )}
      </div>

      <div>
        <strong className="text-sm">Events ({combo.eventSlugs.length}):</strong>

        {isLoading ? (
          <p className="text-sm text-gray-600">Loading events...</p>
        ) : events.length > 0 ? (
          <div className="mt-2 flex flex-col gap-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="p-3 border border-gray-300 rounded bg-white">
      <div className="font-medium mb-2">{event.title || event.slug}</div>
      {event.markets.length > 0 ? (
        <div className="flex flex-col gap-2">
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
      <div className="font-medium mb-2">{market.question || "Unnamed market"}</div>

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
                <span className="font-medium">{outcome}:</span> {percentage}%
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComboItem;
