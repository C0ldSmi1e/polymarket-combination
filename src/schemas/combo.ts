import { create } from "domain";
import { z } from "zod";
import { id } from "zod/locales";

const ComboSchema = z.object({
  id: z.number(),
  // number, timestamp in ISO format
  createdAt: z.number(),

  name: z.string().min(1).max(100),
  description: z.string().min(0).max(500),
  isActive: z.boolean(),
});

const ComboFormSchema = ComboSchema.omit({
  id: true,
  createdAt: true,
});

const ComboEvent = z.object({
  id: z.number(),
  createdAt: z.number(),
  comboId: z.number(),
  eventSlug: z.string(),
});

export type Combo = z.infer<typeof ComboSchema>;
export type ComboEvent = z.infer<typeof ComboEvent>;
export type ComboForm = z.infer<typeof ComboFormSchema>;

export { ComboSchema, ComboEvent, ComboFormSchema };