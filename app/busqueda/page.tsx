'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getInmuebles } from '@/lib/supabase';
import { Inmueble } from '@/types/database';
import InmuebleCard from '@/components/InmuebleCard';
import MapaResultados from '@/components/MapaResultados';

function BusquedaContent() {
  const searchParams = useSearchParams();
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('ciudad') || 'Todas');
  const [selectedType, setSelectedType] = useState(searchParams.get('tipo') || 'Todos');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'todas');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRooms, setSelectedRooms] = useState<number | 'todos'>('todos');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mobileTab, setMobileTab] = useState<'lista' | 'mapa'>('lista');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getInmuebles({ limit: 100 });
      setInmuebles(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Filter logic
  const filteredInmuebles = inmuebles.filter((i) => {
    if (selectedCity !== 'Todas' && i.ciudad.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (selectedType !== 'Todos' && i.tipo.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }
    if (selectedCategory !== 'todas') {
      const catSlug = i.categoria?.slug || '';
      if (!catSlug.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }
    }
    if (minPrice && Number(i.precio) < Number(minPrice)) return false;
    if (maxPrice && Number(i.precio) > Number(maxPrice)) return false;
    if (selectedRooms !== 'todos') {
      if (selectedRooms === 3 ? i.dormitorios < 3 : i.dormitorios !== selectedRooms) {
        return false;
      }
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = i.inmueble_name.toLowerCase().includes(term);
      const matchDir = i.direccion.toLowerCase().includes(term);
      const matchCity = i.ciudad.toLowerCase().includes(term);
      if (!matchName && !matchDir && !matchCity) return false;
    }
    return true;
  });

  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden bg-background">
      {/* Mobile Toggle Tabs */}
      <div className="lg:hidden flex border-b border-surface-variant bg-surface shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('lista')}
          className={`flex-1 py-3 font-label-md text-label-md flex items-center justify-center gap-1.5 ${
            mobileTab === 'lista'
              ? 'text-primary font-bold border-b-2 border-primary bg-surface-container-lowest'
              : 'text-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
          <span>Lista ({filteredInmuebles.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('mapa')}
          className={`flex-1 py-3 font-label-md text-label-md flex items-center justify-center gap-1.5 ${
            mobileTab === 'mapa'
              ? 'text-primary font-bold border-b-2 border-primary bg-surface-container-lowest'
              : 'text-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">map</span>
          <span>Ver Mapa</span>
        </button>
      </div>

      {/* Main Split Screen */}
      <div className="flex-1 flex w-full relative overflow-hidden">
        
        {/* Left Column: Search & List (50%) */}
        <section
          className={`w-full lg:w-1/2 flex flex-col bg-surface border-r border-outline-variant/50 relative z-10 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)] ${
            mobileTab === 'mapa' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Fixed Filters Header */}
          <div className="bg-surface p-margin-mobile md:p-gutter border-b border-surface-variant shrink-0 z-20 space-y-4">
            
            {/* Search Input */}
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por ciudad, zona o edificio..."
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-surface-variant rounded focus:border-on-surface focus:ring-0 font-body-md text-body-md text-on-surface transition-colors outline-none"
              />
            </div>

            {/* Quick Filters Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar">
              {/* Type Filter Buttons */}
              <div className="flex items-center gap-1.5 border border-surface-variant rounded p-1 shrink-0 bg-surface-container-lowest">
                <button
                  type="button"
                  onClick={() => setSelectedType(selectedType === 'Casa' ? 'Todos' : 'Casa')}
                  className={`px-3 py-1 rounded font-label-md text-label-md transition-colors ${
                    selectedType === 'Casa'
                      ? 'bg-on-surface text-white'
                      : 'text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  Casas
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType(selectedType === 'Departamento' ? 'Todos' : 'Departamento')}
                  className={`px-3 py-1 rounded font-label-md text-label-md transition-colors ${
                    selectedType === 'Departamento'
                      ? 'bg-on-surface text-white'
                      : 'text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  Deptos
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType(selectedType === 'Terreno' ? 'Todos' : 'Terreno')}
                  className={`px-3 py-1 rounded font-label-md text-label-md transition-colors ${
                    selectedType === 'Terreno'
                      ? 'bg-on-surface text-white'
                      : 'text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  Terrenos
                </button>
              </div>

              {/* City Select */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-10 px-3 border border-surface-variant rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md shrink-0 focus:border-on-surface focus:ring-0 cursor-pointer"
              >
                <option value="Todas">Todas las ciudades</option>
                <option value="Tarija">Tarija</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="La Paz">La Paz</option>
                <option value="Cochabamba">Cochabamba</option>
                <option value="Bermejo">Bermejo</option>
                <option value="Yacuiba">Yacuiba</option>
              </select>

              {/* Bedrooms Square Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-label-md text-label-md text-secondary mr-1">Hab:</span>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedRooms(selectedRooms === num ? 'todos' : (num as any))}
                    className={`w-8 h-8 rounded border flex items-center justify-center font-label-md text-label-md transition-colors ${
                      selectedRooms === num
                        ? 'border-on-surface bg-surface-container-low text-primary font-bold'
                        : 'border-surface-variant hover:border-on-surface text-on-surface bg-surface-container-lowest'
                    }`}
                  >
                    {num === 3 ? '3+' : num}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Expandable */}
            {showAdvanced && (
              <div className="pt-3 border-t border-surface-variant grid grid-cols-2 sm:grid-cols-3 gap-3 bg-surface-container-low p-3 rounded">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Precio Mín (USD)</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min $"
                    className="w-full h-9 px-2 text-xs border border-surface-variant rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Precio Máx (USD)</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max $"
                    className="w-full h-9 px-2 text-xs border border-surface-variant rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Operación</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-9 px-2 text-xs border border-surface-variant rounded bg-white"
                  >
                    <option value="todas">Todas</option>
                    <option value="venta">Venta</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="anticretico">Anticrético</option>
                  </select>
                </div>
              </div>
            )}

            {/* Status & Toggle Bar */}
            <div className="flex justify-between items-center pt-1">
              <span className="font-caption text-caption text-secondary">
                {filteredInmuebles.length} {filteredInmuebles.length === 1 ? 'Propiedad encontrada' : 'Propiedades encontradas'}
              </span>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1 text-on-surface hover:text-primary transition-colors font-label-md text-label-md"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>{showAdvanced ? 'Ocultar Filtros' : 'Filtros Avanzados'}</span>
              </button>
            </div>

          </div>

          {/* Scrollable Property Grid */}
          <div className="flex-1 overflow-y-auto p-margin-mobile md:p-gutter custom-scrollbar bg-surface-container-lowest">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-secondary">
                <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
              </div>
            ) : filteredInmuebles.length === 0 ? (
              <div className="text-center py-20 text-secondary space-y-3">
                <span className="material-symbols-outlined text-5xl">search_off</span>
                <p className="font-headline-sm text-on-surface">No encontramos propiedades con estos filtros</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCity('Todas');
                    setSelectedType('Todos');
                    setSelectedCategory('todas');
                    setMinPrice('');
                    setMaxPrice('');
                    setSelectedRooms('todos');
                  }}
                  className="font-label-md text-primary hover:underline"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                {filteredInmuebles.map((inmueble) => (
                  <InmuebleCard key={inmueble.id} inmueble={inmueble} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Interactive Map (50%) */}
        <section
          className={`w-full lg:w-1/2 h-full bg-surface-container relative z-0 ${
            mobileTab === 'lista' ? 'hidden lg:block' : 'block'
          }`}
        >
          <MapaResultados
            inmuebles={filteredInmuebles}
            ciudadSeleccionada={selectedCity !== 'Todas' ? selectedCity : null}
          />
        </section>

      </div>
    </div>
  );
}

export default function BusquedaPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-background text-secondary">
          <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
        </div>
      }
    >
      <BusquedaContent />
    </Suspense>
  );
}
