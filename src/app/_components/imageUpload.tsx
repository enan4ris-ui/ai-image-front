"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Document } from "../../../public/document";

export default function ImageUpload() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult("");
  };

  const handleGenerate = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "https://ai-image-back.onrender.com/analyze-image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResult(data.description);
    } catch (err) {
      console.error("Failed to analyze image", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex-col flex gap-2  ">
        <div className="space-y-4">
          {!preview && (
            <label className="flex h-10 w-145 items-center px-3 py-2 border rounded-md border-[#E4E4E7] font-medium text-[14px] cursor-pointer">
              <p className="px-2">Choose file</p>
              <p className="font-normal text-[#71717A]">JPG, PNG</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}

          {preview && (
            <div className="w-52 h-35.25 border-[#E4E4E7] rounded-lg border flex align-start justify-start">
              <img
                src={preview}
                alt="preview"
                className="w-50 h-33.25 rounded-lg flex align-start justify-start size-fit"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-145 h-10 gap-2.5 flex align-end justify-end pt-2">
        <Button
          onClick={handleGenerate}
          disabled={!file || loading}
          className="flex align-end justify-end cursor-pointer "
        >
          Generate
        </Button>
      </div>

      <div className="h-41 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Document />
          <p>Here is the summary</p>
        </div>
        {!result && !loading && (
          <p className="font-sans font-normal not-italic text-sm text-[#09090B]">
            First, enter your image to recognize an ingredients.
          </p>
        )}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
          </div>
        )}
        {result && (
          <p className="font-sans font-normal not-italic text-sm border-2 round rounded-lg border-[#E4E4E7]">
            {" "}
            {result}
          </p>
        )}{" "}
      </div>
    </div>
  );
}
