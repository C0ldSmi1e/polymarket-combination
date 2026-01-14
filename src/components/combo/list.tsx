"use client";

import { Combo } from "@/src/schemas/combo";
import { useQuery } from "@tanstack/react-query";
import { getCombos } from "@/src/actions/client/combos";

const list = () => {
  const { data: combos } = useQuery({
    queryKey: ["combos"],
    queryFn: () => getCombos(),
    placeholderData: [],
  });

  console.log("Combos:", combos);

  return (
    <div>
      <h1>Combos List</h1>
      <ul>
        {combos?.map((combo: Combo) => (
          <li key={combo.id}>
            ID: {combo.id}, Name: {combo.name}, Active: {combo.isActive ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default list;