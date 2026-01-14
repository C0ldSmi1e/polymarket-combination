import { Combo, ComboForm } from "@/src/schemas/combo";

const getCombos = async (): Promise<Combo[]> => {
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

const createCombo = async (comboData: ComboForm): Promise<Combo> => {
  try {
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
  } catch (error) {
    throw new Error(`Failed to create combo: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

const updateCombo = async (comboId: number, comboData: ComboForm): Promise<Combo> => {
  try {
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
  } catch (error) {
    throw new Error(`Failed to update combo: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};


export { getCombos, createCombo, updateCombo };