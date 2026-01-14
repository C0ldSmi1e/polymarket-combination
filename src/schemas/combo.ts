import { z } from "zod";

const ComboSchema = z.object({
  id: z.number(),
  createdAt: z.coerce.date(),
  name: z.string().min(1).max(100),
  description: z.string().min(0).max(500),
  isActive: z.boolean(),
});

const ComboFormSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(0).max(500),
  isActive: z.boolean(),
  eventSlugs: z.array(z.string()).default([]),
});

const ComboWithEventsSchema = ComboSchema.extend({
  eventSlugs: z.array(z.string()),
});

const ComboEventSchema = z.object({
  id: z.number(),
  createdAt: z.coerce.date(),
  comboId: z.number(),
  eventSlug: z.string(),
});

export type Combo = z.infer<typeof ComboSchema>;
export type ComboForm = z.infer<typeof ComboFormSchema>;
export type ComboWithEvents = z.infer<typeof ComboWithEventsSchema>;
export type ComboEvent = z.infer<typeof ComboEventSchema>;

export { ComboSchema, ComboFormSchema, ComboWithEventsSchema, ComboEventSchema };