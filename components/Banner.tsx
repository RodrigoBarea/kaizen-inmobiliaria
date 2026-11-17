'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BannerPrincipal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'venta' | 'alquiler' | 'anticretico' | 'fincas' | 'vender'>('venta');
  const [ciudad, setCiudad] = useState('Todas');
  const [tipo, setTipo] = useState('Todos');
  const [rangoPrecio, setRangoPrecio] = useState('todos');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleTabClick = (tab: 'venta' | 'alquiler' | 'anticretico' | 'fincas' | 'vender') => {
    if (tab === 'vender') {
      router.push('/vender');
    } else if (tab === 'fincas') {
      router.push('/area-rural');
    } else {
      setActiveTab(tab);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (ciudad !== 'Todas') params.set('ciudad', ciudad);
    if (tipo !== 'Todos') params.set('tipo', tipo);
    params.set('categoria', activeTab === 'fincas' ? 'venta' : activeTab);

    if (rangoPrecio === '50k') {
      params.set('max', '50000');
    } else if (rangoPrecio === '50k-120k') {
      params.set('min', '50000');
      params.set('max', '120000');
    } else if (rangoPrecio === '120k-250k') {
      params.set('min', '120000');
      params.set('max', '250000');
    } else if (rangoPrecio === '250k-450k') {
      params.set('min', '250000');
      params.set('max', '450000');
    } else if (rangoPrecio === '450k+') {
      params.set('min', '450000');
    }

    router.push(`/busqueda?${params.toString()}`);
  };

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-[#0D1117] overflow-hidden">
      
      {/* Background Hero Image estilo LuxuryEstate con gradiente cinemático */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&auto=format&fit=crop&q=90"
          alt="Arquitectura residencial de lujo en Tarija - KAIZEN Bienes Raíces"
          fill
          priority
          sizes="100vw"
          onLoad={() => setImageLoaded(true)}
          className={`object-cover object-center transition-all duration-1000 ${
            imageLoaded ? 'scale-100 opacity-60' : 'scale-105 opacity-0'
          }`}
        />
        {/* Capa de contraste y luminosidad para máxima legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
      </div>

      {/* Contenido Central */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 flex flex-col items-center text-center">
        
        {/* Titular Principal Original Solicitado */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-display-xl font-bold text-white tracking-tight leading-[1.08] mb-4 sm:mb-5 max-w-4xl drop-shadow-md"
        >
          Tu próximo hogar. <br className="hidden sm:inline" />
          Tu mejor inversión. <br />
          <span className="italic font-normal text-kaizen-red">Cero riesgos.</span>
        </motion.h1>

        {/* Subtítulo Comercial Persuasivo */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg font-body-md text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 drop-shadow-sm font-normal"
        >
          Encuentra la propiedad ideal para vivir o invertir en las mejores zonas de Tarija. Te acompañamos en cada paso con total confianza y respaldo profesional.
        </motion.p>

        {/* Consola de Búsqueda Compacta Estilo LuxuryEstate (Pill Horizontal Sólido) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-[940px] mx-auto text-left"
        >
          {/* Desktop & Tablet: Sleek Horizontal Capsule (Directo estilo LuxuryEstate) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white rounded-full p-2 border border-white/80 shadow-[0_16px_44px_rgba(0,0,0,0.32)] gap-1 text-primary"
          >
            {/* 1. Operación (For sale / Alquiler / etc.) */}
            <div className="relative flex-[1.15] h-11 px-4 flex items-center justify-between rounded-full hover:bg-gray-50 transition-colors cursor-pointer group">
              <span className="text-xs sm:text-[13px] font-semibold text-primary truncate select-none">
                {activeTab === 'venta' && 'En venta'}
                {activeTab === 'alquiler' && 'En alquiler'}
                {activeTab === 'anticretico' && 'Anticrético'}
                {activeTab === 'fincas' && 'Fincas & viñedos'}
                {activeTab === 'vender' && 'Quiero vender'}
              </span>
              <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-1">
                expand_more
              </span>
              <select
                value={activeTab}
                onChange={(e) => handleTabClick(e.target.value as any)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Seleccionar operación"
              >
                <option value="venta">En venta</option>
                <option value="alquiler">En alquiler</option>
                <option value="anticretico">Anticrético</option>
                <option value="fincas">Fincas & viñedos</option>
                <option value="vender">Quiero vender mi propiedad</option>
              </select>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 shrink-0" />

            {/* 2. Tipología (Tipo de propiedad) */}
            <div className="relative flex-1 h-11 px-4 flex items-center justify-between rounded-full hover:bg-gray-50 transition-colors cursor-pointer group">
              <span className="text-xs sm:text-[13px] font-semibold text-primary truncate select-none">
                {tipo === 'Todos' ? 'Cualquier tipo' : tipo}
              </span>
              <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-1">
                expand_more
              </span>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Seleccionar tipo de propiedad"
              >
                <option value="Todos">Cualquier tipo</option>
                <option value="Casa">Casa Unifamiliar</option>
                <option value="Departamento">Departamento</option>
                <option value="Terreno">Terreno / Macrolote</option>
                <option value="Oficina Comercial">Local / Oficina</option>
              </select>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 shrink-0" />

            {/* 3. Ubicación (Location) */}
            <div className="relative flex-[1.25] h-11 px-4 flex items-center justify-between rounded-full hover:bg-gray-50 transition-colors cursor-pointer group">
              <span className="text-xs sm:text-[13px] font-semibold text-primary truncate select-none">
                {ciudad === 'Todas' ? 'Toda Tarija' : ciudad}
              </span>
              <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-1">
                expand_more
              </span>
              <select
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Seleccionar ubicación"
              >
                <option value="Todas">Toda Tarija & Valle Central</option>
                <option value="Tarija">Tarija (Cercado)</option>
                <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
                <option value="Uriondo">Uriondo (Valle)</option>
                <option value="Padcaya">Padcaya</option>
                <option value="Bermejo">Bermejo</option>
                <option value="Yacuiba">Yacuiba</option>
              </select>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 shrink-0" />

            {/* 4. Presupuesto (Any price) */}
            <div className="relative flex-1 h-11 px-4 flex items-center justify-between rounded-full hover:bg-gray-50 transition-colors cursor-pointer group">
              <span className="text-xs sm:text-[13px] font-semibold text-primary truncate select-none">
                {rangoPrecio === 'todos' && 'Cualquier precio'}
                {rangoPrecio === '50k' && 'Hasta $50k'}
                {rangoPrecio === '50k-120k' && '$50k - $120k'}
                {rangoPrecio === '120k-250k' && '$120k - $250k'}
                {rangoPrecio === '250k-450k' && '$250k - $450k'}
                {rangoPrecio === '450k+' && '+$450k'}
              </span>
              <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-1">
                expand_more
              </span>
              <select
                value={rangoPrecio}
                onChange={(e) => setRangoPrecio(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Seleccionar presupuesto"
              >
                <option value="todos">Cualquier precio</option>
                <option value="50k">Hasta $50,000 USD</option>
                <option value="50k-120k">$50,000 a $120,000 USD</option>
                <option value="120k-250k">$120,000 a $250,000 USD</option>
                <option value="250k-450k">$250,000 a $450,000 USD</option>
                <option value="450k+">Más de $450,000 USD</option>
              </select>
            </div>

            {/* Botón Buscar estilo LuxuryEstate */}
            <button
              type="submit"
              className="bg-kaizen-red hover:bg-[#C00000] active:scale-[0.96] text-white px-6 h-11 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all duration-150 shrink-0 whitespace-nowrap ml-1"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Buscar</span>
            </button>
          </form>

          {/* Mobile View: Compact Modern Card (< 768px) */}
          <form
            onSubmit={handleSearch}
            className="md:hidden bg-white rounded-2xl p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.32)] border border-white/80 space-y-2.5 text-primary"
          >
            <div className="grid grid-cols-2 gap-2">
              {/* Operación */}
              <div className="relative bg-surface-canvas rounded-lg px-3 py-2 flex items-center justify-between border border-border-hairline">
                <span className="text-xs font-semibold text-primary truncate">
                  {activeTab === 'venta' && 'En venta'}
                  {activeTab === 'alquiler' && 'En alquiler'}
                  {activeTab === 'anticretico' && 'Anticrético'}
                  {activeTab === 'fincas' && 'Fincas'}
                  {activeTab === 'vender' && 'Vender'}
                </span>
                <span className="material-symbols-outlined text-[16px] text-gray-400">expand_more</span>
                <select
                  value={activeTab}
                  onChange={(e) => handleTabClick(e.target.value as any)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="venta">En venta</option>
                  <option value="alquiler">En alquiler</option>
                  <option value="anticretico">Anticrético</option>
                  <option value="fincas">Fincas & viñedos</option>
                  <option value="vender">Quiero vender</option>
                </select>
              </div>

              {/* Tipología */}
              <div className="relative bg-surface-canvas rounded-lg px-3 py-2 flex items-center justify-between border border-border-hairline">
                <span className="text-xs font-semibold text-primary truncate">
                  {tipo === 'Todos' ? 'Tipología' : tipo}
                </span>
                <span className="material-symbols-outlined text-[16px] text-gray-400">expand_more</span>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="Todos">Cualquier tipo</option>
                  <option value="Casa">Casa</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Oficina Comercial">Comercial</option>
                </select>
              </div>

              {/* Ubicación */}
              <div className="relative bg-surface-canvas rounded-lg px-3 py-2 flex items-center justify-between border border-border-hairline">
                <span className="text-xs font-semibold text-primary truncate">
                  {ciudad === 'Todas' ? 'Toda Tarija' : ciudad}
                </span>
                <span className="material-symbols-outlined text-[16px] text-gray-400">expand_more</span>
                <select
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="Todas">Toda Tarija</option>
                  <option value="Tarija">Cercado</option>
                  <option value="San Lorenzo">San Lorenzo</option>
                  <option value="Uriondo">Uriondo</option>
                  <option value="Padcaya">Padcaya</option>
                  <option value="Bermejo">Bermejo</option>
                  <option value="Yacuiba">Yacuiba</option>
                </select>
              </div>

              {/* Presupuesto */}
              <div className="relative bg-surface-canvas rounded-lg px-3 py-2 flex items-center justify-between border border-border-hairline">
                <span className="text-xs font-semibold text-primary truncate">
                  {rangoPrecio === 'todos' ? 'Precio' : rangoPrecio}
                </span>
                <span className="material-symbols-outlined text-[16px] text-gray-400">expand_more</span>
                <select
                  value={rangoPrecio}
                  onChange={(e) => setRangoPrecio(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="todos">Cualquier precio</option>
                  <option value="50k">Hasta $50k</option>
                  <option value="50k-120k">$50k - $120k</option>
                  <option value="120k-250k">$120k - $250k</option>
                  <option value="250k-450k">$250k - $450k</option>
                  <option value="450k+">+ $450k</option>
                </select>
              </div>
            </div>

            {/* Mobile Submit Button */}
            <button
              type="submit"
              className="w-full bg-kaizen-red hover:bg-[#C00000] text-white py-2.5 rounded-full font-semibold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Buscar propiedades</span>
            </button>
          </form>

          {/* Quick link for sellers below */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => router.push('/vender')}
              className="text-white/85 hover:text-white transition-colors flex items-center gap-1.5 underline-offset-4 hover:underline"
            >
              <span className="material-symbols-outlined text-[15px]">real_estate_agent</span>
              <span>¿Eres propietario? Vender mi inmueble con KAIZEN</span>
            </button>
          </div>
        </motion.div>

        {/* Badge Arquitectónico de Referencia */}
        <div className="mt-6 text-center">
          <span className="inline-block bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-[11px] uppercase tracking-wider text-white/80 rounded-full">
            Villa Los Sauces · Aranjuez, Tarija
          </span>
        </div>

      </div>
    </section>
  );
}