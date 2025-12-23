"use client";

import { useState, useEffect } from "react";
import { Sparkley } from "../../../public/sparkley";
import { Button } from "@/components/ui/button";
import { Reload } from "../../../public/reload";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import axios from "axios";

export function ImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  // const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState("");

  useEffect(() => {}, [prompt]);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:168/image-creator", {
        input: prompt,
      });
      console.log(response);
      setResult(response.data.result);
    } catch (err) {
      console.error("Generation failed:", err);
      setResult("failed:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-180 w-145 bg-[#FFF] gap-6 font-semibold text-[20px] py-6 items-start">
        <div className="h-41 flex flex-col gap-2">
          <div className="flex justify-between w-145">
            <div className="flex items-center gap-2">
              <Sparkley />
              <p>Image creator</p>
            </div>
            <button
              onClick={() => {
                setPrompt("");
                // setImage(null);
              }}
              className="w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center"
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

          <div className="h-41 flex flex-col gap-2">
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
