"use client";
import { useState } from "react";
import Map from "../components/Map";

export default function Home() {
  const [selectedBairro, setSelectedBairro] = useState<{ nome: string } | null>(
    null
  );

  return (
    <main className="p-8 h-screen">
      <Map onSelectBairro={setSelectedBairro} />
      {selectedBairro && (
        <p className="mt-4 font-bold text-xl">{selectedBairro.nome}</p>
      )}
    </main>
  );
}
