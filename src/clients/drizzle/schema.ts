import { integer, boolean, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

const combos = pgTable("combos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  isActive: boolean().notNull(),
});

const comboEvents = pgTable("combo_events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  comboId: integer()
    .notNull()
    .references(() => combos.id, { onDelete: "cascade" }),
  eventSlug: varchar("event_slug", { length: 255 }).notNull(),
});

export { combos, comboEvents };