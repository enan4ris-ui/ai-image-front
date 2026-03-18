"use client";

import { useState } from "react";
import { Sparkley } from "@/components/icons/Sparkley";
import { Button } from "@/components/ui/button";
import { Reload } from "@/components/icons/Reload";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import axios from "axios";

export function ImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ai-imageback.onrender.com";

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${apiBaseUrl}/image-creator`, {
        input: prompt,
      });
      setResult(response.data.result);
    } catch (err) {
      console.error("Generation failed:", err);
      setError("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-[720px] w-[580px] bg-[#FFF] gap-6 font-semibold text-[20px] py-6 items-start">
        <div className="h-[164px] flex flex-col gap-2">
          <div className="flex justify-between w-[580px]">
            <div className="flex items-center gap-2">
              <Sparkley />
              <p>Image creator</p>
            </div>
            <button
              onClick={() => {
                setPrompt("");
                setResult("");
                setError("");
              }}
              className="w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center hover:bg-gray-50"
            >
              <Reload />
            </button>
          </div>

          <p className="text-[#71717A] font-normal text-[14px]">
            What image do you want? Describe it briefly.
          </p>

          <div className="flex flex-col gap-2 items-end">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-y border min-h-[156px] border-[#E4E4E7]"
              placeholder="Image description."
            />
            <Button
              disabled={loading || !prompt}
              onClick={handleGenerate}
              className="text-[#FAFAFA] cursor-pointer"
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>

          <div className="h-[164px] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p>Result</p>
            </div>

            {!loading && !result && (
              <p className="text-[#71717A] font-normal text-[14px]">
                First, enter your text to generate an image.
              </p>
            )}

            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
              </div>
            )}

            {!loading && error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {result && (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#71717A]">{prompt}</p>
                <Image
                  src={result}
                  alt="Generated"
                  width={230}
                  height={360}
                  className="rounded-lg border object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
