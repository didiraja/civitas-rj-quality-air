"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet/GeoJSON";
import { FeatureCollection, MultiPolygon } from "geojson";
import bairros from "../libs/bairros.json";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map({
  onSelectBairro,
}: {
  onSelectBairro: ({ nome }: { nome: string }) => void;
}) {
  const typedBairros = bairros as FeatureCollection<
    MultiPolygon,
    { nome: string }
  >;

  return (
    <MapContainer
      className="w-full h-[80%]"
      center={[-22.89642, -43.47223]}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={typedBairros}
        eventHandlers={{
          click: (e) => {
            onSelectBairro(e.sourceTarget.feature.properties);
          },
        }}
      />
    </MapContainer>
  );
}
