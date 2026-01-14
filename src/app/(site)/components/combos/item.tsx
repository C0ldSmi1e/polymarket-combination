"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { ComboWithEvents } from "@/src/schemas/combo";
import { getEventBySlug } from "@/src/actions/client/polymarket";
import { Event } from "@/src/schemas/polymarket";

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
        <Link href={`/combos/${combo.id}`} className="hover:underline">
          <h3 className="font-semibold">{combo.name}</h3>
        </Link>
        {combo.description && (
          <p className="mt-1 text-gray-600 text-sm">{combo.description}</p>
        )}
      </div>

      <div className="mb-3">
        <strong className="text-sm">Events ({combo.eventSlugs.length}):</strong>

        {isLoading ? (
          <p className="text-sm text-gray-600">Loading...</p>
        ) : events.length > 0 ? (
          <ul className="mt-1 text-sm text-gray-700">
            {events.map((event) => (
              <li key={event.id}>• {event.title || event.slug}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No events found.</p>
        )}
      </div>

      <Link
        href={`/combos/${combo.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
};

export default ComboItem;
