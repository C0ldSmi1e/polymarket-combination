import { z } from "zod";

const ComboSchema = z.object({
  id: z.number(),
  // number, timestamp in ISO format
  createdAt: z.number(),

  name: z.string().min(1).max(100),
  description: z.string().min(0).max(500),
  isActive: z.boolean(),
});

const ComboEvent = z.object({
  comboId: z.number(),
  eventSlug: z.string(),
});

export type Combo = z.infer<typeof ComboSchema>;
export type ComboEvent = z.infer<typeof ComboEvent>;

export { ComboSchema, ComboEvent };