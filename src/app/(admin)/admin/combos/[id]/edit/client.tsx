"use client";

import Form from "@/src/app/(admin)/components/combo/form";
import { ComboWithEvents } from "@/src/schemas/combo";

const EditComboClient = ({ combo }: { combo: ComboWithEvents }) => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Combo</h1>
      <Form combo={combo} />
    </div>
  );
};

export default EditComboClient;
