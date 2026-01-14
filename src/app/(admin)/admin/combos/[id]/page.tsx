import Link from "next/link";
import { getCombo } from "@/src/actions/server/combos";
import { notFound } from "next/navigation";

const ComboDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const comboId = parseInt(id, 10);

  if (isNaN(comboId)) {
    notFound();
  }

  const combo = await getCombo(comboId);

  if (!combo) {
    notFound();
  }

  return (
    <div className="p-5">
      <div className="mb-4">
        <Link href="/admin/combos" className="text-blue-600 hover:underline">
          &larr; Back to Combos
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">{combo.name}</h1>

      <div className="mb-4">
        <span
          className={`px-2 py-1 rounded text-sm text-white ${
            combo.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {combo.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mb-4">
        <strong>Description:</strong>
        <p>{combo.description || "No description"}</p>
      </div>

      <div className="mb-4">
        <strong>Created:</strong>
        <p>{combo.createdAt.toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <strong>Event Slugs ({combo.eventSlugs.length}):</strong>
        {combo.eventSlugs.length > 0 ? (
          <ul className="mt-2 pl-5 flex flex-col gap-1">
            {combo.eventSlugs.map((slug) => (
              <Link
                href={`https://www.polymarket.com/event/${slug}`}
                key={slug}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {slug}
              </Link>
            ))}
          </ul>
        ) : (
          <p>No event slugs</p>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          href={`/admin/combos/${combo.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ComboDetailPage;
