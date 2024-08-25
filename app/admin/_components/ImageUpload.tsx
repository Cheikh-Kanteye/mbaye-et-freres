import React from "react";
import { Controller } from "react-hook-form";
import DropInput from "./DropInput";

interface ImageUploadProps {
  control: any;
  images: File[];
  defaultImage?: string;
  handleDrop: (acceptedFiles: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  control,
  images,
  defaultImage,
  handleDrop,
}) => (
  <Controller
    control={control}
    name="images"
    render={({ field }) => (
      <DropInput
        reset={false}
        images={images}
        defaultImage={defaultImage}
        handleDrop={(acceptedFiles: File[]) => {
          handleDrop(acceptedFiles);
          field.onChange(acceptedFiles);
        }}
      />
    )}
  />
);

export default ImageUpload;
