"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import Dropzone from "react-dropzone";
import Image from "next/image";

const DropInput = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [".jpeg", ".jpg", ".png", ".gif"] }}
        multiple
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
                  Glissez et déposez une image ici, ou cliquez pour sélectionner
                  un fichier
                </p>
              </div>
            </section>
          );
        }}
      </Dropzone>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {images.map((file, index) => (
          <div key={index} className="relative w-full h-24">
            <Image
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropInput;
