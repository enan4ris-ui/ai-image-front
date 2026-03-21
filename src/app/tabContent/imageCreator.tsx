"use client";

import { useState } from "react";
import { Sparkley } from "@/components/icons/Sparkley";
import { Button } from "@/components/ui/button";
import { Reload } from "@/components/icons/Reload";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

export function ImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://ai-image-back-2.onrender.com";

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const cleanedPrompt = prompt.trim();
      if (!cleanedPrompt) {
        setError("Please enter a prompt before generating.");
        return;
      }

      const response = await axios.post(`${apiBaseUrl}/image-creator`, {
        input: cleanedPrompt,
        prompt: cleanedPrompt,
      });

      const candidate =
        response.data?.result ??
        response.data?.url ??
        response.data?.image ??
        response.data?.data;

      if (!candidate || typeof candidate !== "string") {
        throw new Error("Unexpected response format from image-creator.");
      }

      const normalized = candidate.startsWith("data:")
        ? candidate
        : candidate.startsWith("http")
          ? candidate
          : `data:image/png;base64,${candidate}`;

      setResult(normalized);
    } catch (err) {
      console.error("Generation failed:", err);
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.error ??
          err.response?.data?.message ??
          err.message;
        setError(message || "Generation failed. Please try again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Generation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-[560px] w-[720px] bg-[#fdfaf6] border border-[#d8c3a8] shadow-sm rounded-xl gap-6 font-semibold text-[20px] py-6 items-center overflow-hidden">
        <div className="w-[580px] flex flex-col gap-2">
          <div className="flex justify-between w-[580px]">
            <div className="flex items-center gap-2">
              <Sparkley className="text-[#1f3b5b]" />
              <p>Image creator</p>
            </div>
            <button
              onClick={() => {
                setPrompt("");
                setResult("");
                setError("");
              }}
              className="w-12 h-10 border border-[#c9b49a] rounded-md flex justify-center items-center hover:bg-[#e7d5bf]"
            >
              <Reload className="text-[#1f3b5b]" />
            </button>
          </div>

          <p className="text-[#4a5a6b] font-normal text-[14px]">
            What image do you want? Describe it briefly.
          </p>

          <div className="flex flex-col gap-2 items-end">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-y border min-h-[156px] border-[#c9b49a] bg-[#fffaf3] focus-visible:ring-[#6b86a6]"
              placeholder="Image description."
            />
            <Button
              disabled={loading || !prompt}
              onClick={handleGenerate}
              className="text-[#f7f3ee] bg-[#1f3b5b] hover:bg-[#24486f] cursor-pointer"
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>

          <div className="flex flex-col gap-2 max-h-[220px] overflow-auto">
            <div className="flex items-center gap-2">
              <p>Result</p>
            </div>

            {!loading && !result && (
              <p className="text-[#4a5a6b] font-normal text-[14px]">
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
                <p className="text-sm text-[#4a5a6b]">{prompt}</p>
                <img
                  src={result}
                  alt="Generated"
                  className="w-[230px] h-auto max-h-[200px] rounded-lg border border-[#c9b49a] object-contain bg-[#fffaf3]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
