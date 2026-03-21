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
      <div className="flex flex-col h-[560px] w-[720px] bg-[#fdfaf6] border border-[#d8c3a8] shadow-sm rounded-xl gap-6 font-semibold text-[20px] py-6 items-center">
        <div className="h-[164px] flex flex-col gap-2">
          <div className="flex justify-between w-[580px]">
            <div className="flex items-center gap-2">
              <Sparkley className="text-[#1f3b5b]" />
              <p>Image Analysis</p>
            </div>
            <button
              onClick={handleReset}
              className="w-12 h-10 border border-[#c9b49a] rounded-md flex justify-center items-center hover:bg-[#e7d5bf]"
            >
              <Reload className="text-[#1f3b5b]" />
            </button>
          </div>
          <p className="text-[#4a5a6b] font-normal text-[14px]">
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
