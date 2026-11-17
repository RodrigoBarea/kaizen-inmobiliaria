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

        {/* Consola de Búsqueda Flotante Estilo Apple & LuxuryEstate */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-[1080px] bg-white border border-gray-200 rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.28)] p-5 sm:p-7 text-left"
        >
          {/* Pestañas de Navegación Segmentada (Apple Design) - Fondo Sólido No Transparente */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-gray-100">
            
            {/* Segmented Track */}
            <div className="bg-[#F2F1ED] p-1.5 rounded-[4px] inline-flex items-center gap-1 overflow-x-auto max-w-full custom-scrollbar">
              <button
                type="button"
                onClick={() => handleTabClick('venta')}
                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-[3px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                  activeTab === 'venta'
                    ? 'bg-white text-primary shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Venta
              </button>

              <button
                type="button"
                onClick={() => handleTabClick('alquiler')}
                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-[3px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                  activeTab === 'alquiler'
                    ? 'bg-white text-primary shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Alquiler
              </button>

              <button
                type="button"
                onClick={() => handleTabClick('anticretico')}
                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-[3px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                  activeTab === 'anticretico'
                    ? 'bg-white text-primary shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                Anticrético
              </button>

              <button
                type="button"
                onClick={() => handleTabClick('fincas')}
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-[#0B4632] hover:bg-emerald-100/60 rounded-[3px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] flex items-center gap-1.5"
              >
                <span>Fincas y viñedos</span>
              </button>
            </div>

            {/* Direct CTA Propietarios */}
            <button
              type="button"
              onClick={() => handleTabClick('vender')}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-text-muted hover:text-kaizen-red active:scale-[0.97] transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 ml-auto"
            >
              <span className="material-symbols-outlined text-[16px]">real_estate_agent</span>
              <span>Quiero vender</span>
            </button>

          </div>

          {/* Formulario Estructurado con los Campos y Opciones Originales */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 mt-4">
            
            {/* Filter: Tipo de Inmueble */}
            <div className="lg:col-span-3 flex flex-col">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-kaizen-red">home_work</span>
                <span>Tipo de Propiedad</span>
              </label>
              <div className="relative">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full h-[42px] bg-surface-canvas hover:bg-white border border-border-hairline px-3.5 text-xs sm:text-sm font-medium text-primary appearance-none focus:border-primary focus:bg-white focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-8 shadow-sm"
                >
                  <option value="Todos">Cualquier Tipología</option>
                  <option value="Casa">Residencia Unifamiliar</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno / Macrolote</option>
                  <option value="Oficina Comercial">Local / Oficina Comercial</option>
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted">
                  expand_more
                </span>
              </div>
            </div>

            {/* Filter: Zona Tarija */}
            <div className="lg:col-span-3 flex flex-col">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-kaizen-red">location_on</span>
                <span>Ubicación / Distrito</span>
              </label>
              <div className="relative">
                <select
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full h-[42px] bg-surface-canvas hover:bg-white border border-border-hairline px-3.5 text-xs sm:text-sm font-medium text-primary appearance-none focus:border-primary focus:bg-white focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-8 shadow-sm"
                >
                  <option value="Todas">Todo Tarija & Valle Central</option>
                  <option value="Tarija">Tarija (Cercado)</option>
                  <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
                  <option value="Uriondo">Uriondo (Valle de la Concepción)</option>
                  <option value="Padcaya">Padcaya</option>
                  <option value="Bermejo">Bermejo</option>
                  <option value="Yacuiba">Yacuiba</option>
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted">
                  expand_more
                </span>
              </div>
            </div>

            {/* Filter: Rango de Precio */}
            <div className="lg:col-span-3 flex flex-col">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-kaizen-red">payments</span>
                <span>Presupuesto Estimado ($us)</span>
              </label>
              <div className="relative">
                <select
                  value={rangoPrecio}
                  onChange={(e) => setRangoPrecio(e.target.value)}
                  className="w-full h-[42px] bg-surface-canvas hover:bg-white border border-border-hairline px-3.5 text-xs sm:text-sm font-medium text-primary appearance-none focus:border-primary focus:bg-white focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-8 shadow-sm"
                >
                  <option value="todos">Sin restricción de precio</option>
                  <option value="50k">Hasta $50,000 USD</option>
                  <option value="50k-120k">$50,000 a $120,000 USD</option>
                  <option value="120k-250k">$120,000 a $250,000 USD</option>
                  <option value="250k-450k">$250,000 a $450,000 USD</option>
                  <option value="450k+">Más de $450,000 USD</option>
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted">
                  expand_more
                </span>
              </div>
            </div>

            {/* Botón Buscar */}
            <div className="lg:col-span-3 flex flex-col justify-end">
              <button
                type="submit"
                className="w-full h-[42px] bg-kaizen-red hover:bg-[#C00000] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-[2px] transition-all duration-150 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap px-4"
              >
                <span className="material-symbols-outlined text-[18px] shrink-0">search</span>
                <span className="whitespace-nowrap">Buscar propiedades</span>
              </button>
            </div>

          </form>
        </motion.div>

        {/* Badge Arquitectónico de Referencia */}
        <div className="mt-8 text-center">
          <span className="inline-block bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-[11px] uppercase tracking-wider text-white/80 rounded-[2px]">
            Villa Los Sauces · Aranjuez, Tarija
          </span>
        </div>

      </div>
    </section>
  );
}