"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { LeafletMouseEvent } from "leaflet";

export default function Home() {
  const DynamicMap = useMemo(
    () =>
      dynamic(() => import("../components/Map"), {
        loading: () => (
          <div className="">
            <p>Loading...</p>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const [selectedBairro, setSelectedBairro] =
    useState<LeafletMouseEvent | null>(null);

  return (
    <main className="p-8 h-screen">
      <DynamicMap onClickBairro={setSelectedBairro} />
      {selectedBairro && (
        <>
          <p className="mt-4 font-bold text-xl">
            {selectedBairro.propagatedFrom.feature.properties.nome}
          </p>
          <p className="text-sm italic">
            {selectedBairro.latlng.lat}, {selectedBairro.latlng.lng}
          </p>
        </>
      )}
    </main>
  );
}
