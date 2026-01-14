"use client";

import Link from "next/link";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { ComboWithEvents } from "@/src/schemas/combo";
import { getEventBySlug } from "@/src/actions/client/polymarket";
import { Event, Market } from "@/src/schemas/polymarket";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Label } from "@/src/components/ui/label";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";

type Selection = {
  marketId: string;
  marketQuestion: string;
  outcome: string;
  price: number;
};

const ComboDetail = ({ combo }: { combo: ComboWithEvents }) => {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [leverage, setLeverage] = useState(1);
  const [betAmount, setBetAmount] = useState(10);

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

  const toggleSelection = (
    marketId: string,
    marketQuestion: string,
    outcome: string,
    price: number
  ) => {
    setSelections((prev) => {
      const existing = prev.find(
        (s) => s.marketId === marketId && s.outcome === outcome
      );
      if (existing) {
        return prev.filter(
          (s) => !(s.marketId === marketId && s.outcome === outcome)
        );
      } else {
        const filtered = prev.filter((s) => s.marketId !== marketId);
        return [...filtered, { marketId, marketQuestion, outcome, price }];
      }
    });
  };

  const isSelected = (marketId: string, outcome: string) => {
    return selections.some(
      (s) => s.marketId === marketId && s.outcome === outcome
    );
  };

  const combinedProbability =
    selections.length > 0
      ? selections.reduce((acc, s) => acc * s.price, 1)
      : 0;

  const potentialPayout =
    combinedProbability > 0
      ? (betAmount * leverage) / combinedProbability
      : 0;

  const potentialProfit = potentialPayout - betAmount * leverage;

  const handleBet = () => {
    if (selections.length === 0) {
      toast.error("Please select at least one outcome");
      return;
    }
    toast.success(
      `Mock bet placed! $${betAmount} x ${leverage}x on ${selections.length} market(s)`
    );
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Combos
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-xl font-semibold">{combo.name}</h1>
            <Badge variant={combo.isActive ? "success" : "danger"}>
              {combo.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          {combo.description && (
            <p className="text-neutral-500">{combo.description}</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-medium text-neutral-700 mb-3">
            Select Outcomes
            {selections.length > 0 && (
              <span className="ml-2 text-neutral-400">
                ({selections.length} selected)
              </span>
            )}
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-neutral-500">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading events...
            </div>
          ) : events.length > 0 ? (
            <div className="flex flex-col gap-4">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isSelected={isSelected}
                  toggleSelection={toggleSelection}
                />
              ))}
            </div>
          ) : (
            <p className="text-neutral-500 text-center py-8">No events found.</p>
          )}
        </div>

        {/* Betting Panel */}
        <Card className="sticky bottom-4 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Place Combo Bet</CardTitle>
          </CardHeader>
          <CardContent>
            {selections.length > 0 && (
              <div className="mb-4 pb-4 border-b border-neutral-100">
                <p className="text-xs text-neutral-500 mb-2">Your selections:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selections.map((s) => (
                    <Badge key={`${s.marketId}-${s.outcome}`} variant="outline">
                      {s.outcome} @ {(s.price * 100).toFixed(0)}%
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="space-y-1.5">
                <Label htmlFor="betAmount">Amount ($)</Label>
                <Input
                  id="betAmount"
                  type="number"
                  min={1}
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value) || 0)}
                  className="w-24"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="leverage">Leverage</Label>
                <Input
                  id="leverage"
                  type="number"
                  min={1}
                  max={10}
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value) || 1)}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-6">
              <div>
                <p className="text-xs text-neutral-500">Combined odds</p>
                <p className="font-medium">
                  {(combinedProbability * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Potential payout</p>
                <p className="font-medium">${potentialPayout.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Potential profit</p>
                <p className="font-medium text-green-600">
                  +${potentialProfit.toFixed(2)}
                </p>
              </div>
              <div className="ml-auto">
                <Button
                  onClick={handleBet}
                  disabled={selections.length === 0}
                  size="lg"
                >
                  Bet ${(betAmount * leverage).toFixed(2)}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const EventCard = ({
  event,
  isSelected,
  toggleSelection,
}: {
  event: Event;
  isSelected: (marketId: string, outcome: string) => boolean;
  toggleSelection: (
    marketId: string,
    marketQuestion: string,
    outcome: string,
    price: number
  ) => void;
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{event.title || event.slug}</CardTitle>
      </CardHeader>
      <CardContent>
        {event.markets.length > 0 ? (
          <div className="flex flex-col gap-3">
            {event.markets.map((market) => (
              <MarketCard
                key={market.id}
                market={market}
                isSelected={isSelected}
                toggleSelection={toggleSelection}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">No markets available</p>
        )}
      </CardContent>
    </Card>
  );
};

const MarketCard = ({
  market,
  isSelected,
  toggleSelection,
}: {
  market: Market;
  isSelected: (marketId: string, outcome: string) => boolean;
  toggleSelection: (
    marketId: string,
    marketQuestion: string,
    outcome: string,
    price: number
  ) => void;
}) => {
  const outcomes = market.outcomes;
  const prices = market.outcomePrices;

  return (
    <div className="p-3 rounded-md bg-neutral-50">
      <p className="text-sm font-medium mb-2">
        {market.question || "Unnamed market"}
      </p>

      {outcomes.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {outcomes.map((outcome, idx) => {
            const price = prices[idx] ?? 0;
            const percentage = (price * 100).toFixed(0);
            const selected = isSelected(market.id, outcome);

            return (
              <button
                key={outcome}
                onClick={() =>
                  toggleSelection(
                    market.id,
                    market.question || "Unnamed",
                    outcome,
                    price
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border transition-colors ${
                  selected
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                {selected && <Check className="h-3 w-3" />}
                <span className="font-medium">{outcome}</span>
                <span className={selected ? "text-neutral-300" : "text-neutral-400"}>
                  {percentage}%
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComboDetail;
