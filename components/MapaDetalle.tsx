'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface Props {
  lat: number;
  lng: number;
  title?: string;
}

export default function MapaDetalle({ lat = -21.5355, lng = -64.7296, title = 'Ubicación' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !mapRef.current) {
      setUseFallback(true);
      return;
    }

    try {
      mapboxgl.accessToken = token;
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 14,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      new mapboxgl.Marker({ color: '#1c39bb' })
        .setLngLat([lng, lat])
        .addTo(map);

      return () => {
        map.remove();
      };
    } catch (e) {
      console.warn('Mapbox initialization error, falling back to OSM:', e);
      setUseFallback(true);
    }
  }, [lat, lng, token]);

  if (useFallback || !token) {
    // OpenStreetMap Embed Fallback
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.008}%2C${lng + 0.008}%2C${lat + 0.008}&layer=mapnik&marker=${lat}%2C${lng}`;

    return (
      <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative bg-gray-100">
        <iframe
          src={osmUrl}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow text-xs font-bold text-gray-700 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>{title} ({lat.toFixed(4)}, {lng.toFixed(4)})</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md border border-gray-200 relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
