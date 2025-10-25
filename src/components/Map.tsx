"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet/GeoJSON";
import bairros from "../libs/bairros.json";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map() {
  return (
    <MapContainer
      className="w-[500px] h-[500px] border-2 border-blue-600"
      center={[-22.908333, -43.196388]}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={bairros.features} />
      <Marker position={[-43.336323599767375, -22.825616607053909]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
