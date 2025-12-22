"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Document } from "../../../public/document";
// import uploadgif from ".gif";

export default function ImageUpload() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:168/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.description);
      // console.log("result", result);
    } catch (err) {
      console.error(err);
      console.log("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex-col flex gap-2 items-end">
        <div className="space-y-4">
          <label className="flex h-10 w-145 items-center px-3 py-2 border  rounded-md border-[#E4E4E7] font-medium text-[14px] cursor-pointer">
            <p className="px-2">Choose file</p>
            <p className="font-normal text-[#71717A]">JPG, PNG</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {preview && (
            <div className="w-52 h-35.25 border-[#E4E4E7] rounded-lg border flex justify-center items-center">
              <img
                src={preview}
                alt="preview"
                className="w-50 h-33.25 rounded-lg"
              />
            </div>
          )}
        </div>
        <Button>Generate</Button>
      </div>

      <div className="h-41 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Document />
          <p>Here is the summary</p>
        </div>
        <p className="text-[#71717A] font-normal text-[14px]">
          First, enter your image to recognize an ingredients.
        </p>
        {result && <p> {result}</p>} {loading && <img src="/uploadgif.gif" />}
      </div>
    </div>
  );
}
