import { z } from "zod";

const MarketSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date().nullable(),
  question: z.string().nullable(),
  conditionId: z.string(),
  description: z.string().nullable(),
  slug: z.string().nullable(),
  volume: z.number().nullable(),
  liquidity: z.number().nullable(),
  active: z.boolean().nullable(),
  closed: z.boolean().nullable(),
  outcomes: z.array(z.string()),
  outcomePrices: z.array(z.number()),
  clobTokenIds: z.array(z.string()),
});

export type Market = z.infer<typeof MarketSchema>;

export { MarketSchema };