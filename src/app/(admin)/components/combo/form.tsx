"use client";

import { ComboForm, ComboWithEvents } from "@/src/schemas/combo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createCombo, updateCombo } from "@/src/actions/client/combos";

const Form = ({ combo }: { combo?: ComboWithEvents }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<ComboForm>({
    name: combo?.name || "",
    description: combo?.description || "",
    isActive: combo?.isActive || false,
    eventSlugs: combo?.eventSlugs || [],
  });

  const [newSlug, setNewSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCancel = () => {
    if (combo) {
      router.push(`/admin/combos/${combo.id}`);
    } else {
      router.push("/admin/combos");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.name.trim() === "") {
        throw new Error("Name is required");
      }

      const newCombo = await (combo
        ? updateCombo(combo.id, formData)
        : createCombo(formData));
      toast.success(
        combo ? "Combo updated successfully" : "Combo created successfully"
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/admin/combos/${newCombo.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addEventSlug = () => {
    const slug = newSlug.trim();
    if (slug && !formData.eventSlugs.includes(slug)) {
      setFormData((prev) => ({
        ...prev,
        eventSlugs: [...prev.eventSlugs, slug],
      }));
      setNewSlug("");
    }
  };

  const removeEventSlug = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      eventSlugs: prev.eventSlugs.filter((s) => s !== slug),
    }));
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 500 }}>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          maxLength={100}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="description"
          style={{ display: "block", marginBottom: 4 }}
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          maxLength={500}
          rows={4}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
          />
          Active
        </label>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Event Slugs</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="Enter event slug"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addEventSlug();
              }
            }}
            style={{
              flex: 1,
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          <button
            type="button"
            onClick={addEventSlug}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
        {formData.eventSlugs.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {formData.eventSlugs.map((slug) => (
              <li
                key={slug}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 8,
                  border: "1px solid #eee",
                  borderRadius: 4,
                  marginBottom: 4,
                }}
              >
                <span>{slug}</span>
                <button
                  type="button"
                  onClick={() => removeEventSlug(slug)}
                  style={{
                    padding: "4px 8px",
                    border: "none",
                    background: "#ff4444",
                    color: "white",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "8px 16px",
            border: "none",
            background: isSubmitting ? "#ccc" : "#0070f3",
            color: "white",
            borderRadius: 4,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Saving..." : combo ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            background: "white",
            borderRadius: 4,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;