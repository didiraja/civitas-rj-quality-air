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

  const { data: qualityAirData } = useAirPollution({
    enabled: !!selectedBairro,
    lat: centerBairro?.geometry.coordinates[0] || 0,
    lon: centerBairro?.geometry.coordinates[1] || 0,
  });

  const selectedAirData = qualityAirData?.indexes.find(
    (item) => item.code === "UAQI"
  );
  const selectedPollutants = qualityAirData?.pollutants;
  const selectedRecommendations = qualityAirData?.healthRecommendations;

  return (
    <main className="p-8 h-screen">
      <DynamicMap onClickBairro={setSelectedBairro} />
      {selectedBairro && (
        <>
          <p className="mt-4 font-bold text-xl">
            {selectedBairro.properties.nome}
          </p>
          {qualityAirData && (
            <>
              <p className="text-sm">
                <strong>Qualidade:</strong> {selectedAirData?.aqi}
              </p>
              <p className="text-sm">
                <strong>Categoria:</strong> {selectedAirData?.category}
              </p>
              {selectedPollutants && (
                <>
                  <p className="text-sm">
                    <strong>Poluentes:</strong>
                  </p>
                  {selectedPollutants.map(
                    ({ code, fullName, displayName, concentration }) => {
                      return (
                        <p className="text-sm" key={code}>
                          - <span className="font-semibold">{displayName}</span>{" "}
                          {concentration.value} {concentration.units}
                        </p>
                      );
                    }
                  )}
                </>
              )}
              {selectedRecommendations && (
                <>
                  <p className="text-sm mt-2">
                    <strong>Recomendações de saúde:</strong>
                  </p>
                  {selectedRecommendations.map((rec, index) => (
                    <p className="text-sm" key={index}>
                      - {rec}
                    </p>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
