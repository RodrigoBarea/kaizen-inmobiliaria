'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Props {
  lat: number;
  lng: number;
  title?: string;
}

export default function MapaDetalle({ lat = -21.5355, lng = -64.7296, title = 'Ubicación' }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapContainer.current) return;

    if (token) {
      mapboxgl.accessToken = token;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 14,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Custom Red Kaizen Marker
    const el = document.createElement('div');
    el.className = 'w-9 h-9 rounded-full bg-[#E60000] border-4 border-white shadow-xl flex items-center justify-center text-white';
    el.innerHTML = '<span class="material-symbols-outlined text-[18px]">home</span>';

    new mapboxgl.Marker({ element: el })
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng, token]);

  return (
    <div className="w-full h-full min-h-[320px] rounded-lg overflow-hidden relative bg-gray-100">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
