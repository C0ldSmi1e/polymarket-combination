"use server";

import { eq } from "drizzle-orm";
import { db } from "@/src/clients/drizzle";
import { combos, comboEvents } from "@/src/clients/drizzle/schema";
import { ComboForm, ComboWithEvents } from "@/src/schemas/combo";

const getCombos = async (): Promise<ComboWithEvents[]> => {
  const combosData = await db.select().from(combos);
  const eventsData = await db.select().from(comboEvents);

  return combosData.map((combo) => ({
    ...combo,
    eventSlugs: eventsData
      .filter((event) => event.comboId === combo.id)
      .map((event) => event.eventSlug),
  }));
};

const getCombo = async (comboId: number): Promise<ComboWithEvents | undefined> => {
  const comboData = await db.select().from(combos).where(eq(combos.id, comboId));
  if (!comboData[0]) return undefined;

  const eventsData = await db
    .select()
    .from(comboEvents)
    .where(eq(comboEvents.comboId, comboId));

  return {
    ...comboData[0],
    eventSlugs: eventsData.map((event) => event.eventSlug),
  };
};

const createCombo = async (comboForm: ComboForm): Promise<ComboWithEvents> => {
  const [combo] = await db
    .insert(combos)
    .values({
      name: comboForm.name,
      description: comboForm.description,
      isActive: comboForm.isActive,
    })
    .returning();

  if (comboForm.eventSlugs.length > 0) {
    await db.insert(comboEvents).values(
      comboForm.eventSlugs.map((slug) => ({
        comboId: combo.id,
        eventSlug: slug,
      }))
    );
  }

  return {
    ...combo,
    eventSlugs: comboForm.eventSlugs,
  };
};

const updateCombo = async (
  comboId: number,
  comboForm: ComboForm
): Promise<ComboWithEvents> => {
  const [combo] = await db
    .update(combos)
    .set({
      name: comboForm.name,
      description: comboForm.description,
      isActive: comboForm.isActive,
    })
    .where(eq(combos.id, comboId))
    .returning();

  // Delete existing events and insert new ones
  await db.delete(comboEvents).where(eq(comboEvents.comboId, comboId));

  if (comboForm.eventSlugs.length > 0) {
    await db.insert(comboEvents).values(
      comboForm.eventSlugs.map((slug) => ({
        comboId: combo.id,
        eventSlug: slug,
      }))
    );
  }

  return {
    ...combo,
    eventSlugs: comboForm.eventSlugs,
  };
};

const deleteCombo = async (comboId: number) => {
  await db.delete(combos).where(eq(combos.id, comboId));
};

export { getCombos, getCombo, createCombo, updateCombo, deleteCombo };