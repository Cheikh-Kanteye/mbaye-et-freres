"use client";
import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import Dropzone from "react-dropzone";
import Image from "next/image";

interface DropInputProps {
  reset: boolean;
  images: File[];
  defaultImage?: string;
  handleDrop: (acceptedFiles: File[]) => void;
}

const DropInput: React.FC<DropInputProps> = ({
  reset,
  images,
  defaultImage,
  handleDrop,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showDropzone, setShowDropzone] = useState<boolean>(!defaultImage);

  useEffect(() => {
    if (reset) {
      setSelectedImage(null);
      setShowDropzone(true);
      handleDrop([]);
    }
  }, [reset, handleDrop]);

  const handleImageRemove = () => {
    setSelectedImage(null);
    setShowDropzone(true); // Show Dropzone after removing image
    handleDrop([]);
  };

  const handleDropImage = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      setSelectedImage(newFile);
      setShowDropzone(false); // Hide Dropzone after selecting image
      handleDrop(acceptedFiles);
    }
  };

  return (
    <div className="mb-3">
      {selectedImage || (!showDropzone && defaultImage) ? (
        <div className="relative">
          <span
            onClick={handleImageRemove}
            className="absolute top-2 right-2 p-2 aspect-square bg-accent cursor-pointer hover:bg-primary-foreground text-accent-foreground rounded-full"
          >
            <X size={16} />
          </span>
          <div className="relative w-full pointer-events-none">
            <Image
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : defaultImage!
              }
              alt="Selected Image"
              width={60}
              height={60}
              className="rounded-md w-20 aspect-square object-contain"
            />
          </div>
        </div>
      ) : showDropzone ? (
        <Dropzone
          onDrop={handleDropImage}
          accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            const dragStyle = isDragActive
              ? "border-solid border-primary bg-primary-foreground"
              : "border-dashed border-slate-400";
            return (
              <section className={`border p-4 rounded-md ${dragStyle}`}>
                <div
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <input {...getInputProps()} />
                  <Upload />
                  <p className="mt-2 text-sm">
                    Glissez et déposez une image ici, ou cliquez pour
                    sélectionner un fichier
                  </p>
                </div>
              </section>
            );
          }}
        </Dropzone>
      ) : null}
    </div>
  );
};

export default DropInput;
