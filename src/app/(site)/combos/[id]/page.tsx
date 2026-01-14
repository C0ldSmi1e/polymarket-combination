import { getCombo } from "@/src/actions/server/combos";
import { notFound } from "next/navigation";
import ComboDetail from "./detail";

const ComboDetailPage = async ({
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

  return <ComboDetail combo={combo} />;
};

export default ComboDetailPage;
