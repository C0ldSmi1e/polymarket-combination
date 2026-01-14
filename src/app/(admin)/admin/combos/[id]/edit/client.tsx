"use client";

import Link from "next/link";
import Form from "@/src/app/(admin)/components/combo/form";
import { ComboWithEvents } from "@/src/schemas/combo";
import { ArrowLeft } from "lucide-react";

const EditComboClient = ({ combo }: { combo: ComboWithEvents }) => {
  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <Link
            href={`/admin/combos/${combo.id}`}
            className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Combo
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-6">Edit Combo</h1>
        <Form combo={combo} />
      </main>
    </div>
  );
};

export default EditComboClient;
