'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Inmueble } from '@/types/database';
import Link from 'next/link';

interface Props {
  inmuebles: Inmueble[];
  ciudadSeleccionada: string | null;
}

const CITY_COORDINATES: Record<string, [number, number]> = {
  Tarija: [-64.7296, -21.5355],
  'Santa Cruz': [-63.1812, -17.7833],
  'La Paz': [-68.1193, -16.4897],
  Cochabamba: [-66.1561, -17.3895],
  Bermejo: [-64.3378, -22.7322],
  Yacuiba: [-63.6775, -22.0164],
};

export default function MapaResultados({ inmuebles, ciudadSeleccionada }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedInmueble, setSelectedInmueble] = useState<Inmueble | null>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapContainer.current) return;

    const initialCenter: [number, number] =
      ciudadSeleccionada && CITY_COORDINATES[ciudadSeleccionada]
        ? CITY_COORDINATES[ciudadSeleccionada]
        : [-64.7296, -21.5355];

    if (token) {
      mapboxgl.accessToken = token;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [ciudadSeleccionada, token]);

  // Update Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add Markers
    inmuebles.forEach((inmueble) => {
      if (!inmueble.lat || !inmueble.lng) return;

      const formattedPrice =
        inmueble.precio >= 1000
          ? `$${(inmueble.precio / 1000).toFixed(0)}k`
          : `$${inmueble.precio}`;

      // Custom marker DOM element
      const el = document.createElement('div');
      el.className = 'custom-map-marker group';
      el.innerHTML = `
        <div class="bg-[#1A1A1A] group-hover:bg-[#E60000] text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all duration-200 transform group-hover:scale-110 flex items-center gap-1 border-2 border-white">
          <span>${formattedPrice}</span>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedInmueble(inmueble);
        map.flyTo({
          center: [inmueble.lng, inmueble.lat],
          zoom: 14,
          speed: 1.2,
        });
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([inmueble.lng, inmueble.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Auto-fit bounds if we have multiple valid coordinates
    const validInmuebles = inmuebles.filter((i) => i.lat && i.lng);
    if (validInmuebles.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      validInmuebles.forEach((i) => bounds.extend([i.lng, i.lat]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 15 });
    }
  }, [inmuebles]);

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-gray-100">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Floating Property Card on Click */}
      {selectedInmueble && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm bg-white rounded-xl shadow-2xl border border-gray-200 p-4 transition-all duration-300">
          <button
            type="button"
            onClick={() => setSelectedInmueble(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs transition"
          >
            ✕
          </button>
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
              <img
                src={
                  selectedInmueble.imagenes?.[0] ||
                  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format&fit=crop&q=80'
                }
                alt={selectedInmueble.inmueble_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[#E60000] font-black text-sm block">
                $us {Number(selectedInmueble.precio).toLocaleString()}
              </span>
              <h4 className="font-bold text-xs text-[#1A1A1A] truncate mt-0.5">
                {selectedInmueble.inmueble_name}
              </h4>
              <p className="text-[11px] text-gray-500 truncate">
                {selectedInmueble.direccion}, {selectedInmueble.ciudad}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-semibold">
                  {selectedInmueble.dormitorios} hab. • {selectedInmueble.banos} bñ.
                </span>
                <Link
                  href={`/inmueble/${selectedInmueble.slug}`}
                  className="text-[11px] font-bold text-[#E60000] hover:underline"
                >
                  Ver Inmueble →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
