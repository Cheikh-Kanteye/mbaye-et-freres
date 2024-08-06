import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export function useSpecifications(setValue: UseFormSetValue<any>) {
  const [specifications, setSpecifications] = useState("");
  const [specsList, setSpecsList] = useState<string[]>([]);

  const handleSpecsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecifications(e.target.value);
  };

  const addSpecification = () => {
    if (specifications.trim()) {
      const newSpecs = specifications
        .split(",")
        .map((spec) => spec.trim())
        .filter((spec) => spec);
      setSpecsList((prev) => [...prev, ...newSpecs]);
      setSpecifications(""); // Clear the input field
      setValue("specifications", [...specsList, ...newSpecs], {
        shouldValidate: true,
      });
    }
  };

  const removeSpec = (index: number) => {
    const updatedSpecsList = specsList.filter((_, i) => i !== index);
    setSpecsList(updatedSpecsList);
    setValue("specifications", updatedSpecsList, { shouldValidate: true });
  };

  const resetSpecifications = () => {
    setSpecifications("");
    setSpecsList([]);
    setValue("specifications", [], { shouldValidate: true });
  };

  return {
    specifications,
    specsList,
    handleSpecsChange,
    addSpecification,
    removeSpec,
    resetSpecifications,
  };
}
