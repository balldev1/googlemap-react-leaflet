"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define an array of marker positions
const markerPositions = [
    { position: [13.6639306, 100.4351476], popupText: "เซ็นทรัลพระราม2" },
    // Add more markers as needed
];

// Load MapContainer, TileLayer, Marker, and Popup dynamically
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Set Leaflet icons
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Home() {
    return (
        <div style={{ width: '100%', height: '100%', aspectRatio: 1.5 }}>
            <MapContainer center={[13.6639306, 100.4351476]} zoom={13} scrollWheelZoom={false}
                          style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerPositions.map((marker, index) => (
                    <Marker key={index} position={marker.position}>
                        <Popup>
                            {marker.popupText}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
