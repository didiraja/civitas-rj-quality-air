"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { centerOfMass } from "@turf/turf";
import { useAirPollution } from "../libs/services/weather/getAirPollution";
import { IFeatureBairro } from "../types";
import QualityBadge from "../components/QualityBadge";

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
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Painel de Qualidade do Ar do Rio de Janeiro
      </h1>

      <div className="h-[80%] grid grid-cols-[.7fr_.3fr] gap-8">
        <DynamicMap onClickBairro={setSelectedBairro} />

        <div className="air-data">
          {selectedBairro && (
            <>
              <p className="font-bold text-3xl text-white">
                {selectedBairro.properties.nome}
              </p>
              {qualityAirData && (
                <>
                  <QualityBadge
                    color={selectedAirData?.color as string}
                    quality={selectedAirData?.aqi as number}
                    category={selectedAirData?.category as string}
                  />
                  {selectedPollutants && (
                    <div className="pollutants">
                      <p>
                        <span className="detail-label">Poluentes:</span>
                      </p>
                      {selectedPollutants.map(
                        ({ code, displayName, concentration }) => {
                          return (
                            <p key={code}>
                              -{" "}
                              <span className="font-semibold">
                                {displayName}
                              </span>{" "}
                              {concentration.value} {concentration.units}
                            </p>
                          );
                        }
                      )}
                    </div>
                  )}
                  {selectedRecommendations && (
                    <div className="recommendations">
                      <p>
                        <span className="detail-label">
                          Recomendações de saúde:
                        </span>
                      </p>
                      {selectedRecommendations.map((rec, index) => (
                        <p key={index}>- {rec}</p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
