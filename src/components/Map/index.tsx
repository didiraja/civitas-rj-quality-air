"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet/GeoJSON";
import bairros from "../../libs/bairros.json";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { BairroProperties, IFeatureBairro } from "../../types";

type Props = {
  onClickBairro: (e: IFeatureBairro) => void;
};

export default function Map({ onClickBairro }: Props) {
  const typedBairros = bairros as GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    BairroProperties
  >;

  return (
    <MapContainer
      className="w-full min-h-[200px] h-full rounded-2xl border-blue-800 border"
      center={[-22.89642, -43.47223]}
      zoom={11}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON
        data={typedBairros}
        eventHandlers={{
          click: (e) => {
            onClickBairro(e.propagatedFrom.feature);
          },
        }}
      />
    </MapContainer>
  );
}
