"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { ComboWithEvents } from "@/src/schemas/combo";
import { getEventBySlug } from "@/src/actions/client/polymarket";
import { Event } from "@/src/schemas/polymarket";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ArrowRight, Loader2 } from "lucide-react";

const ComboItem = ({ combo }: { combo: ComboWithEvents }) => {
  const eventQueries = useQueries({
    queries: combo.eventSlugs.map((slug) => ({
      queryKey: ["event", slug],
      queryFn: () => getEventBySlug(slug),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const isLoading = eventQueries.some((q) => q.isLoading);
  const events = eventQueries
    .filter((q) => q.data)
    .map((q) => q.data as Event);

  return (
    <Card className="hover:border-neutral-300 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link href={`/combos/${combo.id}`} className="group">
              <h3 className="font-medium group-hover:text-neutral-600 transition-colors">
                {combo.name}
              </h3>
            </Link>
            {combo.description && (
              <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                {combo.description}
              </p>
            )}

            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">
                  {combo.eventSlugs.length} event{combo.eventSlugs.length !== 1 ? "s" : ""}
                </Badge>
              </div>

              {isLoading ? (
                <div className="flex items-center text-sm text-neutral-400">
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  Loading events...
                </div>
              ) : events.length > 0 ? (
                <ul className="text-sm text-neutral-600 space-y-0.5">
                  {events.slice(0, 3).map((event) => (
                    <li key={event.id} className="truncate">
                      {event.title || event.slug}
                    </li>
                  ))}
                  {events.length > 3 && (
                    <li className="text-neutral-400">
                      +{events.length - 3} more
                    </li>
                  )}
                </ul>
              ) : null}
            </div>
          </div>

          <Link
            href={`/combos/${combo.id}`}
            className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors shrink-0"
          >
            View
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComboItem;
