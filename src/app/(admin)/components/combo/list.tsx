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
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Combos</h1>
        <Link
          href="/admin/combos/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          New Combo
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : combos && combos.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Events</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {combos.map((combo) => (
              <tr key={combo.id} className="border-b border-gray-200">
                <td className="p-2">{combo.id}</td>
                <td className="p-2">
                  <Link
                    href={`/admin/combos/${combo.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {combo.name}
                  </Link>
                </td>
                <td className="p-2">{combo.eventSlugs.length}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs text-white ${
                      combo.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {combo.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-2 text-sm text-gray-600">
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