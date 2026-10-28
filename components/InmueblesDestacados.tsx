'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import InmuebleCard from './InmuebleCard';

interface Props {
  inmuebles?: Inmueble[];
}

export default function InmueblesDestacados({ inmuebles = [] }: Props) {
  const [leadImgLoaded, setLeadImgLoaded] = useState(false);
  const list = Array.isArray(inmuebles) ? inmuebles : [];

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');

  if (list.length === 0) {
    return (
      <section className="py-16 sm:py-24 bg-surface-canvas border-b border-border-hairline" id="propiedades">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center py-12">
          <span className="material-symbols-outlined text-4xl text-text-muted mb-2">home_work</span>
          <h3 className="text-headline-sm font-semibold text-primary">Colección en Auditoría</h3>
          <p className="text-body-sm text-text-muted mt-1">
            Nuevas propiedades están siendo homologadas con Derechos Reales para su publicación.
          </p>
        </div>
      </section>
    );
  }

  const lead = list[0];
  const sideCards = list.slice(1, 3);
  const remainingCards = list.slice(3, 6);

  const leadImg =
    lead.imagenes && lead.imagenes.length > 0
      ? lead.imagenes[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80';

  const leadPrice = Number(lead.precio) || 0;
  const leadWaUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `¡Hola equipo KAIZEN! 👋 Deseo agendar una visita privada para la propiedad "${lead.inmueble_name}" ($${leadPrice.toLocaleString('es-BO')} USD) en Tarija. ¿Podrían informarme la disponibilidad?`
  )}`;

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-surface-canvas border-b border-border-hairline" id="propiedades">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 border-b border-border-hairline pb-6">
          <div>
            <span className="text-legal-badge font-legal-badge uppercase tracking-[0.14em] text-text-muted block mb-2 font-semibold">
              Selección de Autor 2025
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-primary tracking-tight">
              Colección Residencial Destacada
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <span className="text-body-sm font-body-sm text-text-muted hidden sm:inline">
              Filtro Jurídico: 100% DD.RR. Homologado
            </span>
            <Link
              href="/compra/page/1"
              className="text-body-sm font-body-sm font-medium text-primary hover:text-kaizen-red flex items-center gap-1 transition-colors"
            >
              <span>Ver Catálogo Completo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Large Scale Masterpiece (7 Columns) */}
          <article className="lg:col-span-7 bg-surface-stone border border-border-hairline rounded-[2px] flex flex-col group overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <Link href={`/inmueble/${lead.slug}`} className="relative aspect-[16/10] overflow-hidden bg-surface-warm block">
              {!leadImgLoaded && (
                <div className="absolute inset-0 skeleton-shimmer bg-surface-warm z-0" />
              )}
              <Image
                src={leadImg}
                alt={lead.inmueble_name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                onLoad={() => setLeadImgLoaded(true)}
                className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
                  leadImgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Tags Over Image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="bg-[#E7EFEA] border border-[#0B4632] text-[#0B4632] px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  <span>Título Saneado en DD.RR.</span>
                </span>
                <span className="bg-surface-stone/90 backdrop-blur-md border border-border-hairline text-primary px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold shadow-sm">
                  Apto Crédito Bancario
                </span>
              </div>

              <div className="absolute bottom-3 right-3 bg-primary text-white text-[10px] font-legal-badge uppercase px-2.5 py-1 rounded-[2px]">
                {lead.categoria?.nombre_categoria || 'Venta'}
              </div>
            </Link>

            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-text-muted font-medium">
                    {lead.direccion || lead.ciudad} · Tarija
                  </span>
                  <span className="text-legal-badge font-legal-badge text-[#0B4632] bg-emerald-subtle px-2 py-0.5 rounded-[2px] font-semibold">
                    Ref: KZ-{lead.id.slice(0, 4).toUpperCase()}
                  </span>
                </div>

                <Link href={`/inmueble/${lead.slug}`}>
                  <h3 className="text-xl sm:text-2xl font-headline-md font-semibold text-primary mb-3 hover:text-kaizen-red transition-colors">
                    {lead.inmueble_name}
                  </h3>
                </Link>

                <p className="text-body-md font-body-md text-text-muted mb-6 leading-relaxed line-clamp-2">
                  {lead.descripcion || 'Propiedad de autor con diseño contemporáneo, acabados de primera y entorno residencial privilegiado en Tarija.'}
                </p>
              </div>

              <div>
                {/* Micro-spec Tabular Rule */}
                <div className="grid grid-cols-4 border-t border-b border-border-hairline py-4 mb-6 text-center text-xs">
                  <div>
                    <span className="block text-[10px] font-legal-badge text-text-muted uppercase">Construido</span>
                    <span className="text-sm font-semibold text-primary">{lead.construccion || '—'} m²</span>
                  </div>
                  <div className="border-l border-border-hairline">
                    <span className="block text-[10px] font-legal-badge text-text-muted uppercase">Terreno</span>
                    <span className="text-sm font-semibold text-primary">{lead.terreno || '—'} m²</span>
                  </div>
                  <div className="border-l border-border-hairline">
                    <span className="block text-[10px] font-legal-badge text-text-muted uppercase">Suites</span>
                    <span className="text-sm font-semibold text-primary">{lead.dormitorios || 0} Dorms</span>
                  </div>
                  <div className="border-l border-border-hairline">
                    <span className="block text-[10px] font-legal-badge text-text-muted uppercase">Cochera</span>
                    <span className="text-sm font-semibold text-primary">{lead.estacionamientos || 1} Autos</span>
                  </div>
                </div>

                {/* Price and Action Cluster */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-2xl sm:text-[26px] font-metric-price font-bold text-primary">
                      ${leadPrice.toLocaleString('es-BO')} USD
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={leadWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#E60000] hover:bg-[#C00000] text-white text-xs font-semibold transition-colors rounded-[2px] flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>Agendar Visita</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Column 2: Vertical Refined Dual Stack (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {sideCards.map((item) => {
              const itemPrice = Number(item.precio) || 0;
              const itemImg =
                item.imagenes && item.imagenes.length > 0
                  ? item.imagenes[0]
                  : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80';

              return (
                <article
                  key={item.id}
                  className="bg-surface-stone border border-border-hairline rounded-[2px] flex flex-col group flex-1 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-primary transition-all duration-300"
                >
                  <Link href={`/inmueble/${item.slug}`} className="relative aspect-[16/9] overflow-hidden bg-surface-warm block">
                    <Image
                      src={itemImg}
                      alt={item.inmueble_name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#E7EFEA] border border-[#0B4632] text-[#0B4632] px-2.5 py-0.5 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold">
                        DD.RR. Al Día
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-text-muted block mb-1">
                        {item.ciudad} · Tarija
                      </span>
                      <Link href={`/inmueble/${item.slug}`}>
                        <h3 className="text-lg font-headline-sm font-semibold text-primary mb-2 hover:text-kaizen-red transition-colors line-clamp-1">
                          {item.inmueble_name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                        <span>{item.construccion || item.terreno || 150} m²</span>
                        <span>•</span>
                        <span>{item.dormitorios || 3} Dorms</span>
                        <span>•</span>
                        <span>{item.banos || 2} Baños</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border-hairline flex items-center justify-between">
                      <div>
                        <span className="text-lg font-headline-sm font-bold text-primary">
                          ${itemPrice.toLocaleString('es-BO')} USD
                        </span>
                      </div>
                      <Link
                        href={`/inmueble/${item.slug}`}
                        className="text-xs font-semibold text-primary hover:text-kaizen-red flex items-center gap-1 transition-colors"
                      >
                        <span>Ver Inmueble</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>

        {/* Remaining 3-column cards if available */}
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
