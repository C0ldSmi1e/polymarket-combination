"use client";

import { useQuery } from "@tanstack/react-query";
import { getCombos } from "@/src/actions/client/combos";
import { Loader2 } from "lucide-react";
import ComboItem from "@/src/app/(site)/components/combos/item";

const ComboList = () => {
  const { data: combos, isLoading } = useQuery({
    queryKey: ["combos"],
    queryFn: () => getCombos(),
    placeholderData: [],
  });

  const activeCombos = combos?.filter((combo) => combo.isActive) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-neutral-500">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        Loading combos...
      </div>
    );
  }

  if (activeCombos.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No active combos available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {activeCombos.map((combo) => (
        <ComboItem key={combo.id} combo={combo} />
      ))}
    </div>
  );
};

export default ComboList;
