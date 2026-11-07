'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

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

  const quickFilter = (selectedCiudad: string) => {
    router.push(`/busqueda?ciudad=${encodeURIComponent(selectedCiudad)}`);
  };

  return (
    <section className="relative w-full min-h-[620px] lg:min-h-[700px] flex items-center justify-center bg-[#0D1117] overflow-hidden">
      
      {/* Background Hero Image con gradiente cinematico estilo LuxuryEstate */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&auto=format&fit=crop&q=90"
          alt="Propiedades de lujo y residencias en Tarija - KAIZEN Bienes Raíces"
          fill
          priority
          sizes="100vw"
          onLoad={() => setImageLoaded(true)}
          className={`object-cover object-center transition-all duration-1000 ${
            imageLoaded ? 'scale-100 opacity-60' : 'scale-105 opacity-0'
          }`}
        />
        {/* Capa de contraste y luminosidad equilibrada */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
      </div>

      {/* Contenido Central */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 flex flex-col items-center text-center">
        
        {/* Badge Editorial Superior */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] font-semibold text-white/90 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2px] shadow-sm">
            KAIZEN · BIENES RAÍCES EN TARIJA
          </span>
        </motion.div>

        {/* Titular Principal Exacto Solicitado */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-display-xl font-bold text-white tracking-tight leading-[1.08] mb-4 sm:mb-5 max-w-4xl drop-shadow-md"
        >
          Tu próximo hogar. <br className="hidden sm:inline" />
          Tu mejor inversión. <br />
          <span className="italic font-normal text-kaizen-red">Con seguridad jurídica.</span>
        </motion.h1>

        {/* Subtítulo Exacto Solicitado */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg font-body-md text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 drop-shadow-sm font-normal"
        >
          Propiedades residenciales, fincas y terrenos en el Valle Central de Tarija con títulos al día, Folio Real verificado y aptas para crédito hipotecario.
        </motion.p>

        {/* Consola de Búsqueda Flotante Estilo LuxuryEstate */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-[1060px] bg-white/95 backdrop-blur-xl border border-white/40 rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-4 sm:p-6 text-left"
        >
          {/* Barra de Pestañas de Transacción */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 sm:pb-4 border-b border-border-hairline custom-scrollbar">
            <button
              type="button"
              onClick={() => handleTabClick('venta')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-[2px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                activeTab === 'venta'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-canvas'
              }`}
            >
              En Venta
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('alquiler')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-[2px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                activeTab === 'alquiler'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-canvas'
              }`}
            >
              En Alquiler
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('anticretico')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-[2px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                activeTab === 'anticretico'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-primary hover:bg-surface-canvas'
              }`}
            >
              En Anticrético
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('fincas')}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-[#0B4632] hover:bg-[#E7EFEA] rounded-[2px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] flex items-center gap-1.5"
            >
              <span>Fincas & Viñedos</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('vender')}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-text-muted hover:text-kaizen-red rounded-[2px] transition-all duration-150 whitespace-nowrap active:scale-[0.97] flex items-center gap-1.5 ml-auto"
            >
              <span className="material-symbols-outlined text-[16px]">real_estate_agent</span>
              <span>¿Quieres vender?</span>
            </button>
          </div>

          {/* Formulario de Búsqueda Integrada */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 mt-4">
            
            {/* Ubicación / Distrito */}
            <div className="lg:col-span-4 flex flex-col">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-kaizen-red">location_on</span>
                <span>Ubicación / Zona</span>
              </label>
              <div className="relative">
                <select
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full bg-surface-canvas hover:bg-white border border-border-hairline px-3.5 py-2.5 text-xs sm:text-sm font-medium text-primary appearance-none focus:border-primary focus:bg-white focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-8 shadow-sm"
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

            {/* Tipo de Inmueble */}
            <div className="lg:col-span-3 flex flex-col">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-kaizen-red">home_work</span>
                <span>Tipo de Propiedad</span>
              </label>
              <div className="relative">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full bg-surface-canvas hover:bg-white border border-border-hairline px-3.5 py-2.5 text-xs sm:text-sm font-medium text-primary appearance-none focus:border-primary focus:bg-white focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-8 shadow-sm"
                >
                  <option value="Todos">Cualquier Tipología</option>
                  <option value="Casa">Casa Unifamiliar</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno / Macrolote</option>
                  <option value="Oficina Comercial">Local / Oficina Comercial</option>
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-muted">
                  expand_more
                </span>
              </div>
            </div>

            {/* Rango de Precio */}
            <div className="lg:col-span-3 flex flex-col">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-kaizen-red">payments</span>
                <span>Presupuesto ($us)</span>
              </label>
              <div className="relative">
                <select
                  value={rangoPrecio}
                  onChange={(e) => setRangoPrecio(e.target.value)}
                  className="w-full bg-surface-canvas hover:bg-white border border-border-hairline px-3.5 py-2.5 text-xs sm:text-sm font-medium text-primary appearance-none focus:border-primary focus:bg-white focus:ring-0 focus:outline-none transition-colors rounded-[2px] cursor-pointer pr-8 shadow-sm"
                >
                  <option value="todos">Sin límite de precio</option>
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
            <div className="lg:col-span-2 flex flex-col justify-end">
              <button
                type="submit"
                className="w-full h-[42px] bg-kaizen-red hover:bg-[#C00000] active:scale-[0.98] text-white font-medium text-xs sm:text-sm rounded-[2px] transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Buscar</span>
              </button>
            </div>

          </form>
        </motion.div>

        {/* Atajos Rápidos por Zonas Populares */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white/80"
        >
          <span className="text-white/60 font-medium">Búsquedas destacadas:</span>
          {[
            { label: 'Tarija Centro', q: 'Tarija' },
            { label: 'San Lorenzo', q: 'San Lorenzo' },
            { label: 'Uriondo / Viñedos', q: 'Uriondo' },
            { label: 'Tomatitas', q: 'San Lorenzo' },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => quickFilter(item.q)}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 active:scale-[0.97] backdrop-blur-md border border-white/20 rounded-[2px] text-white text-[11px] font-medium transition-all"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/area-rural"
            className="px-2.5 py-1 bg-[#0B4632]/40 hover:bg-[#0B4632]/60 active:scale-[0.97] backdrop-blur-md border border-emerald-400/30 rounded-[2px] text-emerald-200 text-[11px] font-medium transition-all flex items-center gap-1"
          >
            <span>🍇 Catálogo Rural</span>
          </Link>
        </motion.div>

        {/* 3 Garantías Clave en Línea */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[900px] w-full text-white/90 text-xs text-center sm:text-left"
        >
          <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-[2px] border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs text-white/90">Folio Real auditado en DD.RR.</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-[2px] border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs text-white/90">100% aptas para crédito bancario</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-[2px] border border-white/10">
            <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs text-white/90">Acompañamiento legal y notarial</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}