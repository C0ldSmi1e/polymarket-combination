"use client";

import Form from "@/src/app/(admin)/components/combo/form";
import { ComboWithEvents } from "@/src/schemas/combo";

const EditComboClient = ({ combo }: { combo: ComboWithEvents }) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Combo</h1>
      <Form combo={combo} />
    </div>
  );
};

export default EditComboClient;
