"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { center, centerOfMass } from "@turf/turf";
import { useAirPollution } from "../libs/services/weather/getAirPollution";
import { IFeatureBairro } from "../types";

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

  const [selectedBairro, setSelectedBairro] = useState<IFeatureBairro | null>(
    null
  );

  const centerBairro = useMemo(() => {
    if (selectedBairro) {
      return centerOfMass(selectedBairro);
    }
    return null;
  }, [selectedBairro]);

  const { data } = useAirPollution({
    enabled: !!selectedBairro,
    lat: centerBairro?.geometry.coordinates[0] || 0,
    lon: centerBairro?.geometry.coordinates[1] || 0,
  });

  return (
    <main className="p-8 h-screen">
      <DynamicMap onClickBairro={setSelectedBairro} />
      {selectedBairro && (
        <>
          <p className="mt-4 font-bold text-xl">
            {selectedBairro.properties.nome}
          </p>
          <p className="text-sm italic">
            {centerBairro?.geometry.coordinates[0]},{" "}
            {centerBairro?.geometry.coordinates[1]}
          </p>
        </>
      )}
    </main>
  );
}
