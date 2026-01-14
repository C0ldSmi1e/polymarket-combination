"use server";

import { eq } from "drizzle-orm";
import { db } from "@/src/clients/drizzle";
import { combos } from "@/src/clients/drizzle/schema";
import { ComboForm } from "@/src/schemas/combo";


const getCombos = async () => {
  const combosData = await db.select().from(combos);
  return combosData;
};

const getCombo = async (comboId: number) => {
  const comboData = await db.select().from(combos).where(eq(combos.id, comboId));
  return comboData[0];
};

const createCombo = async (comboForm: ComboForm) => {
  const res = await db.insert(combos).values({
    name: comboForm.name,
    description: comboForm.description,
    isActive: comboForm.isActive,
    createdAt: Date.now(),
  }).returning();
  return res[0];
};

const updateCombo = async (comboId: number, comboForm: ComboForm) => {
  const res = await db.update(combos).set({
    name: comboForm.name,
    description: comboForm.description,
    isActive: comboForm.isActive,
  }).where(eq(combos.id, comboId)).returning();
  return res[0];
};

const deleteCombo = async (comboId: number) => {
  await db.delete(combos).where(eq(combos.id, comboId));
};

export { getCombos, getCombo, createCombo, updateCombo, deleteCombo };