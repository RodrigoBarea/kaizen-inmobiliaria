'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import { formatOperacion } from '@/lib/format';
import { TreePine, Droplets, Mountain, ShieldCheck } from 'lucide-react';

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
    <section className="relative bg-gradient-to-b from-[#00170E] via-[#002216] to-[#00140C] text-[#FDFCFA] py-16 sm:py-20 lg:py-24 border-t border-b border-[#235841]/40 overflow-hidden" id="vinedos">
      
      {/* Ambient Ecological Lighting & Atmospheric Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[300px] bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        
        {/* Header with Terroir & Countryside Atmosphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16 pb-8 border-b border-[#235841]/40">
          
          {/* Main Title & Eco Narrative */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003823]/80 border border-[#235841] text-[#A7F3D0] text-xs font-semibold tracking-wide mb-4 shadow-sm">
              <TreePine className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Ecosistema & Terruño · Valle Central de Tarija</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display-xl font-bold text-white tracking-tight leading-[1.15]">
              Terrenos, fincas y viñedos de altura en Tarija
            </h2>
            
            <p className="text-sm sm:text-base text-[#D1FAE5]/85 mt-4 max-w-2xl leading-relaxed">
              Propiedades rurales en Uriondo, San Lorenzo, Padcaya y Calamuchita con vocación agrícola y campestre. Parcelas con derechos de agua de riego registrados, suelo fértil y titulación saneada en INRA y Derechos Reales.
            </p>
          </div>

          {/* 3 Ecological Pillars */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="bg-[#00170E]/80 backdrop-blur-md border border-[#235841]/70 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#003B26] text-[#34D399] flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Derecho de Agua de Riego</span>
                <span className="text-[11px] text-[#A7F3D0]/70">Canales matrices, río Guadalquivir o vertiente</span>
              </div>
            </div>

            <div className="bg-[#00170E]/80 backdrop-blur-md border border-[#235841]/70 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#003B26] text-[#34D399] flex items-center justify-center shrink-0">
                <Mountain className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">1,700 a 1,950 msnm</span>
                <span className="text-[11px] text-[#A7F3D0]/70">Viticultura de altura con 300 días de sol</span>
              </div>
            </div>

            <div className="bg-[#00170E]/80 backdrop-blur-md border border-[#235841]/70 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#003B26] text-[#34D399] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Saneamiento INRA & DD.RR.</span>
                <span className="text-[11px] text-[#A7F3D0]/70">Títulos limpios listos para transferencia</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3-Column Terroir Asset Showcase (Estilo de Tarjetas de Inmuebles de Antes) */}
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
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                        {/* Badges: Operación y Tipo juntos */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className="bg-[#00170e]/85 backdrop-blur-md saturate-[160%] text-[#b6efd3] text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider border border-[#19503b]/80 shadow-sm">
                            {formatOperacion(item.categoria?.nombre_categoria)}
                          </span>
                          <span className="bg-[#0B4632]/85 backdrop-blur-md saturate-[160%] text-white text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider shadow-sm">
                            {item.tipo}
                          </span>
                        </div>
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
                        <span className="text-xl font-metric-price font-bold text-white">${p.toLocaleString('es-BO')} USD</span>
                      </div>
                      <Link
                        href={`/inmueble/${item.slug}`}
                        className="block w-full text-center py-2.5 border border-[#b6efd3] text-[#b6efd3] hover:bg-[#b6efd3] hover:text-black font-body-sm font-semibold transition-colors rounded-[2px]"
                      >
                        Ver Inmueble
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
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      {/* Badges: Operación y Tipo juntos */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        <span className="bg-[#00170e]/85 backdrop-blur-md saturate-[160%] text-[#b6efd3] text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider border border-[#19503b]/80 shadow-sm">
                          En Venta
                        </span>
                        <span className="bg-[#0B4632]/85 backdrop-blur-md saturate-[160%] text-white text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider shadow-sm">
                          {item.type}
                        </span>
                      </div>
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

        {/* Ambient Ecological Call to Action for Rural Property Owners */}
        <div className="mt-12 lg:mt-16 border border-[#19503b] bg-[#001c12] p-6 sm:p-8 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-[2px] bg-[#00422B] text-[#34D399] flex items-center justify-center shrink-0 hidden sm:flex">
              <TreePine className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                ¿Posees una finca, viñedo o terreno rural en Tarija?
              </h4>
              <p className="text-xs text-[#D1FAE5]/75 mt-1 max-w-xl leading-relaxed">
                Evaluamos la vocación del suelo, derechos de agua y titulación agraria para conectarte directamente con compradores e inversionistas calificados.
              </p>
            </div>
          </div>
          
          <Link
            href="/vender"
            className="bg-[#E60000] hover:bg-[#C00000] active:scale-[0.97] text-white px-7 py-3.5 rounded-[2px] text-xs font-semibold uppercase tracking-wider transition-[background-color,transform] whitespace-nowrap shadow-md hover:-translate-y-0.5"
          >
            Vender Mi Tierra con KAIZEN
          </Link>
        </div>

      </div>
    </section>
  );
}
