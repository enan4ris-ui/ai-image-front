// import { ChangeEvent, useState } from "react";

// export default function ImageUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [imageSrc, setImageSrc] = useState("");

//   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//       setImageSrc(URL.createObjectURL(e.target.files[0]));
//     }
//   }

//   return (
//     <div className="space-y-2">
//       <input type="file" className="text-[14px]" onChange={handleFileChange} />
//       {imageSrc && (
//         <div className="mb-2 text-sm">
//           <img
//             src={imageSrc}
//             alt="Uploaded preview"
//             style={{ maxWidth: "208px", maxHeight: "141px" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, ChangeEvent } from "react";
import { Delete } from "../../../public/delete";
const ImageUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

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
    <div className="rounded-md border border-gray-300 flex justify-start">
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
