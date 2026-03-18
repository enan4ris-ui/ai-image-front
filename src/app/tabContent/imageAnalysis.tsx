"use client";

import { Sparkley } from "@/components/icons/Sparkley";
import { Reload } from "@/components/icons/Reload";
import ImageUpload from "../_components/imageUpload";
import { useState } from "react";

export function ImageAnalysis() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleReset = () => {
    setResult("");
    setLoading(false);
    setPreview(null);
    setFile(null);
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-[720px] w-[580px] bg-[#FFF] gap-6 font-semibold text-[20px] py-6 items-start">
        <div className="h-[164px] flex flex-col gap-2">
          <div className="flex justify-between w-[580px]">
            <div className="flex items-center gap-2">
              <Sparkley />
              <p>Image Analysis</p>
            </div>
            <button
              onClick={handleReset}
              className="w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center hover:bg-gray-50"
            >
              <Reload />
            </button>
          </div>
          <p className="text-[#71717A] font-normal text-[14px]">
            Upload a photo, and AI will detect the ingredients.
          </p>
          <div className="flex-col flex gap-2 ">
            <div className="rounded-md flex items-start justify-start">
              <ImageUpload
                result={result}
                setResult={setResult}
                loading={loading}
                setLoading={setLoading}
                preview={preview}
                setPreview={setPreview}
                file={file}
                setFile={setFile}
                error={error}
                setError={setError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
