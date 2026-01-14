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
    return <div style={{ padding: 20 }}>Loading combos...</div>;
  }

  if (activeCombos.length === 0) {
    return <div style={{ padding: 20 }}>No active combos available.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Active Combos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {activeCombos.map((combo) => (
          <ComboItem key={combo.id} combo={combo} />
        ))}
      </div>
    </div>
  );
};

export default ComboList;