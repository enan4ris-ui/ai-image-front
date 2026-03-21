"use client";
import Header from "./_features/header";
import { ImageAnalysis } from "../app/tabContent/imageAnalysis";
import { IngredientRecognition } from "./tabContent/ingredientRecognition";
import { ImageCreator } from "./tabContent/imageCreator";
import { useState, type ReactNode } from "react";

type TabId = "tab1" | "tab2" | "tab3";

type Tab = {
  id: TabId;
  label: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("tab1");
  const tabs: Tab[] = [
    { id: "tab1", label: "Image Analysis" },
    { id: "tab2", label: "Image Creator" },
    { id: "tab3", label: "Ingredient Recognition" },
  ];

  const tabContent: Record<TabId, ReactNode> = {
    tab1: <ImageAnalysis />,
    tab2: <ImageCreator />,
    tab3: <IngredientRecognition />,
  };
  return (
    <div className="min-h-screen w-full bg-[linear-gradient(135deg,#f4efe9_0%,#e7eef5_100%)] flex flex-col items-center justify-start pr-9 pb-9 text-[#243447]">
      <Header />
      <div className="pt-6 w-[720px] h-auto">
        <div className="flex h-9 w-fit p-1 rounded-lg bg-[#e6d6c3] shadow-sm border border-[#c9b49a]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex px-3 py-1 rounded-md text-[12px] font-medium transition-colors
    ${
      activeTab === tab.id
        ? "bg-[#1f3b5b] text-[#f7f3ee] shadow"
        : "bg-transparent text-[#3e4a5a] hover:bg-[#d7c1a6]"
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
