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
    <form onSubmit={onSubmit} className="max-w-md">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          maxLength={100}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">
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
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2">
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

      <div className="mb-4">
        <label className="block mb-1">Event Slugs</label>
        <div className="flex gap-2 mb-2">
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
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={addEventSlug}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Add
          </button>
        </div>
        {formData.eventSlugs.length > 0 && (
          <ul className="space-y-1">
            {formData.eventSlugs.map((slug) => (
              <li
                key={slug}
                className="flex justify-between items-center p-2 border border-gray-200 rounded"
              >
                <span>{slug}</span>
                <button
                  type="button"
                  onClick={() => removeEventSlug(slug)}
                  className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-white rounded ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Saving..." : combo ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;