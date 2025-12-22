import { Sparkley } from "../../../public/sparkley";

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
            Upload a photo, and AI will detect the ingredients.
          </p>
          <div className="flex-col flex gap-2 ">
            <div className="rounded-md  flex align-start justify-start">
              <ImageUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
