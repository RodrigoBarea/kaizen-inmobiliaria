'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function BannerPrincipal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'venta' | 'alquiler' | 'anticretico' | 'fincas' | 'vender'>('venta');
  const [ciudad, setCiudad] = useState('Todas');
  const [tipo, setTipo] = useState('Todos');
  const [rangoPrecio, setRangoPrecio] = useState('todos');
  const [imageLoaded, setImageLoaded] = useState(false);

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    'Hola equipo KAIZEN. Deseo agendar una asesoría privada sobre oportunidades inmobiliarias auditadas en Tarija.'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

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
    <section className="relative w-full bg-[#F6F5F2] border-b border-[#181816]/15 overflow-hidden pt-8 pb-16 lg:py-20">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Asymmetrical 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 7 Columns Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Technical Meta Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#A65D47]"
            >
              <span className="w-2 h-2 bg-[#A65D47] inline-block" />
              <span>Auditoría Patrimonial · Valle Central de Tarija</span>
            </motion.div>

            {/* Editorial Serif Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-editorial text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] text-[#181816] leading-[1.05] tracking-tight font-semibold mb-5"
            >
              No coleccionamos propiedades.{' '}
              <span className="block mt-1">
                Auditamos tu próximo{' '}
                <span className="italic font-normal text-[#A65D47]">patrimonio.</span>
              </span>
            </motion.h1>

            {/* Subtítulo Directo y Potente */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-sm sm:text-base md:text-[17px] text-[#181816]/75 max-w-2xl leading-relaxed mb-6"
            >
              Tu próximo hogar. Tu mejor inversión.{' '}
              <strong className="text-[#181816] font-semibold">Cero riesgos.</strong> Curaduría
              notarial y técnica con folio real verificado en las zonas de mayor plusvalía de Tarija.
            </motion.p>

            {/* Botones Rectos de Acción */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <Link
                href="/compra/page/1"
                className="bg-[#181816] hover:bg-[#A65D47] active:scale-[0.98] text-[#F6F5F2] px-6 py-3 rounded-none font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-2"
              >
                <span>Explorar Catálogo</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#181816]/30 hover:border-[#181816] hover:bg-[#EFECE6] active:scale-[0.98] text-[#181816] px-6 py-3 rounded-none font-mono text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2"
              >
                <FaWhatsapp className="text-[14px]" />
                <span>Agendar Asesoría</span>
              </a>
            </motion.div>

            {/* Consola de Búsqueda Arquitectónica Integrada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#EFECE6] border border-[#181816]/15 rounded-none p-4 sm:p-5 text-left"
            >
              {/* Segmented Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#181816]/10">
                <div className="bg-[#F6F5F2] border border-[#181816]/10 p-1 rounded-none inline-flex items-center gap-1 overflow-x-auto max-w-full">
                  <button
                    type="button"
                    onClick={() => handleTabClick('venta')}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-none transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                      activeTab === 'venta'
                        ? 'bg-[#181816] text-[#F6F5F2]'
                        : 'text-[#181816]/70 hover:text-[#181816]'
                    }`}
                  >
                    Venta
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabClick('alquiler')}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-none transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                      activeTab === 'alquiler'
                        ? 'bg-[#181816] text-[#F6F5F2]'
                        : 'text-[#181816]/70 hover:text-[#181816]'
                    }`}
                  >
                    Alquiler
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabClick('anticretico')}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-none transition-all duration-150 whitespace-nowrap active:scale-[0.97] ${
                      activeTab === 'anticretico'
                        ? 'bg-[#181816] text-[#F6F5F2]'
                        : 'text-[#181816]/70 hover:text-[#181816]'
                    }`}
                  >
                    Anticrético
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabClick('fincas')}
                    className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-none text-[#A65D47] hover:bg-[#F6F5F2] transition-all whitespace-nowrap active:scale-[0.97]"
                  >
                    Fincas & Viñedos
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleTabClick('vender')}
                  className="px-2 py-1 text-xs font-mono text-[#181816]/70 hover:text-[#A65D47] uppercase tracking-wider transition-colors ml-auto flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">real_estate_agent</span>
                  <span>Vender</span>
                </button>
              </div>

              {/* Filtros Funcionales */}
              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tipo de Inmueble */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#181816]/70 mb-1">
                    Tipología
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="h-10 bg-[#F6F5F2] border border-[#181816]/15 rounded-none px-2.5 text-xs font-sans text-[#181816] focus:border-[#181816] focus:outline-none cursor-pointer"
                  >
                    <option value="Todos">Cualquier Tipología</option>
                    <option value="Casa">Casa Unifamiliar</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Terreno">Terreno / Lote</option>
                    <option value="Oficina Comercial">Local Comercial</option>
                  </select>
                </div>

                {/* Zona Tarija */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#181816]/70 mb-1">
                    Ubicación
                  </label>
                  <select
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="h-10 bg-[#F6F5F2] border border-[#181816]/15 rounded-none px-2.5 text-xs font-sans text-[#181816] focus:border-[#181816] focus:outline-none cursor-pointer"
                  >
                    <option value="Todas">Todo Tarija</option>
                    <option value="Tarija">Tarija (Cercado)</option>
                    <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
                    <option value="Uriondo">Uriondo / El Valle</option>
                    <option value="Padcaya">Padcaya</option>
                  </select>
                </div>

                {/* Presupuesto y Botón Buscar */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#181816]/70 mb-1">
                    Presupuesto ($us)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <select
                      value={rangoPrecio}
                      onChange={(e) => setRangoPrecio(e.target.value)}
                      className="h-10 w-full bg-[#F6F5F2] border border-[#181816]/15 rounded-none px-2 text-xs font-sans text-[#181816] focus:border-[#181816] focus:outline-none cursor-pointer"
                    >
                      <option value="todos">Todos</option>
                      <option value="50k">Hasta $50k</option>
                      <option value="50k-120k">$50k - $120k</option>
                      <option value="120k-250k">$120k - $250k</option>
                      <option value="250k-450k">$250k - $450k</option>
                      <option value="450k+">+ $450k</option>
                    </select>

                    <button
                      type="submit"
                      aria-label="Ejecutar búsqueda"
                      className="h-10 px-3 bg-[#181816] hover:bg-[#A65D47] text-[#F6F5F2] rounded-none flex items-center justify-center transition-colors shrink-0"
                    >
                      <span className="material-symbols-outlined text-[18px]">search</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>

          </div>

          {/* Right Column: 5 Columns Architectural Magazine Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[#EFECE6] border border-[#181816]/20 p-3.5 sm:p-4 rounded-none flex flex-col"
            >
              {/* Image Frame aspect-[4/5] */}
              <div className="relative aspect-[4/5] w-full bg-[#181816]/5 overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-[#EFECE6] animate-pulse" />
                )}
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=85"
                  alt="Obra residencial de autor en Tarija"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  onLoad={() => setImageLoaded(true)}
                  className={`object-cover object-center transition-all duration-700 ease-out hover:scale-[1.02] ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                
                {/* Technical badge overlay */}
                <div className="absolute top-3 left-3 bg-[#181816] text-[#F6F5F2] font-mono text-[9px] uppercase tracking-widest px-2.5 py-1">
                  EDICIÓN KAIZEN · OBRA RESIDENCIAL
                </div>
              </div>

              {/* Technical Blueprint Caption */}
              <div className="pt-3.5 mt-2 border-t border-[#181816]/15 font-mono text-[11px] text-[#181816]/80 flex flex-col gap-1 leading-tight">
                <div className="flex items-center justify-between font-semibold text-[#181816]">
                  <span>RESIDENCIA LOS SAUCES</span>
                  <span className="text-[#A65D47]">USD 850 / M²</span>
                </div>
                <div className="flex items-center justify-between text-[#181816]/65 text-[10px]">
                  <span>420 M² · ORIENTACIÓN SUR</span>
                  <span>REF: KZ-04</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
