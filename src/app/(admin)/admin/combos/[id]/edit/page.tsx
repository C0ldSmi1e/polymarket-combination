import { getCombo } from "@/src/actions/server/combos";
import { notFound } from "next/navigation";
import EditComboClient from "./client";

const EditComboPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const comboId = parseInt(id, 10);

  if (isNaN(comboId)) {
    notFound();
  }

  const combo = await getCombo(comboId);

  if (!combo) {
    notFound();
  }

  return <EditComboClient combo={combo} />;
};

export default EditComboPage;
