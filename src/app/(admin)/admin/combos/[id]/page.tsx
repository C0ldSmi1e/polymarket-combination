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
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/admin/combos">&larr; Back to Combos</Link>
      </div>

      <h1>{combo.name}</h1>

      <div style={{ marginBottom: 16 }}>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: 4,
            background: combo.isActive ? "#22c55e" : "#ef4444",
            color: "white",
            fontSize: 14,
          }}
        >
          {combo.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>Description:</strong>
        <p>{combo.description || "No description"}</p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>Created:</strong>
        <p>{combo.createdAt.toLocaleString()}</p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>Event Slugs ({combo.eventSlugs.length}):</strong>
        {combo.eventSlugs.length > 0 ? (
          <ul style={{ margin: "8px 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
            {combo.eventSlugs.map((slug) => (
              <Link href={`https://www.polymarket.com/event/${slug}`} key={slug} target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3", textDecoration: "underline" }}>
                {slug}
              </Link>
            ))}
          </ul>
        ) : (
          <p>No event slugs</p>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Link
          href={`/admin/combos/${combo.id}/edit`}
          style={{
            padding: "8px 16px",
            background: "#0070f3",
            color: "white",
            borderRadius: 4,
            textDecoration: "none",
          }}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ComboDetailPage;
