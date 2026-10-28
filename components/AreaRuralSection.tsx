'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';

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
      action: 'Ver Plano & Título Agrario',
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
      action: 'Descargar Masterplan',
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
      action: 'Solicitar Dictamen Legal',
      link: '/area-rural',
    },
  ];

  return (
    <section className="bg-[#002115] text-[#FDFCFA] py-16 sm:py-20 lg:py-24 border-t border-b border-[#19503b]/40" id="vinedos">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Header with Terroir Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 lg:mb-16 pb-8 border-b border-[#19503b]/40">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#b6efd3] animate-pulse" />
              <span className="text-legal-badge font-legal-badge tracking-widest uppercase text-[#b6efd3] font-semibold">
                Terruños de Altura & Oportunidades Agro-Residenciales
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-[#FDFCFA] tracking-tight">
              Terrenos, Fincas & Viñedos en el Valle de Tarija
            </h2>
            
            <p className="text-body-md sm:text-body-lg font-body-lg text-[#b6efd3]/80 mt-4 max-w-2xl leading-relaxed">
              El Valle Central de Tarija concentra la mayor valorización de tierra productiva y de descanso en Bolivia. Parcelas seleccionadas con derecho de agua perpetuo, viñedos en producción y folios saneados.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <div className="inline-flex flex-col text-left lg:text-right p-4 border border-[#19503b] bg-[#00170e] rounded-[2px]">
              <span className="text-legal-badge font-legal-badge text-[#b6efd3] uppercase font-semibold">
                Plusvalía Agrícola Proyectada
              </span>
              <span className="text-2xl font-headline-sm font-bold text-white mt-1">
                +14.2% Anual
              </span>
              <span className="text-xs text-[#858383]">
                Valle de la Concepción & Uriondo
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Terroir Asset Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ruralList.length >= 3
            ? ruralList.slice(0, 3).map((item) => {
                const img =
                  item.imagenes && item.imagenes.length > 0
                    ? item.imagenes[0]
                    : 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80';
                const p = Number(item.precio) || 0;

                return (
                  <div
                    key={item.id}
                    className="border border-[#19503b] bg-[#00281b] p-6 flex flex-col justify-between group hover:border-[#b6efd3] transition-colors rounded-[2px]"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden mb-6 relative rounded-[2px] bg-[#00170e]">
                        <Image
                          src={img}
                          alt={item.inmueble_name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 bg-[#002115]/95 px-2.5 py-1 text-legal-badge font-legal-badge uppercase tracking-wider text-[#b6efd3] border border-[#19503b] font-semibold">
                          Agua de Riego & DD.RR.
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-legal-badge font-legal-badge uppercase tracking-wider text-[#b6efd3] mb-2 font-semibold">
                        <span>{item.ciudad}</span>
                        <span>{item.tipo}</span>
                      </div>

                      <Link href={`/inmueble/${item.slug}`}>
                        <h3 className="text-xl font-headline-sm font-semibold text-white mb-3 hover:text-[#b6efd3] transition-colors">
                          {item.inmueble_name}
                        </h3>
                      </Link>

                      <p className="text-body-sm text-[#c8c6c5] mb-6 line-clamp-2 leading-relaxed">
                        {item.descripcion || 'Propiedad campestre con derechos de agua y documentación al día en el Valle de Tarija.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#19503b]">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-legal-badge font-legal-badge uppercase text-[#858383]">Inversión</span>
                        <span className="text-xl font-metric-price font-bold text-white">${p.toLocaleString()} USD</span>
                      </div>
                      <Link
                        href={`/inmueble/${item.slug}`}
                        className="block w-full text-center py-2.5 border border-[#b6efd3] text-[#b6efd3] hover:bg-[#b6efd3] hover:text-black font-body-sm font-semibold transition-colors rounded-[2px]"
                      >
                        Ver Plano & Ficha Técnica
                      </Link>
                    </div>
                  </div>
                );
              })
            : fallbackTerroirs.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#19503b] bg-[#00281b] p-6 flex flex-col justify-between group hover:border-[#b6efd3] transition-colors rounded-[2px]"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden mb-6 relative rounded-[2px] bg-[#00170e]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#002115]/95 px-2.5 py-1 text-legal-badge font-legal-badge uppercase tracking-wider text-[#b6efd3] border border-[#19503b] font-semibold">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-legal-badge font-legal-badge uppercase tracking-wider text-[#b6efd3] mb-2 font-semibold">
                      <span>{item.zone}</span>
                      <span>{item.type}</span>
                    </div>

                    <h3 className="text-xl font-headline-sm font-semibold text-white mb-3">
                      {item.title}
                    </h3>

                    <p className="text-body-sm text-[#c8c6c5] mb-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#19503b]">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-legal-badge font-legal-badge uppercase text-[#858383]">Precio Terruño</span>
                      <span className="text-xl font-metric-price font-bold text-white">{item.price}</span>
                    </div>
                    <Link
                      href={item.link}
                      className="block w-full text-center py-2.5 border border-[#b6efd3] text-[#b6efd3] hover:bg-[#b6efd3] hover:text-black font-body-sm font-semibold transition-colors rounded-[2px]"
                    >
                      {item.action}
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        {/* Bottom Call to Action for Rural Property Owners */}
        <div className="mt-12 lg:mt-16 border border-[#19503b] bg-[#001c12] p-6 sm:p-8 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-semibold text-white">
              ¿Posees una finca, viñedo o terreno rural en Tarija?
            </h4>
            <p className="text-xs text-[#c8c6c5]">
              Realizamos la tasación técnica y saneamiento en Derechos Reales e INRA para conectarte con compradores calificados.
            </p>
          </div>
          <Link
            href="/vender"
            className="bg-[#E60000] hover:bg-[#C00000] text-white px-6 py-3 rounded-[2px] text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shadow-sm"
          >
            Vender Mi Tierra con KAIZEN
          </Link>
        </div>

      </div>
    </section>
  );
}
