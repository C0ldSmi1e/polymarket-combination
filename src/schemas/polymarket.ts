import { z } from "zod";

const MarketSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date().nullable(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
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

const EventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.coerce.date().nullable(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  image: z.string().nullable(),
  icon: z.string().nullable(),
  active: z.boolean().nullable(),
  closed: z.boolean().nullable(),
  liquidity: z.number().nullable(),
  volume: z.number().nullable(),
  markets: z.array(MarketSchema),
});

export type Market = z.infer<typeof MarketSchema>;
export type Event = z.infer<typeof EventSchema>;

export { MarketSchema, EventSchema };