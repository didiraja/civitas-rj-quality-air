"use client";
import { useState } from "react";
import Map from "../components/Map";
import dynamic from "next/dynamic";
import { BairroProperties } from "./types";

export default function Home() {
  const DynamicMap = dynamic(() => import("../components/Map"), {
    loading: () => (
      <div className="">
        <p>Loading...</p>
      </div>
    ),
    ssr: false,
  });

  const [selectedBairro, setSelectedBairro] = useState<BairroProperties | null>(
    null
  );

  return (
    <main className="p-8 h-screen">
      <DynamicMap onSelectBairro={setSelectedBairro} />
      {selectedBairro && (
        <p className="mt-4 font-bold text-xl">{selectedBairro.nome}</p>
      )}
    </main>
  );
}
