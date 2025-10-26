"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet/GeoJSON";
import bairros from "../libs/bairros.json";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map({ onSelectBairro }) {
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
        data={bairros.features}
        eventHandlers={{
          click: (e) => {
            onSelectBairro(e.layer.feature.properties);
          },
        }}
      />
    </MapContainer>
  );
}
