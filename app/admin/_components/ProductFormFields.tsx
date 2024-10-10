import React from "react";
import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import InputField from "./InputField";
import SelectData from "./SelectData";
import SpecificationSection from "./SpecificationSection";

interface ProductFormFieldsProps {
  register: any;
  control: any;
  handleFamilleChange: (value: string | undefined) => void;
  selectedFamille: string | undefined;
  specifications: string;
  specsList: any[];
  handleSpecsChange: (value: any) => void;
  addSpecification: (spec: string) => void;
  removeSpec: (id: number) => void;
  errors: any;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  register,
  control,
  handleFamilleChange,
  selectedFamille,
  specifications,
  specsList,
  handleSpecsChange,
  addSpecification,
  removeSpec,
  errors,
}) => (
  <div className="grid gap-4 py-4">
    <div className="flex gap-8 items-center">
      <Label>Type</Label>
      <Controller
        control={control}
        name="type"
        rules={{ required: "Le type est requis" }}
        render={({ field }) => (
          <RadioGroup
            value={field.value} // Ajoutez cette ligne pour lier la valeur
            onValueChange={field.onChange} // Assurez-vous que ceci est correctement lié
            className="flex gap-8 items-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="produit" id="r1" />
              <Label htmlFor="r1">Produit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accessoire" id="r2" />
              <Label htmlFor="r2">Accessoire</Label>
            </div>
          </RadioGroup>
        )}
      />

      {errors.type && <p className="text-red-500">{errors.type.message}</p>}
    </div>

    <InputField
      id="reference"
      label="Référence"
      placeholder="Référence (ex: 5102-AL)"
      register={register("reference", {
        required: "La référence est requise",
      })}
      error={errors.reference?.message}
    />

    <SelectData
      type="familles"
      placeholder="Sélectionner une famille"
      label="Famille"
      value={selectedFamille}
      onChange={handleFamilleChange}
    />
    {errors.idFamille && (
      <p className="text-red-500">{errors.idFamille.message}</p>
    )}

    <SpecificationSection
      specifications={specifications}
      specsList={specsList}
      handleSpecsChange={handleSpecsChange}
      addSpecification={addSpecification}
      removeSpec={removeSpec}
      error={errors.specifications?.message}
    />

    <Textarea
      id="description"
      {...register("description")}
      placeholder="Description"
      className={`border ${
        errors.description ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors.description && (
      <p className="text-red-500">{errors.description.message}</p>
    )}
  </div>
);

export default ProductFormFields;
