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
    <section className="relative w-full border-b border-border-hairline bg-surface-stone overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 pb-14 lg:pt-14 lg:pb-20">
        
        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column Left: Editorial Narrative & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2 mb-6"
            >
              <span className="px-3 py-1 bg-emerald-subtle text-[#0B4632] border border-[#0B4632]/20 rounded-full text-legal-badge font-legal-badge uppercase tracking-wider font-semibold">
                Correduría Homologada Tarija
              </span>
              <span className="text-legal-badge font-legal-badge text-text-muted tracking-wide">
                Registro DD.RR. & Notaría N° 4
              </span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-display-xl font-bold text-primary tracking-tight leading-[1.08] mb-6"
            >
              Tu próximo hogar. <br />
              Tu mejor inversión. <br />
              <span className="italic font-normal text-[#E60000]">Cero riesgos.</span>
            </motion.h1>

            {/* Subtítulo curado */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg font-body-lg text-text-muted max-w-xl mb-8 sm:mb-10 leading-relaxed"
            >
              Curaduría inmobiliaria con auditoría jurídica rigurosa en el Valle Central de Tarija. Residencias de autor, quintas vinícolas y propiedades con folio real saneado y aptas para crédito inmediato.
            </motion.p>

            {/* Metrics Snapshot Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 border-t border-border-hairline pt-6 max-w-lg mb-4"
            >
              <div>
                <span className="block text-xl sm:text-2xl font-headline-sm font-semibold text-primary">100%</span>
                <span className="text-legal-badge font-legal-badge uppercase text-text-muted tracking-wider block mt-0.5">
                  Folio Real Limpio
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-headline-sm font-semibold text-primary">0 Bs.</span>
                <span className="text-legal-badge font-legal-badge uppercase text-text-muted tracking-wider block mt-0.5">
                  Gravámenes Ocultos
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-headline-sm font-semibold text-primary">15 Días</span>
                <span className="text-legal-badge font-legal-badge uppercase text-text-muted tracking-wider block mt-0.5">
                  Pre-aprobación VIP
                </span>
              </div>
            </motion.div>

          </div>

          {/* Column Right: Large Editorial Imagery Frame with Preload Shimmer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] border border-border-hairline bg-surface-canvas overflow-hidden rounded-[2px] group">
              
              {/* Skeleton Placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton-shimmer bg-surface-warm" />
              )}

              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=85"
                alt="Arquitectura residencial de lujo en Tarija - KAIZEN Bienes Raíces"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
                className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />

              {/* Architectural Framing Badge */}
              <div className="absolute bottom-4 left-4 bg-surface-stone/95 backdrop-blur-md px-3.5 py-1.5 border border-border-hairline text-legal-badge font-legal-badge uppercase tracking-wider text-primary shadow-sm">
                Villa Los Sauces · Aranjuez, Tarija
              </div>

              {/* Exclusivity Badge */}
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-[2px] text-legal-badge font-legal-badge uppercase tracking-widest shadow-sm">
                Exclusividad KAIZEN
              </div>
            </div>
          </motion.div>

        </div>

        {/* BUSCADOR MODULAR FLOTANTE DE ALTA GAMA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 lg:mt-14 w-full bg-surface-stone border border-border-hairline shadow-[0_12px_32px_-8px_rgba(17,17,17,0.06)] p-5 sm:p-7 rounded-[2px]"
        >
          {/* Transaction Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border-hairline custom-scrollbar">
            <button
              type="button"
              onClick={() => handleTabClick('venta')}
              className={`px-4 sm:px-5 py-2 text-body-sm font-body-sm font-medium rounded-[2px] transition-all whitespace-nowrap ${
                activeTab === 'venta'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-canvas'
              }`}
            >
              Venta Exclusiva
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('alquiler')}
              className={`px-4 sm:px-5 py-2 text-body-sm font-body-sm font-medium rounded-[2px] transition-all whitespace-nowrap ${
                activeTab === 'alquiler'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-canvas'
              }`}
            >
              Alquiler Corporativo
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('anticretico')}
              className={`px-4 sm:px-5 py-2 text-body-sm font-body-sm font-medium rounded-[2px] transition-all whitespace-nowrap ${
                activeTab === 'anticretico'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-canvas'
              }`}
            >
              Anticréticos Certificados
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('fincas')}
              className="px-4 sm:px-5 py-2 text-body-sm font-body-sm font-medium text-[#0B4632] hover:bg-emerald-subtle rounded-[2px] transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <span>🌿 Fincas & Viñedos</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('vender')}
              className="px-4 sm:px-5 py-2 text-body-sm font-body-sm font-medium text-text-muted hover:text-kaizen-red hover:bg-surface-canvas rounded-[2px] transition-all whitespace-nowrap ml-auto hidden sm:block"
            >
              Vender mi Inmueble →
            </button>
          </div>

          {/* Formulario Estructurado */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            
            {/* Filter: Tipo de Inmueble */}
            <div className="flex flex-col">
              <label className="text-legal-badge font-legal-badge uppercase text-text-muted mb-1.5 tracking-wider font-semibold">
                Tipo de Propiedad
              </label>
              <div className="relative">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full bg-white border border-border-hairline px-4 py-3 text-body-md font-body-md text-primary appearance-none focus:border-primary focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-10"
                >
                  <option value="Todos">Cualquier Tipología</option>
                  <option value="Casa">Residencia Unifamiliar</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno / Macrolote</option>
                  <option value="Oficina Comercial">Local / Oficina Comercial</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted">
                  expand_more
                </span>
              </div>
            </div>

            {/* Filter: Zona Tarija */}
            <div className="flex flex-col">
              <label className="text-legal-badge font-legal-badge uppercase text-text-muted mb-1.5 tracking-wider font-semibold">
                Ubicación / Distrito
              </label>
              <div className="relative">
                <select
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full bg-white border border-border-hairline px-4 py-3 text-body-md font-body-md text-primary appearance-none focus:border-primary focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-10"
                >
                  <option value="Todas">Todo Tarija & Valle Central</option>
                  <option value="Tarija">Tarija (Cercado)</option>
                  <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
                  <option value="Uriondo">Uriondo (Valle de la Concepción)</option>
                  <option value="Padcaya">Padcaya</option>
                  <option value="Bermejo">Bermejo</option>
                  <option value="Yacuiba">Yacuiba</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted">
                  location_on
                </span>
              </div>
            </div>

            {/* Filter: Rango de Precio */}
            <div className="flex flex-col">
              <label className="text-legal-badge font-legal-badge uppercase text-text-muted mb-1.5 tracking-wider font-semibold">
                Presupuesto Estimado ($us)
              </label>
              <div className="relative">
                <select
                  value={rangoPrecio}
                  onChange={(e) => setRangoPrecio(e.target.value)}
                  className="w-full bg-white border border-border-hairline px-4 py-3 text-body-md font-body-md text-primary appearance-none focus:border-primary focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-10"
                >
                  <option value="todos">Sin Restricción de Precio</option>
                  <option value="50k">Hasta $50,000 USD</option>
                  <option value="50k-120k">$50,000 – $120,000 USD</option>
                  <option value="120k-250k">$120,000 – $250,000 USD</option>
                  <option value="250k-450k">$250,000 – $450,000 USD</option>
                  <option value="450k+">$450,000+ USD (Portfolio VIP)</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted">
                  payments
                </span>
              </div>
            </div>

            {/* Surgical Action Trigger */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="w-full bg-[#E60000] hover:bg-[#C00000] text-white py-3 px-6 font-body-md font-medium tracking-tight rounded-[2px] transition-all duration-150 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Explorar Propiedades</span>
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
