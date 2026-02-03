import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
    icon?: L.Icon;
  }>;
  route?: Array<[number, number]>;
  className?: string;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export function MapView({ center, zoom = 13, markers = [], route, className = '' }: MapViewProps) {
  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={center} zoom={zoom} />
        
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={marker.icon}>
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        ))}
        
        {route && route.length > 0 && (
          <Polyline positions={route} color="#2563EB" weight={4} />
        )}
      </MapContainer>
    </div>
  );
}

// Custom truck icon
export const createTruckIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background: #2563EB;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M18 18.5a1.5 1.5 0 0 1-1 1.5 1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1 1.5M19.5 9.5l1.96 2.5H17V9.5M6 18.5A1.5 1.5 0 0 1 4.5 20 1.5 1.5 0 0 1 3 18.5 1.5 1.5 0 0 1 4.5 17 1.5 1.5 0 0 1 6 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 0 0 3 3 3 3 0 0 0 3-3h6a3 3 0 0 0 3 3 3 3 0 0 0 3-3h2v-5l-3-4Z"/>
        </svg>
      </div>
    `,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Custom pickup/dropoff icons
export const createPickupIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background: #F97316;
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <span style="transform: rotate(45deg); color: white; font-size: 18px;">📍</span>
      </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
};

export const createDropoffIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background: #2563EB;
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <span style="transform: rotate(45deg); color: white; font-size: 18px;">🏁</span>
      </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
};
