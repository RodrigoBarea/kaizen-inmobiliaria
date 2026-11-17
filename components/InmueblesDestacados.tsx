'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import InmuebleCard from './InmuebleCard';
import { formatOperacion } from '@/lib/format';
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  inmuebles?: Inmueble[];
}

export default function InmueblesDestacados({ inmuebles = [] }: Props) {
  const [filterObjective, setFilterObjective] = useState<'todos' | 'roi' | 'vivienda'>('todos');
  const [leadImgLoaded, setLeadImgLoaded] = useState(false);
  const rawList = Array.isArray(inmuebles) ? inmuebles : [];

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');

  // Filtrado por objetivo del cliente
  const filteredList = useMemo(() => {
    if (filterObjective === 'todos') return rawList;
    if (filterObjective === 'roi') {
      // Priorizar terrenos, locales o inmuebles con buena relación precio/área
      return rawList.filter(
        (item) =>
          item.tipo?.toLowerCase().includes('terreno') ||
          item.tipo?.toLowerCase().includes('comercial') ||
          item.tipo?.toLowerCase().includes('departamento') ||
          Number(item.precio) <= 150000
      );
    }
    if (filterObjective === 'vivienda') {
      return rawList.filter(
        (item) =>
          item.tipo?.toLowerCase().includes('casa') ||
          (item.dormitorios && item.dormitorios >= 2)
      );
    }
    return rawList;
  }, [rawList, filterObjective]);

  if (rawList.length === 0) {
    return (
      <section className="py-16 sm:py-24 bg-[#F6F5F2] border-b border-[#181816]/15" id="propiedades">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center py-12">
          <span className="material-symbols-outlined text-4xl text-[#181816]/40 mb-2">home_work</span>
          <h3 className="font-editorial text-2xl font-semibold text-[#181816]">Propiedades en proceso de auditoría</h3>
          <p className="font-sans text-xs sm:text-sm text-[#181816]/65 mt-1">
            Nuevas piezas en proceso de saneamiento registral y peritaje constructivo para publicación.
          </p>
        </div>
      </section>
    );
  }

  const displayList = filteredList.length > 0 ? filteredList : rawList;
  const lead = displayList[0];
  const sideCards = displayList.slice(1, 3);
  const remainingCards = displayList.slice(3, 9);

  const leadImg =
    lead.imagenes && lead.imagenes.length > 0
      ? lead.imagenes[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80';

  const leadPrice = Number(lead.precio) || 0;
  const leadArea = lead.construccion || lead.terreno || 0;
  const leadM2Price = leadArea > 0 ? Math.round(leadPrice / leadArea) : null;
  const leadRef = `KZ-${lead.id.slice(0, 4).toUpperCase()}`;

  const leadWaUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola equipo KAIZEN. Deseo agendar una visita y solicitar el informe notarial de la propiedad "${lead.inmueble_name}" (REF: ${leadRef}, $${leadPrice.toLocaleString('es-BO')} USD).`
  )}`;

  return (
    <section className="py-16 sm:py-24 bg-[#F6F5F2] border-b border-[#181816]/15" id="propiedades">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Chapter Header with Objective Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-[#181816]/15 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A65D47] block mb-2 font-medium">
              Curaduría Exclusiva Tarija
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181816] tracking-tight">
              Catálogo de <span className="italic font-normal text-[#A65D47]">Fichas Técnicas</span>
            </h2>
          </div>
          
          {/* Objective Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-[#EFECE6] border border-[#181816]/15 p-1 inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFilterObjective('todos')}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors active:scale-[0.98] ${
                  filterObjective === 'todos'
                    ? 'bg-[#181816] text-[#F6F5F2]'
                    : 'text-[#181816]/70 hover:text-[#181816]'
                }`}
              >
                Todas ({rawList.length})
              </button>

              <button
                type="button"
                onClick={() => setFilterObjective('roi')}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors active:scale-[0.98] ${
                  filterObjective === 'roi'
                    ? 'bg-[#181816] text-[#F6F5F2]'
                    : 'text-[#181816]/70 hover:text-[#181816]'
                }`}
              >
                Inversión / Alto ROI
              </button>

              <button
                type="button"
                onClick={() => setFilterObjective('vivienda')}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors active:scale-[0.98] ${
                  filterObjective === 'vivienda'
                    ? 'bg-[#181816] text-[#F6F5F2]'
                    : 'text-[#181816]/70 hover:text-[#181816]'
                }`}
              >
                Vivienda & Familia
              </button>
            </div>

            <Link
              href="/compra/page/1"
              className="font-mono text-xs uppercase tracking-wider text-[#181816] hover:text-[#A65D47] flex items-center gap-1 transition-colors px-2 py-1.5"
            >
              <span>Ver todas</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Masterpiece Feature (7 Columns) */}
          <article className="lg:col-span-7 bg-[#EFECE6] border border-[#181816]/15 flex flex-col group overflow-hidden hover:border-[#181816] transition-colors">
            <Link href={`/inmueble/${lead.slug}`} className="relative aspect-[16/10] overflow-hidden bg-[#181816]/5 block">
              {!leadImgLoaded && (
                <div className="absolute inset-0 bg-[#EFECE6] animate-pulse" />
              )}
              <Image
                src={leadImg}
                alt={lead.inmueble_name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                onLoad={() => setLeadImgLoaded(true)}
                className={`w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out ${
                  leadImgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Technical Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 font-mono text-[10px] uppercase tracking-wider">
                <span className="bg-[#181816] text-[#F6F5F2] px-2.5 py-1">
                  {formatOperacion(lead.categoria?.nombre_categoria)}
                </span>
                <span className="bg-[#F6F5F2] text-[#181816] border border-[#181816]/20 px-2.5 py-1">
                  REF: {leadRef}
                </span>
              </div>

              {leadM2Price && (
                <div className="absolute bottom-3 right-3 bg-[#181816]/90 backdrop-blur-sm text-[#F6F5F2] font-mono text-[10px] uppercase px-2.5 py-1">
                  ${leadM2Price}/M²
                </div>
              )}
            </Link>

            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#181816]/65 mb-2">
                  <span>{lead.direccion || lead.ciudad} · Tarija</span>
                  <span className="text-[#A65D47] font-semibold">AUDITORÍA APROBADA</span>
                </div>

                <Link href={`/inmueble/${lead.slug}`}>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#181816] group-hover:text-[#A65D47] transition-colors mb-3">
                    {lead.inmueble_name}
                  </h3>
                </Link>

                <p className="font-sans text-xs sm:text-sm text-[#181816]/75 mb-6 leading-relaxed line-clamp-2">
                  {lead.descripcion || 'Propiedad de autor con peritaje estructural concluido y tradición registral limpia en Derechos Reales.'}
                </p>
              </div>

              <div>
                {/* Blueprint Table 4-col */}
                <div className="grid grid-cols-4 border-t border-b border-[#181816]/15 py-3 mb-6 text-center font-mono text-[10px] uppercase">
                  <div>
                    <span className="block text-[#181816]/50 text-[9px]">Construcción</span>
                    <span className="font-semibold text-[#181816] text-xs">{lead.construccion || '—'} m²</span>
                  </div>
                  <div className="border-l border-[#181816]/15">
                    <span className="block text-[#181816]/50 text-[9px]">Terreno</span>
                    <span className="font-semibold text-[#181816] text-xs">{lead.terreno || '—'} m²</span>
                  </div>
                  <div className="border-l border-[#181816]/15">
                    <span className="block text-[#181816]/50 text-[9px]">Habitaciones</span>
                    <span className="font-semibold text-[#181816] text-xs">{lead.dormitorios || 0} Hab.</span>
                  </div>
                  <div className="border-l border-[#181816]/15">
                    <span className="block text-[#181816]/50 text-[9px]">Valor M²</span>
                    <span className="font-semibold text-[#A65D47] text-xs">{leadM2Price ? `$${leadM2Price}` : 'Consultar'}</span>
                  </div>
                </div>

                {/* Price and Action Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-editorial text-3xl font-bold text-[#181816]">
                      ${leadPrice.toLocaleString('es-BO')} <span className="font-mono text-xs font-normal text-[#181816]/60">USD</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={leadWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#181816] hover:bg-[#A65D47] active:scale-[0.98] text-[#F6F5F2] font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                    >
                      <FaWhatsapp className="text-[14px]" />
                      <span>Agendar Visita</span>
                    </a>

                    <Link
                      href={`/inmueble/${lead.slug}`}
                      className="px-3.5 py-2.5 border border-[#181816]/25 hover:border-[#181816] text-[#181816] font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
                    >
                      <span>Ver Ficha</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Column 2: Side Cards (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideCards.map((item) => (
              <InmuebleCard key={item.id} inmueble={item} />
            ))}
          </div>

        </div>

        {/* Remaining properties grid */}
        {remainingCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {remainingCards.map((item) => (
              <InmuebleCard key={item.id} inmueble={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
