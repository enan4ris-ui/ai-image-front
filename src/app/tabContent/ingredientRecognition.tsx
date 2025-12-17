import { Sparkley } from "../../../public/sparkley";
import { Button } from "@/components/ui/button";
import { Document } from "../../../public/document";
import { Reload } from "../../../public/reload";
import { Textarea } from "@/components/ui/textarea";

// import ImageUpload from "../_components/imageUpload";

export function IngredientRecognition() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-180 w-145  bg-[#FFF]  gap-6 font-semibold text-[20px] py-6 items-start">
        <div className="h-41 flex flex-col gap-2">
          <div className="flex justify-between w-145">
            <div className="flex items-center gap-2">
              <Sparkley />
              <p>Ingredient recognition</p>
            </div>
            <div className="w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center">
              <Reload />
            </div>
          </div>
          <p className="text-[#71717A] font-normal text-[14px]">
            Describe the food, and AI will detect the ingredients.
          </p>
          <div className="flex-col flex gap-2 items-end">
            {/* <ImageUpload /> */}{" "}
            <Textarea placeholder="Describe your ingredient." />
            <Button className="cursor-pointer hover: bg-gray-500 hover:text-[##18181B] text-[#FAFAFA]">
              Generate
            </Button>
          </div>

          <div className="h-41 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Document />
              <p>Identified Ingredients</p>
            </div>
            <p className="text-[#71717A] font-normal text-[14px]">
              First, enter your text to recognize an ingredients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
