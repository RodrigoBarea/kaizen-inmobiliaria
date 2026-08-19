'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BannerPrincipal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'venta' | 'alquiler' | 'anticretico' | 'vender'>('venta');
  const [ciudad, setCiudad] = useState('Todas');
  const [tipo, setTipo] = useState('Todos');
  const [rangoPrecio, setRangoPrecio] = useState('todos');

  const handleTabClick = (tab: 'venta' | 'alquiler' | 'anticretico' | 'vender') => {
    if (tab === 'vender') {
      router.push('/vender');
    } else {
      setActiveTab(tab);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (ciudad !== 'Todas') params.set('ciudad', ciudad);
    if (tipo !== 'Todos') params.set('tipo', tipo);
    params.set('categoria', activeTab);

    if (rangoPrecio === '50k') {
      params.set('max', '50000');
    } else if (rangoPrecio === '50k-150k') {
      params.set('min', '50000');
      params.set('max', '150000');
    } else if (rangoPrecio === '150k-300k') {
      params.set('min', '150000');
      params.set('max', '300000');
    } else if (rangoPrecio === '300k+') {
      params.set('min', '300000');
    }

    router.push(`/busqueda?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-20 overflow-hidden bg-[#1A1A1A]">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="bg-cover bg-center w-full h-full transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center py-20">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-5 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#E60000] animate-pulse" />
          <span className="text-xs uppercase font-bold tracking-widest text-white">
            KAIZEN Bienes Raíces
          </span>
        </motion.div>

        {/* H1 Titular con saltos de línea equilibrados */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-headline-md text-3xl sm:text-5xl md:text-6xl font-black text-white mb-5 max-w-4xl mx-auto uppercase tracking-tight drop-shadow-lg leading-[1.2]"
        >
          TU PRÓXIMO HOGAR. <br className="hidden sm:inline" />
          TU MEJOR INVERSIÓN. <br className="hidden sm:inline" />
          <span className="text-[#E60000] whitespace-nowrap">CERO RIESGOS.</span>
        </motion.h1>

        {/* Subtítulo conciso y equilibrado */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-body-lg text-sm sm:text-base md:text-lg text-white/90 mb-9 max-w-2xl mx-auto drop-shadow leading-relaxed"
        >
          Garantizamos tu tranquilidad en Bolivia con verificación rigurosa en Derechos Reales, asesoría crediticia y rentabilidad asegurada.
        </motion.p>

        {/* Mega Buscador Central */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto overflow-hidden border border-gray-100"
        >
          {/* Fila Superior: 4 Pestañas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-200 bg-[#F7F7F7]">
            <button
              type="button"
              onClick={() => handleTabClick('venta')}
              className={`py-3.5 px-3 font-label-md text-xs sm:text-sm font-bold transition-colors border-r border-gray-200 ${
                activeTab === 'venta'
                  ? 'bg-[#E60000] text-white'
                  : 'text-[#1A1A1A] hover:bg-gray-200/80'
              }`}
            >
              Comprar Propiedad
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('alquiler')}
              className={`py-3.5 px-3 font-label-md text-xs sm:text-sm font-bold transition-colors border-r border-gray-200 ${
                activeTab === 'alquiler'
                  ? 'bg-[#E60000] text-white'
                  : 'text-[#1A1A1A] hover:bg-gray-200/80'
              }`}
            >
              Alquilar
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('anticretico')}
              className={`py-3.5 px-3 font-label-md text-xs sm:text-sm font-bold transition-colors border-r border-gray-200 ${
                activeTab === 'anticretico'
                  ? 'bg-[#E60000] text-white'
                  : 'text-[#1A1A1A] hover:bg-gray-200/80'
              }`}
            >
              Tomar en Anticrético
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('vender')}
              className="py-3.5 px-3 font-label-md text-xs sm:text-sm font-bold text-[#1A1A1A] hover:bg-gray-200/80 transition-colors"
            >
              Vender mi Inmueble
            </button>
          </div>

          {/* Fila Inferior: Inputs limpios */}
          <form onSubmit={handleSearch} className="p-4 sm:p-6 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            
            {/* Select Ciudad */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Ciudad o Zona
              </label>
              <select
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full h-11 px-3 rounded border border-gray-300 font-body-md text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0 bg-white cursor-pointer"
              >
                <option value="Todas">¿En qué ciudad buscas invertir?</option>
                <option value="Tarija">Tarija</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="La Paz">La Paz</option>
                <option value="Cochabamba">Cochabamba</option>
                <option value="Bermejo">Bermejo</option>
                <option value="Yacuiba">Yacuiba</option>
              </select>
            </div>

            {/* Select Tipo de Propiedad */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Tipo de Inmueble
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full h-11 px-3 rounded border border-gray-300 font-body-md text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0 bg-white cursor-pointer"
              >
                <option value="Todos">Todos los tipos</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="Terreno">Terreno / Lote</option>
                <option value="Oficina Comercial">Oficina Comercial</option>
              </select>
            </div>

            {/* Select Rango de Precio */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Presupuesto ($us)
              </label>
              <select
                value={rangoPrecio}
                onChange={(e) => setRangoPrecio(e.target.value)}
                className="w-full h-11 px-3 rounded border border-gray-300 font-body-md text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0 bg-white cursor-pointer"
              >
                <option value="todos">Presupuesto máximo en $us</option>
                <option value="50k">Hasta $50,000</option>
                <option value="50k-150k">$50,000 - $150,000</option>
                <option value="150k-300k">$150,000 - $300,000</option>
                <option value="300k+">Más de $300,000</option>
              </select>
            </div>

            {/* Botón Rojo Buscar */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-11 bg-[#E60000] hover:bg-[#C00000] text-white font-label-md font-bold text-sm rounded transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap px-4"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span className="lg:hidden">Encontrar mi Propiedad Ideal</span>
                <span className="hidden lg:inline">Buscar</span>
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
