import { Sparkley } from "@/components/icons/Sparkley";
import { Button } from "@/components/ui/button";
import { Document } from "@/components/icons/Document";
import { Reload } from "@/components/icons/Reload";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function IngredientRecognition() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://ai-image-back-2.onrender.com";

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError("");
      setResult("");
      const response = await fetch(`${apiBaseUrl}/ingredient-recognition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error("Ingredient recognition failed", err);
      setError("Recognition failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-[560px] w-[720px] bg-[#fdfaf6] border border-[#d8c3a8] shadow-sm rounded-xl gap-6 font-semibold text-[20px] py-6 items-center">
        <div className="h-[164px] flex flex-col gap-2">
          <div className="flex justify-between w-[580px]">
            <div className="flex items-center gap-2">
              <Sparkley className="text-[#1f3b5b]" />
              <p>Ingredient recognition</p>
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
            Describe the food, and AI will detect the ingredients.
          </p>
          <div className="flex-col flex gap-2 items-end">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-y border min-h-[156px] border-[#c9b49a] bg-[#fffaf3] focus-visible:ring-[#6b86a6]"
              rows={4}
              cols={100}
              placeholder="Describe your ingredient."
            />
            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="cursor-pointer text-[#f7f3ee] bg-[#1f3b5b] hover:bg-[#24486f]"
            >
              Generate
            </Button>
          </div>

          <div className="h-[164px] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Document className="text-[#1f3b5b]" />
              <p>Identified Ingredients</p>
            </div>
            {!loading && !result && !error && (
              <p className="text-[#4a5a6b] font-normal text-[14px]">
                First, enter your text to recognize ingredients.
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
            {!loading && result && (
              <p className="text-sm text-[#4a5a6b] whitespace-pre-wrap">
                {result}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
