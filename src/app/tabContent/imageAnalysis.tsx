import React, { ChangeEvent, useState } from "react";
import { Sparkley } from "../../../public/sparkley";
import { Button } from "@/components/ui/button";
import { Document } from "../../../public/document";
import { Reload } from "../../../public/reload";
import ImageUpload from "../_components/imageUpload";

export function ImageAnalysis() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col h-180 w-145  bg-[#FFF] gap-6 font-semibold text-[20px] py-6 items-start">
        <div className="h-41 flex flex-col gap-2">
          <div className="flex justify-between w-145">
            <div className="flex items-center gap-2">
              <Sparkley />
              <p>Image Analysis</p>
            </div>
            <div className="w-12 h-10 border border-[#E4E4E7] rounded-md flex justify-center items-center">
              <Reload />
            </div>
          </div>
          <p className="text-[#71717A] font-normal text-[14px]">
            Upload a food photo, and AI will detect the ingredients.
          </p>
          <div className="flex-col flex gap-2 ">
            <div className="rounded-md  flex align-start justify-start">
              <ImageUpload />
            </div>
            <Button className="cursor-pointer w-23.5 h-10 hover: bg-gray-500 hover:text-[##18181B] text-[#FAFAFA]">
              Generate
            </Button>
          </div>

          <div className="h-41 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Document />
              <p>Here is the summary</p>
            </div>
            <p className="text-[#71717A] font-normal text-[14px]">
              First, enter your image to recognize an ingredients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
