"use client";

import { ComboForm, ComboWithEvents } from "@/src/schemas/combo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createCombo, updateCombo } from "@/src/actions/client/combos";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Plus, X, Loader2 } from "lucide-react";

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
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
              placeholder="Enter combo name"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              maxLength={500}
              rows={3}
              placeholder="Enter description (optional)"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="h-4 w-4 rounded border-neutral-300"
            />
            <Label htmlFor="isActive" className="font-normal">
              Active
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-1.5">
            <Label>Event Slugs</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="Enter Polymarket event slug"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addEventSlug();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addEventSlug}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-neutral-500">
              Enter the event slug from the Polymarket URL
            </p>
          </div>

          {formData.eventSlugs.length > 0 && (
            <ul className="space-y-2">
              {formData.eventSlugs.map((slug) => (
                <li
                  key={slug}
                  className="flex items-center justify-between gap-2 p-2 rounded-md bg-neutral-50 text-sm"
                >
                  <span className="truncate">{slug}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEventSlug(slug)}
                    className="h-7 w-7 p-0 text-neutral-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
          {isSubmitting ? "Saving..." : combo ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Form;
