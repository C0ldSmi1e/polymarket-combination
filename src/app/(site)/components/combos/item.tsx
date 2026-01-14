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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        background: "#fafafa",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>{combo.name}</h3>
        {combo.description && (
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
            {combo.description}
          </p>
        )}
      </div>

      <div>
        <strong style={{ fontSize: 14 }}>
          Events ({combo.eventSlugs.length}):
        </strong>

        {isLoading ? (
          <p style={{ fontSize: 14, color: "#666" }}>Loading events...</p>
        ) : events.length > 0 ? (
          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 14, color: "#666" }}>No events found.</p>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div
      style={{
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 4,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 500, marginBottom: 8 }}>
        {event.title || event.slug}
      </div>
      {event.markets.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {event.markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 14, color: "#666", margin: 0 }}>No markets</p>
      )}
    </div>
  );
};

const MarketCard = ({ market }: { market: Market }) => {
  const outcomes = market.outcomes;
  const prices = market.outcomePrices;

  return (
    <div
      style={{
        padding: 12,
        border: "1px solid #eee",
        borderRadius: 4,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 500, marginBottom: 8 }}>
        {market.question || "Unnamed market"}
      </div>

      {outcomes.length > 0 && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {outcomes.map((outcome, idx) => {
            const price = prices[idx] ?? 0;
            const percentage = (price * 100).toFixed(1);

            return (
              <div
                key={outcome}
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  background: idx === 0 ? "#e8f5e9" : "#ffebee",
                  fontSize: 14,
                }}
              >
                <span style={{ fontWeight: 500 }}>{outcome}:</span> {percentage}%
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComboItem;
