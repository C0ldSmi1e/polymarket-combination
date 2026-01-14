import { ComboForm, ComboWithEvents } from "@/src/schemas/combo";

const getCombos = async (): Promise<ComboWithEvents[]> => {
  try {
    const response = await fetch("/api/combos");
    if (!response.ok) {
      throw new Error("Failed to fetch combos");
    }
    const { data } = await response.json();
    return data.combos;
  } catch (error) {
    console.error("Error fetching combos:", error);
    return [];
  }
};

const getCombo = async (comboId: number): Promise<ComboWithEvents | null> => {
  try {
    const response = await fetch(`/api/combos/${comboId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch combo");
    }
    const { data } = await response.json();
    return data.combo;
  } catch (error) {
    console.error("Error fetching combo:", error);
    return null;
  }
};

const createCombo = async (comboData: ComboForm): Promise<ComboWithEvents> => {
  const response = await fetch("/api/combos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comboData),
  });

  if (!response.ok) {
    throw new Error("Failed to create combo");
  }

  const { data } = await response.json();
  return data.combo;
};

const updateCombo = async (
  comboId: number,
  comboData: ComboForm
): Promise<ComboWithEvents> => {
  const response = await fetch(`/api/combos/${comboId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comboData),
  });

  if (!response.ok) {
    throw new Error("Failed to update combo");
  }

  const { data } = await response.json();
  return data.combo;
};

const deleteCombo = async (comboId: number): Promise<void> => {
  const response = await fetch(`/api/combos/${comboId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete combo");
  }
};

export { getCombos, getCombo, createCombo, updateCombo, deleteCombo };