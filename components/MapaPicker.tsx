'use client';

import { useState } from 'react';
import { MapPin, Locate } from 'lucide-react';

interface Props {
  lat: number;
  lng: number;
  onChange: (coords: { lat: number; lng: number }) => void;
  ciudad?: string;
}

const CITY_DEFAULT_COORDS: Record<string, { lat: number; lng: number }> = {
  Tarija: { lat: -21.5355, lng: -64.7296 },
  'San Lorenzo': { lat: -21.4172, lng: -64.7497 },
  Uriondo: { lat: -21.6961, lng: -64.6547 },
  Bermejo: { lat: -22.7322, lng: -64.3378 },
  Yacuiba: { lat: -22.0164, lng: -63.6775 },
  'Villa Montes': { lat: -21.2589, lng: -63.4708 },
};

export default function MapaPicker({ lat, lng, onChange, ciudad = 'Tarija' }: Props) {
  const [currentLat, setCurrentLat] = useState(lat || -21.5355);
  const [currentLng, setCurrentLng] = useState(lng || -64.7296);

  const handleApplyCity = () => {
    if (CITY_DEFAULT_COORDS[ciudad]) {
      const { lat: cLat, lng: cLng } = CITY_DEFAULT_COORDS[ciudad];
      setCurrentLat(cLat);
      setCurrentLng(cLng);
      onChange({ lat: cLat, lng: cLng });
    }
  };

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${currentLng - 0.01}%2C${currentLat - 0.01}%2C${currentLng + 0.01}%2C${currentLat + 0.01}&layer=mapnik&marker=${currentLat}%2C${currentLng}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          Coordenadas de Ubicación (Latitud / Longitud)
        </label>
        <button
          type="button"
          onClick={handleApplyCity}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <Locate className="w-3.5 h-3.5" />
          Centrar en {ciudad}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-xs text-gray-500 block mb-1">Latitud</span>
          <input
            type="number"
            step="0.0001"
            value={currentLat}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              setCurrentLat(val);
              onChange({ lat: val, lng: currentLng });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <span className="text-xs text-gray-500 block mb-1">Longitud</span>
          <input
            type="number"
            step="0.0001"
            value={currentLng}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              setCurrentLng(val);
              onChange({ lat: currentLat, lng: val });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Previsualización en Mapa */}
      <div className="h-56 w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative">
        <iframe
          src={osmUrl}
          title="Selector de Coordenadas"
          className="w-full h-full border-0"
        />
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-bold text-gray-700">
          Ubicación fijada: {currentLat.toFixed(4)}, {currentLng.toFixed(4)}
        </div>
      </div>
    </div>
  );
}
