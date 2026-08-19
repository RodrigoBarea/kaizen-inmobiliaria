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
  const [useFallback, setUseFallback] = useState(false);
  const [selectedInmueble, setSelectedInmueble] = useState<Inmueble | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !mapContainer.current) {
      setUseFallback(true);
      return;
    }

    try {
      mapboxgl.accessToken = token;
      const initialCenter: [number, number] =
        ciudadSeleccionada && CITY_COORDINATES[ciudadSeleccionada]
          ? CITY_COORDINATES[ciudadSeleccionada]
          : [-64.7296, -21.5355];

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: initialCenter,
        zoom: 12,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      mapRef.current = map;

      // Add Custom Kaizen Stitch Markers
      inmuebles.forEach((inmueble) => {
        if (!inmueble.lat || !inmueble.lng) return;

        const formattedPrice =
          inmueble.precio >= 1000
            ? `$${(inmueble.precio / 1000).toFixed(0)}k`
            : `$${inmueble.precio}`;

        const el = document.createElement('div');
        el.className = 'map-marker cursor-pointer';
        el.innerHTML = `
          <div style="background-color: #1a1c1c; color: white; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border: 1px solid #1a1c1c; position: relative; white-space: nowrap;">
            ${formattedPrice}
            <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #1a1c1c;"></div>
          </div>
        `;

        el.addEventListener('click', () => {
          setSelectedInmueble(inmueble);
        });

        new mapboxgl.Marker({ element: el })
          .setLngLat([inmueble.lng, inmueble.lat])
          .addTo(map);
      });

      return () => {
        map.remove();
      };
    } catch (err) {
      console.warn('Mapbox error, falling back:', err);
      setUseFallback(true);
    }
  }, [inmuebles, ciudadSeleccionada, token]);

  if (useFallback || !token) {
    const center: [number, number] =
      ciudadSeleccionada && CITY_COORDINATES[ciudadSeleccionada]
        ? CITY_COORDINATES[ciudadSeleccionada]
        : [-64.7296, -21.5355];
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center[0] - 0.08}%2C${center[1] - 0.08}%2C${center[0] + 0.08}%2C${center[1] + 0.08}&layer=mapnik`;

    return (
      <div className="w-full h-full min-h-[400px] relative bg-surface-container flex flex-col">
        <iframe
          src={osmUrl}
          title="Mapa de Resultados"
          className="w-full h-full border-0 flex-1 opacity-90"
          loading="lazy"
        />

        {/* Lista flotante de marcadores rápidos */}
        <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md p-4 rounded-lg shadow-xl border border-surface-variant max-h-48 overflow-y-auto">
          <p className="font-caption text-caption text-secondary uppercase tracking-wider mb-2 flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
            Propiedades en el mapa ({inmuebles.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {inmuebles.map((i) => (
              <Link
                key={i.id}
                href={`/inmueble/${i.slug}`}
                className="flex items-center justify-between p-2 rounded bg-surface-container-low hover:bg-surface-container-high border border-surface-variant transition text-xs"
              >
                <span className="font-semibold text-on-surface truncate">{i.inmueble_name}</span>
                <span className="font-bold text-primary shrink-0 ml-2">
                  ${Number(i.precio).toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-8 right-8 opacity-5 pointer-events-none">
          <span className="font-headline-md text-8xl text-on-surface font-bold tracking-tighter">
            KAIZEN
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Tarjeta emergente de propiedad seleccionada (Stitch Preview) */}
      {selectedInmueble && (
        <div className="absolute bottom-6 left-6 right-6 max-w-sm bg-surface rounded-lg shadow-[0_15px_45px_rgba(0,0,0,0.12)] p-4 border border-surface-variant z-30 animate-fade-in">
          <div className="flex justify-between items-start">
            <h4 className="font-headline-sm text-sm text-on-surface line-clamp-1 font-bold">
              {selectedInmueble.inmueble_name}
            </h4>
            <button
              type="button"
              onClick={() => setSelectedInmueble(null)}
              className="text-secondary hover:text-on-surface text-sm font-bold ml-2"
            >
              ✕
            </button>
          </div>
          <p className="font-caption text-caption text-secondary mt-0.5">
            {selectedInmueble.direccion}, {selectedInmueble.ciudad}
          </p>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-surface-variant">
            <span className="font-headline-sm text-base font-bold text-primary">
              $us {Number(selectedInmueble.precio).toLocaleString()}
            </span>
            <Link
              href={`/inmueble/${selectedInmueble.slug}`}
              className="bg-primary hover:bg-on-primary-fixed-variant text-white font-label-md text-caption px-3 py-1.5 rounded transition"
            >
              Ver detalles
            </Link>
          </div>
        </div>
      )}

      {/* Watermark */}
      <div className="absolute bottom-8 right-8 opacity-5 pointer-events-none">
        <span className="font-headline-md text-8xl text-on-surface font-bold tracking-tighter">
          KAIZEN
        </span>
      </div>
    </div>
  );
}
