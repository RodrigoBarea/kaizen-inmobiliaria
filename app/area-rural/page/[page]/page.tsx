'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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
    <div className="bg-white min-h-screen pb-24">
      
      {/* Luminous Editorial Header inspirado en LuxuryEstate & Terruño */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase font-semibold tracking-wider text-[#0B4632] bg-[#E7EFEA] border border-[#0B4632]/20 px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              <TreePine className="w-3.5 h-3.5 text-[#0B4632]" /> Ecosistema & Terruño · Valle Central de Tarija
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Área rural, fincas y viñedos en Tarija
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Propiedades rurales en Uriondo, San Lorenzo, Padcaya y Calamuchita. Fincas y parcelas con derechos de agua registrados, suelo fértil y titulación saneada en INRA y Derechos Reales.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 space-y-10">
        
        {/* Barra de Filtro por Municipio / Zona */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border-hairline">
          <div>
            <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
              Propiedades disponibles ({filteredInmuebles.length})
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Fincas rústicas, casas de campo y parcelas con potencial agrícola o turístico
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Municipio:</span>
            <select
              value={selectedMunicipio}
              onChange={(e) => setSelectedMunicipio(e.target.value)}
              className="h-10 px-3 border border-border-hairline rounded-[2px] font-body-md text-xs sm:text-sm text-primary bg-white cursor-pointer focus:border-[#0B4632] focus:ring-0 shadow-sm"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-canvas p-6 rounded-[2px] border border-border-hairline">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[2px] bg-[#E7EFEA] text-[#0B4632] flex items-center justify-center shrink-0 border border-[#0B4632]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary">Seguridad Jurídica INRA & DDRR</h4>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                Títulos saneados y verificación exhaustiva de gravámenes en Derechos Reales.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[2px] bg-[#E7EFEA] text-[#0B4632] flex items-center justify-center shrink-0 border border-[#0B4632]/20">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary">Agua de Riego Permanente</h4>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                Comprobamos derechos de acequia, tomas de agua, pozos y vertientes naturales.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-[2px] bg-[#E7EFEA] text-[#0B4632] flex items-center justify-center shrink-0 border border-[#0B4632]/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary">Asesoría Agronómica y Comercial</h4>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                Estudios de rentabilidad para viñedos, cabañas de descanso o proyectos turísticos.
              </p>
            </div>
          </div>
        </div>

        {/* Listado de Propiedades */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-text-muted gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#0B4632]" />
            <p className="text-sm font-medium">Cargando catálogo rural...</p>
          </div>
        ) : filteredInmuebles.length === 0 ? (
          <div className="text-center py-20 bg-surface-canvas rounded-[2px] border border-border-hairline space-y-4">
            <TreePine className="w-12 h-12 text-[#0B4632]/40 mx-auto" />
            <h3 className="font-semibold text-lg text-primary">
              No hay propiedades registradas en este municipio por el momento
            </h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Contáctanos directamente por WhatsApp para consultar opciones privadas o propiedades fuera del catálogo público.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0B4632] hover:bg-[#083526] text-white font-medium px-6 py-2.5 rounded-[2px] text-xs uppercase tracking-wider transition-colors shadow-sm"
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
                className="w-10 h-10 rounded-[2px] border border-border-hairline flex items-center justify-center hover:bg-surface-stone transition text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            ) : (
              <span className="w-10 h-10 rounded-[2px] border border-border-hairline flex items-center justify-center text-text-muted/40 cursor-not-allowed bg-surface-canvas">
                <ChevronLeft className="w-5 h-5" />
              </span>
            )}

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <Link
                key={p}
                href={`/area-rural/page/${p}`}
                className={`w-10 h-10 rounded-[2px] font-semibold text-xs flex items-center justify-center transition ${
                  p === currentPage
                    ? 'bg-[#0B4632] text-white shadow-sm'
                    : 'border border-border-hairline text-primary hover:bg-surface-stone bg-white'
                }`}
              >
                {p}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                href={`/area-rural/page/${currentPage + 1}`}
                className="w-10 h-10 rounded-[2px] border border-border-hairline flex items-center justify-center hover:bg-surface-stone transition text-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <span className="w-10 h-10 rounded-[2px] border border-border-hairline flex items-center justify-center text-text-muted/40 cursor-not-allowed bg-surface-canvas">
                <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </div>
        )}

        {/* Banner CTA para Venta de Tierras y Fincas con estilo refinado */}
        <div className="bg-surface-canvas p-8 sm:p-12 rounded-[2px] flex flex-col lg:flex-row items-center justify-between gap-8 border border-border-hairline shadow-sm">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-[11px] font-semibold text-[#0B4632] uppercase tracking-wider bg-[#E7EFEA] border border-[#0B4632]/20 px-3 py-1 rounded-[2px] inline-block shadow-sm">
              Para Propietarios de Campo
            </span>
            <h3 className="font-display-xl text-2xl sm:text-3xl font-bold text-primary">
              ¿Deseas vender o dar en anticrético una finca o terreno en Tarija?
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              En KAIZEN contamos con clientes calificados en busca de hectáreas productivas, casas de campo y viñedos en los valles tarijeños. Realizamos un estudio de tasación real sin costo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/vender"
              className="bg-primary hover:bg-primary-hover text-white font-medium text-xs uppercase tracking-wider px-6 py-3.5 rounded-[2px] shadow-sm transition-colors"
            >
              Registrar mi Inmueble Rural
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B4632] hover:bg-[#083526] text-white font-medium text-xs uppercase tracking-wider px-6 py-3.5 rounded-[2px] shadow-sm flex items-center gap-2 transition-colors"
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
