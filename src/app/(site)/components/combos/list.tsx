"use client";

import { useQuery } from "@tanstack/react-query";
import { getCombos } from "@/src/actions/client/combos";
import ComboItem from "@/src/app/(site)/components/combos/item";

const ComboList = () => {
  const { data: combos, isLoading } = useQuery({
    queryKey: ["combos"],
    queryFn: () => getCombos(),
    placeholderData: [],
  });

  const activeCombos = combos?.filter((combo) => combo.isActive) ?? [];

  if (isLoading) {
    return <div className="p-5">Loading combos...</div>;
  }

  if (activeCombos.length === 0) {
    return <div className="p-5">No active combos available.</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Active Combos</h2>
      <div className="flex flex-col gap-4">
        {activeCombos.map((combo) => (
          <ComboItem key={combo.id} combo={combo} />
        ))}
      </div>
    </div>
  );
};

export default ComboList;