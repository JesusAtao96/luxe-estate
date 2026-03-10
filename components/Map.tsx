"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export interface MapProps {
    lat: number;
    lng: number;
    className?: string;
}

export default function Map({ lat, lng, className = "h-full w-full" }: MapProps) {
    useEffect(() => {
        // Optional: Any client-side setup
    }, []);

    return (
        <MapContainer
            center={[lat, lng]}
            zoom={15}
            scrollWheelZoom={false}
            className={className}
        >
            <TileLayer
                attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} icon={icon}>
                <Popup>
                    Property Location
                </Popup>
            </Marker>
        </MapContainer>
    );
}
