"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Document } from "@/components/icons/Document";

type ImageUploadProps = {
  result: string;
  setResult: (result: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  preview: string | null;
  setPreview: (preview: string | null) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  error: string;
  setError: (error: string) => void;
};

export default function ImageUpload({
  result,
  setResult,
  loading,
  setLoading,
  preview,
  setPreview,
  file,
  setFile,
  error,
  setError,
}: ImageUploadProps) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://ai-image-back-2.onrender.com";

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const updateWithFile = (nextFile: File) => {
      if (preview) URL.revokeObjectURL(preview);
      setFile(nextFile);
      setPreview(URL.createObjectURL(nextFile));
      setResult("");
      setError("");
    };

    const convertToPng = async (inputFile: File) => {
      try {
        const objectUrl = URL.createObjectURL(inputFile);
        const image = new Image();
        const loaded = new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error("Failed to load image"));
        });
        image.src = objectUrl;
        await loaded;

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Failed to get canvas context");
        ctx.drawImage(image, 0, 0);

        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/png"),
        );
        URL.revokeObjectURL(objectUrl);
        if (!blob) throw new Error("Failed to convert image");
        const pngFile = new File([blob], "upload.png", { type: "image/png" });
        updateWithFile(pngFile);
      } catch (err) {
        console.error("Image conversion failed, using original.", err);
        if (selectedFile) updateWithFile(selectedFile);
      }
    };
    void convertToPng(selectedFile);
  };

  const handleGenerate = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/analyze-image`, {
        method: "POST",
        body: formData,
      });
      console.log("API response status:------", response.status);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Request failed: ${response.status} ${response.statusText} - ${text}`,
        );
      }
      const data = await response.json();
      console.log("API response:---=-------------", data);
      setResult(data.description);
    } catch (err) {
      console.error("Failed to analyze image", err);
      setError("Image analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex-col flex gap-2  ">
        <div className="space-y-4">
          {!preview && (
            <label className="flex h-10 w-[580px] items-center px-3 py-2 border rounded-md border-[#c9b49a] bg-[#fffaf3] font-medium text-[14px] cursor-pointer">
              <p className="px-2">Choose file</p>
              <p className="font-normal text-[#4a5a6b]">JPG, PNG</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
          {preview && (
            <div className="w-52 h-[141px] border-[#c9b49a] rounded-lg border flex items-start justify-start bg-[#fffaf3]">
              <img
                src={preview}
                alt="preview"
                className="w-[200px] h-[133px] rounded-lg object-contain"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-[580px] h-10 gap-2.5 flex items-end justify-end pt-2">
        <Button
          onClick={handleGenerate}
          disabled={!file || loading}
          className="flex items-end justify-end cursor-pointer text-[#f7f3ee] bg-[#1f3b5b] hover:bg-[#24486f]"
        >
          Generate
        </Button>
      </div>
      <div className="h-[164px] flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Document className="text-[#1f3b5b]" />
          <p>Here is the summary</p>
        </div>
        {!result && !loading && (
          <p className="font-sans font-normal not-italic text-sm text-[#4a5a6b]">
            First, enter your image to recognize an ingredients.
          </p>
        )}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
          </div>
        )}
        {!loading && error && <p className="text-sm text-red-600">{error}</p>}
        {result && (
          <p className="font-sans font-normal not-italic text-sm border-2 round rounded-lg border-[#c9b49a] bg-[#fffaf3]">
            {" "}
            {result}
          </p>
        )}{" "}
      </div>
    </div>
  );
}
