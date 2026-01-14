import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const combos = pgTable("combos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: integer().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  isActive: integer().notNull(),
});

const comboEvents = pgTable("combo_events", {
  comboId: integer()
    .notNull()
    .references(() => combos.id, { onDelete: "cascade" }),
  eventSlug: varchar("event_slug", { length: 255 }).notNull(),
});

export { combos, comboEvents };