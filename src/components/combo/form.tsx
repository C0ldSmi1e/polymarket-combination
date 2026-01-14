import { Combo, ComboForm } from "@/src/schemas/combo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { createCombo, updateCombo } from "@/src/actions/client/combos";

const Form = ({ combo } : { combo?: Combo }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<ComboForm>(combo || {
    name: "",
    description: "",
    isActive: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCancel = () => {
    if (combo) {
      router.push(`/admin/combos/${combo.id}`);
    } else {
      router.push("/admin/combos");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.name.trim() === "") {
        throw new Error("Name is required");
      }

      const newCombo = await (combo ? updateCombo(combo.id, formData) : createCombo(formData));
      toast.success(combo ? "Combo updated successfully" : "Combo created successfully");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/admin/combos/${newCombo.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div>Form Component</div>;
};

export default Form;