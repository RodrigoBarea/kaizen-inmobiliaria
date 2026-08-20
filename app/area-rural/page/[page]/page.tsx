'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import { getInmuebles } from '@/lib/supabase';
import InmuebleCard from '@/components/InmuebleCard';
import { ChevronLeft, ChevronRight, Loader2, Compass, Waves, ShieldCheck, TreePine } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ITEMS_PER_PAGE = 9;

export default function AreaRuralPage() {
  const params = useParams();
  const currentPage = Number(params?.page) || 1;

  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMunicipio, setSelectedMunicipio] = useState('Todos');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInmuebles({ isRural: true });
        setInmuebles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredInmuebles = selectedMunicipio === 'Todos'
    ? inmuebles
    : inmuebles.filter((i) => i.ciudad.toLowerCase() === selectedMunicipio.toLowerCase());

  const totalPages = Math.ceil(filteredInmuebles.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredInmuebles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    '¡Hola equipo KAIZEN! 🍇 Busco asesoría para comprar una propiedad en el Área Rural de Tarija (terreno, finca, viñedo o quinta). ¿Qué opciones tienen disponibles?'
  )}`;

  return (
    <div className="space-y-12 pb-20 pt-20 bg-white">
      
      {/* Hero Banner Campestre */}
      <div className="relative min-h-[360px] w-full overflow-hidden bg-[#151C18] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80"
          alt="Propiedades en Área Rural de Tarija"
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 space-y-3 py-16 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1 rounded-full">
            <TreePine className="w-3.5 h-3.5" /> Fincas, Viñedos & Terrenos Campestres
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Área Rural & Tierras Productivas en Tarija
          </h1>
          <p className="text-xs sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Invierte en la tierra de mayor plusvalía y encanto natural de Bolivia. Propiedades saneadas con acceso a agua de riego permanente en Uriondo, San Lorenzo, Tomatitas, Tolomosa y San Andrés.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Barra de Filtro por Municipio / Zona */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
          <div>
            <h2 className="font-headline-md text-xl font-bold text-[#1A1A1A]">
              Propiedades Rurales Disponibles ({filteredInmuebles.length})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fincas rústicas, casas de campo y parcelas con potencial agrícola o turístico
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Municipio:</span>
            <select
              value={selectedMunicipio}
              onChange={(e) => setSelectedMunicipio(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded font-body-md text-xs sm:text-sm text-[#1A1A1A] bg-white cursor-pointer focus:border-[#E60000] focus:ring-0"
            >
              <option value="Todos">Todo el Valle de Tarija</option>
              <option value="Uriondo">Uriondo / El Valle de la Concepción</option>
              <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
              <option value="Tarija">Cercado / San Andrés / Tolomosa</option>
              <option value="Bermejo">Bermejo</option>
              <option value="Yacuiba">Yacuiba</option>
              <option value="Villa Montes">Villa Montes</option>
            </select>
          </div>
        </div>

        {/* 3 Garantías KAIZEN para el Campo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F7F7F7] p-6 rounded-2xl border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Seguridad Jurídica INRA & DDRR</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Títulos saneados y verificación de gravámenes en Derechos Reales.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Agua de Riego Permanente</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Comprobamos derechos de acequia, tomas de agua y manantiales.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Asesoría Agronómica y Comercial</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Estudios de rentabilidad para viñedos, cabañas de alquiler o descanso.
              </p>
            </div>
          </div>
        </div>

        {/* Listado de Propiedades */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#E60000]" />
            <p className="text-sm font-semibold">Cargando catálogo rural...</p>
          </div>
        ) : filteredInmuebles.length === 0 ? (
          <div className="text-center py-20 bg-[#F7F7F7] rounded-xl border border-gray-200 space-y-4">
            <TreePine className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="font-bold text-lg text-gray-800">
              No hay propiedades registradas en este municipio por el momento
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Contáctanos directamente por WhatsApp para consultar opciones privadas o propiedades fuera del catálogo web.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-6 py-3 rounded text-xs uppercase tracking-wider shadow"
            >
              <FaWhatsapp className="text-base" />
              <span>Consultar Opciones Privadas</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentItems.map((inmueble) => (
              <InmuebleCard key={inmueble.id} inmueble={inmueble} />
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-6">
            {currentPage > 1 ? (
              <Link
                href={`/area-rural/page/${currentPage - 1}`}
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-[#1A1A1A]"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            ) : (
              <span className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-300 cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
              </span>
            )}

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <Link
                key={p}
                href={`/area-rural/page/${p}`}
                className={`w-10 h-10 rounded font-bold text-sm flex items-center justify-center transition ${
                  p === currentPage
                    ? 'bg-[#E60000] text-white shadow-sm'
                    : 'border border-gray-300 text-[#1A1A1A] hover:bg-gray-100'
                }`}
              >
                {p}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                href={`/area-rural/page/${currentPage + 1}`}
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-[#1A1A1A]"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <span className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-300 cursor-not-allowed">
                <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </div>
        )}

        {/* Banner CTA para Venta de Tierras y Fincas */}
        <div className="bg-[#1A1A1A] text-white p-8 sm:p-12 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-gray-800 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold text-[#E60000] uppercase tracking-widest bg-red-950/60 border border-red-900/60 px-3 py-1 rounded-full inline-block">
              Para Propietarios de Campo
            </span>
            <h3 className="font-headline-md text-2xl sm:text-3xl font-black">
              ¿Deseas vender o dar en anticrético una finca o terreno en Tarija?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              En KAIZEN contamos con clientes calificados en busca de hectáreas productivas, casas de campo y viñedos en los valles tarijeños. Realizamos un estudio de tasación real sin costo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/vender"
              className="bg-[#E60000] hover:bg-[#C00000] text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded shadow transition"
            >
              Registrar mi Inmueble Rural
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded shadow flex items-center gap-2 transition"
            >
              <FaWhatsapp className="text-base" />
              <span>Hablar con un Especialista</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
