import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SpecificationSectionProps } from "@/types";

const SpecificationSection: React.FC<SpecificationSectionProps> = ({
  specifications,
  specsList,
  handleSpecsChange,
  addSpecification,
  removeSpec,
  error,
}) => {
  const handleBlur = () => {
    if (specifications.trim()) {
      addSpecification(specifications.trim());
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        id="specification"
        value={specifications}
        onChange={handleSpecsChange}
        placeholder="Spécifications (séparées par des virgules)"
        onBlur={handleBlur}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {specsList.map((spec, index) => (
          <Badge
            key={index}
            variant={"secondary"}
            className="flex items-center bg-primary-foreground text-primary p-1 rounded-sm"
          >
            {spec}
            <button
              type="button"
              className="ml-2"
              onClick={() => removeSpec(index)}
            >
              &times;
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SpecificationSection;
