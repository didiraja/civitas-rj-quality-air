"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet/GeoJSON";
import bairros from "../libs/bairros.json";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { IFeatureBairro } from "../app/types";
import { LeafletMouseEvent } from "leaflet";

type Props = {
  onClickBairro: (e: LeafletMouseEvent) => void;
};

export default function Map({ onClickBairro }: Props) {
  const typedBairros = bairros as IFeatureBairro;

  return (
    <MapContainer
      className="w-full h-[80%]"
      center={[-22.89642, -43.47223]}
      zoom={11}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={typedBairros}
        eventHandlers={{
          click: (e) => {
            onClickBairro(e);
          },
        }}
      />
    </MapContainer>
  );
}
