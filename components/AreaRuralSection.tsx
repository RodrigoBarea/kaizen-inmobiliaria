'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import { formatOperacion } from '@/lib/format';
import { TreePine, Droplets, Mountain, ShieldCheck, ArrowRight } from 'lucide-react';

interface Props {
  inmuebles?: Inmueble[];
}

export default function AreaRuralSection({ inmuebles = [] }: Props) {
  const ruralList = inmuebles.filter((i) => i.is_rural);

  // Fallback curated Terroir cards if DB has fewer than 3
  const fallbackTerroirs = [
    {
      id: 'riondo-parrales',
      title: 'Finca Viñedo Los Parrales',
      zone: 'Uriondo · Ruta del Singani',
      type: 'Finca Productiva',
      desc: '4.8 Hectáreas cultivadas con cepas Syrah y Tannat de altura (1,850 msnm). Incluye tranque propio, bomba de presión y tendido eléctrico trifásico.',
      badge: 'Agua de Riego Permanente',
      price: '$210,000 USD',
      img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80',
      action: 'Ver Inmueble',
      link: '/area-rural',
    },
    {
      id: 'san-lorenzo-mollar',
      title: "Terrenos Campestres 'El Mollar'",
      zone: 'San Lorenzo · Méndez',
      type: 'Quinta Vacacional',
      desc: 'Lotes desde 2,500 m² hasta 10,000 m² en urbanización ecológica cerrada. Acceso asfaltado directo a 15 minutos del centro de la ciudad de Tarija.',
      badge: 'Folio Matriz Individual',
      price: 'Desde $45,000 USD',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      action: 'Ver Inmueble',
      link: '/area-rural',
    },
    {
      id: 'padcaya-nogales',
      title: 'Hacienda Los Nogales',
      zone: 'Padcaya Sur',
      type: 'Macrolote Rural',
      desc: '12 Hectáreas con microclima templado de quebrada. Vertiente de agua de deshielo natural documentada y casa de campo colonial para restauración.',
      badge: 'Ideal Frutales / Viñedo',
      price: '$175,000 USD',
      img: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=800&auto=format&fit=crop&q=80',
      action: 'Ver Inmueble',
      link: '/area-rural',
    },
  ];

  return (
    <section className="bg-white text-primary py-16 sm:py-20 lg:py-24 border-t border-b border-border-hairline" id="vinedos">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Header inspirado en LuxuryEstate: Fondo blanco, tipografía editorial y detalles verdes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16 pb-8 border-b border-border-hairline">
          
          {/* Main Title & Eco Narrative */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#E7EFEA] border border-[#0B4632]/20 text-[#0B4632] text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm">
              <TreePine className="w-3.5 h-3.5 text-[#0B4632]" />
              <span>Propiedades de Campo & Viñedos</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-bold text-primary tracking-tight">
              Terrenos, fincas y viñedos en el Valle de Tarija
            </h2>
            
            <p className="text-body-md sm:text-body-lg font-body-lg text-text-muted mt-3 max-w-2xl leading-relaxed">
              Propiedades en Uriondo, San Lorenzo, Calamuchita y Padcaya aptas para descanso o producción agrícola. Parcelas con derecho de agua registrado, acceso vial y títulos saneados en Derechos Reales e INRA.
            </p>
          </div>

          {/* LuxuryEstate Style Terroir Value Cards with Green Accents */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="bg-[#F7FAF8] border border-[#0B4632]/15 p-3.5 rounded-[2px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[2px] bg-[#E7EFEA] text-[#0B4632] flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4 text-[#0B4632]" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-primary">Derecho de Agua de Riego</span>
                  <span className="text-[11px] text-text-muted">Río Guadalquivir, vertiente o pozo</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#0B4632] bg-[#E7EFEA] px-2 py-0.5 rounded-[2px]">100% Saneado</span>
            </div>

            <div className="bg-[#F7FAF8] border border-[#0B4632]/15 p-3.5 rounded-[2px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[2px] bg-[#E7EFEA] text-[#0B4632] flex items-center justify-center shrink-0">
                  <Mountain className="w-4 h-4 text-[#0B4632]" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-primary">Viticultura de Altura</span>
                  <span className="text-[11px] text-text-muted">1,700 a 1,950 msnm · 300 días sol</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#0B4632] bg-[#E7EFEA] px-2 py-0.5 rounded-[2px]">+14.2% Anual</span>
            </div>
          </div>

        </div>

        {/* 3-Column LuxuryEstate Card Showcase (Tarjetas limpias con fondo claro y detalles verdes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ruralList.length >= 3
            ? ruralList.slice(0, 3).map((item) => {
                const img =
                  item.imagenes && item.imagenes.length > 0
                    ? item.imagenes[0]
                    : 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80';
                const p = Number(item.precio) || 0;

                return (
                  <article
                    key={item.id}
                    className="border border-border-hairline bg-surface-stone p-6 flex flex-col justify-between group hover:border-[#0B4632] transition-colors rounded-[2px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  >
                    <div>
                      {/* Photo Frame */}
                      <div className="aspect-[16/10] overflow-hidden mb-6 relative rounded-[2px] bg-surface-warm">
                        <Image
                          src={img}
                          alt={item.inmueble_name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                        {/* Badges: Operación y Tipo juntos con detalle verde */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className="bg-surface-stone/95 backdrop-blur-md text-primary text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider border border-border-hairline shadow-sm">
                            {formatOperacion(item.categoria?.nombre_categoria)}
                          </span>
                          <span className="bg-[#0B4632] text-white text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider shadow-sm">
                            {item.tipo}
                          </span>
                        </div>
                      </div>

                      {/* Header Location with Luxury Green Accent */}
                      <div className="flex items-center justify-between text-legal-badge font-legal-badge uppercase tracking-wider text-[#0B4632] mb-2 font-semibold">
                        <span>{item.ciudad}</span>
                        <span>{item.tipo}</span>
                      </div>

                      <Link href={`/inmueble/${item.slug}`}>
                        <h3 className="text-xl font-headline-sm font-semibold text-primary mb-3 group-hover:text-[#0B4632] transition-colors">
                          {item.inmueble_name}
                        </h3>
                      </Link>

                      <p className="text-body-sm text-text-muted mb-6 line-clamp-2 leading-relaxed">
                        {item.descripcion || 'Propiedad campestre con derechos de agua registrados y documentación saneada en el Valle de Tarija.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border-hairline">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-legal-badge font-legal-badge uppercase text-text-muted">Inversión</span>
                        <span className="text-xl font-metric-price font-bold text-primary">${p.toLocaleString('es-BO')} USD</span>
                      </div>
                      <Link
                        href={`/inmueble/${item.slug}`}
                        className="block w-full text-center py-2.5 border border-[#0B4632] text-[#0B4632] hover:bg-[#0B4632] hover:text-white font-body-sm font-semibold transition-colors rounded-[2px]"
                      >
                        Ver Inmueble
                      </Link>
                    </div>
                  </article>
                );
              })
            : fallbackTerroirs.map((item) => (
                <article
                  key={item.id}
                  className="border border-border-hairline bg-surface-stone p-6 flex flex-col justify-between group hover:border-[#0B4632] transition-colors rounded-[2px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                >
                  <div>
                    {/* Photo Frame */}
                    <div className="aspect-[16/10] overflow-hidden mb-6 relative rounded-[2px] bg-surface-warm">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      {/* Badges: Operación y Tipo juntos con detalle verde */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        <span className="bg-surface-stone/95 backdrop-blur-md text-primary text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider border border-border-hairline shadow-sm">
                          En Venta
                        </span>
                        <span className="bg-[#0B4632] text-white text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider shadow-sm">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* Header Location with Luxury Green Accent */}
                    <div className="flex items-center justify-between text-legal-badge font-legal-badge uppercase tracking-wider text-[#0B4632] mb-2 font-semibold">
                      <span>{item.zone}</span>
                      <span>{item.type}</span>
                    </div>

                    <h3 className="text-xl font-headline-sm font-semibold text-primary mb-3 group-hover:text-[#0B4632] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-body-sm text-text-muted mb-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-hairline">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-legal-badge font-legal-badge uppercase text-text-muted">Precio Terruño</span>
                      <span className="text-xl font-metric-price font-bold text-primary">{item.price}</span>
                    </div>
                    <Link
                      href={item.link}
                      className="block w-full text-center py-2.5 border border-[#0B4632] text-[#0B4632] hover:bg-[#0B4632] hover:text-white font-body-sm font-semibold transition-colors rounded-[2px]"
                    >
                      {item.action}
                    </Link>
                  </div>
                </article>
              ))}
        </div>

        {/* Ambient Ecological Call to Action for Rural Property Owners (LuxuryEstate Style Light Box) */}
        <div className="mt-12 lg:mt-16 border border-[#0B4632]/20 bg-[#F7FAF8] p-6 sm:p-8 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-[2px] bg-[#E7EFEA] text-[#0B4632] flex items-center justify-center shrink-0 hidden sm:flex">
              <TreePine className="w-6 h-6 text-[#0B4632]" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary">
                ¿Posees una finca, viñedo o terreno rural en Tarija?
              </h4>
              <p className="text-xs text-text-muted mt-1 max-w-xl leading-relaxed">
                Realizamos la tasación técnica y saneamiento en Derechos Reales e INRA para conectarte con compradores directos e inversionistas calificados.
              </p>
            </div>
          </div>
          
          <Link
            href="/vender"
            className="bg-[#E60000] hover:bg-[#C00000] text-white px-6 py-3 rounded-[2px] text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shadow-sm active:scale-[0.98]"
          >
            Vender Mi Tierra con KAIZEN
          </Link>
        </div>

      </div>
    </section>
  );
}
