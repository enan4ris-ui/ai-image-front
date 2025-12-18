"use client";
import Header from "./_features/header";
import { ImageAnalysis } from "../app/tabContent/imageAnalysis";
import { IngredientRecognition } from "./tabContent/ingredientRecognition";
import { ImageCreator } from "./tabContent/imageCreator";
import { useState } from "react";

type TabId = "tab1" | "tab2" | "tab3";

type Tab = {
  id: TabId;
  label: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    { id: "tab1", label: "Image Analysis" },
    { id: "tab2", label: "Ingredient Recogniton" },
    { id: "tab3", label: "Food Image Creator" },
  ];

  const tabContent = {
    tab1: <ImageAnalysis />,
    tab2: <IngredientRecognition />,
    tab3: <ImageCreator />,
  };
  return (
    <div className="flex flex-col items-center justify-start pr-9 pb-9">
      <Header />
      <div className="pt-6 w-145 h-111">
        <div className="flex h-9 w-105 p-1 rounded-lg bg-[#F4F4F5]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex px-3 py-1 rounded-md text-[12px] font-medium transition-colors
    ${
      activeTab === tab.id
        ? "bg-white text-black "
        : "bg-transparent text-muted-foreground hover:bg-white/60"
    }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 w-full">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
}
