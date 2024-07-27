import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge"; // Assurez-vous d'avoir un composant Badge
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DropInput from "./DropInput";
import SelectCategory from "./SelectCategory";

const AddProduitForm = () => {
  const [specifications, setSpecifications] = useState("");
  const [specsList, setSpecsList] = useState<string[]>([]);

  const handleSpecsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.includes(",")) {
      const newSpecs = value.split(",").map((spec) => spec.trim());
      setSpecsList((prev) => [...prev, ...newSpecs.filter((spec) => spec)]);
      setSpecifications("");
    } else {
      setSpecifications(value);
    }
  };

  const removeSpec = (index: number) => {
    setSpecsList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form className="grid gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Input id="nom" defaultValue="" placeholder="Nom" />
      </div>
      <SelectCategory />
      <SelectCategory />
      <div className="flex flex-col gap-2">
        <Input
          id="specification"
          value={specifications}
          onChange={handleSpecsChange}
          placeholder="Spécifications (séparées par des virgules)"
        />
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
      <div className="flex flex-col gap-2">
        <Textarea id="description" defaultValue="" placeholder="Description" />
      </div>
      <DropInput />
      <DialogFooter>
        <Button type="submit">Ajouter</Button>
      </DialogFooter>
    </form>
  );
};

export default AddProduitForm;
