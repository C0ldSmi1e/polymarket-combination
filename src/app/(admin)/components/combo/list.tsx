"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCombos } from "@/src/actions/client/combos";

const List = () => {
  const { data: combos, isLoading } = useQuery({
    queryKey: ["combos"],
    queryFn: () => getCombos(),
    placeholderData: [],
  });

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1>Combos</h1>
        <Link
          href="/admin/combos/new"
          style={{
            padding: "8px 16px",
            background: "#0070f3",
            color: "white",
            borderRadius: 4,
            textDecoration: "none",
          }}
        >
          New Combo
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : combos && combos.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ padding: 8 }}>ID</th>
              <th style={{ padding: 8 }}>Name</th>
              <th style={{ padding: 8 }}>Events</th>
              <th style={{ padding: 8 }}>Status</th>
              <th style={{ padding: 8 }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {combos.map((combo) => (
              <tr key={combo.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 8 }}>{combo.id}</td>
                <td style={{ padding: 8 }}>
                  <Link
                    href={`/admin/combos/${combo.id}`}
                    style={{ color: "#0070f3" }}
                  >
                    {combo.name}
                  </Link>
                </td>
                <td style={{ padding: 8 }}>{combo.eventSlugs.length}</td>
                <td style={{ padding: 8 }}>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: combo.isActive ? "#22c55e" : "#ef4444",
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    {combo.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: 8, fontSize: 14, color: "#666" }}>
                  {new Date(combo.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No combos yet.</p>
      )}
    </div>
  );
};

export default List;