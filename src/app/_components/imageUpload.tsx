import React, { useState, ChangeEvent } from "react";
import { Delete } from "../../../public/delete";
import axios from "axios";

interface Props {
  onFileSelect: (file: File | null, preview: string | null) => void;
}

const ImageUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      setIsUploading(true);

      const response = axios.post(
        "http://localhost:168/image-analysis",
        formData
      );

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Network or unexpected front-end error:", error);
      alert("A network error occurred. Please check your connection.");
    }

    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc(null);
    const inputElement = document.getElementById(
      "file-input"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  return (
    <div className="rounded-md  border-gray-300  flex justify-start">
      {imageSrc ? (
        <div className="image-preview-section">
          <img
            src={imageSrc}
            alt="Uploaded preview"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
          <button onClick={handleRemoveImage}>
            <Delete />
          </button>
        </div>
      ) : (
        <div className="image-upload-section">
          <input
            id="file-input"
            type="file"
            className="text-[14px] text-[#09090B]"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploading}
          />
          {isUploading && <p>Uploading...</p>}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
