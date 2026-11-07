'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import { formatOperacion } from '@/lib/format';
import { TreePine, Droplets, Mountain, ShieldCheck, ArrowRight, SunMedium, Waves } from 'lucide-react';

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
      desc: '4.8 Hectáreas cultivadas con cepas Syrah y Tannat de altura (1,850 msnm). Incluye tranque propio con geomembrana, bomba de presión y tendido trifásico.',
      ecoTag: 'Agua de Riego Permanente',
      soil: 'Suelo Aluvial Fértil',
      price: '$210,000 USD',
      img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80',
      link: '/area-rural',
    },
    {
      id: 'san-lorenzo-mollar',
      title: "Quinta Campestre 'El Mollar'",
      zone: 'San Lorenzo · Valle Alto',
      type: 'Quinta Vacacional',
      desc: 'Parcelas campestres con nogales centenarios, acequia de riego comunal y vistas despejadas a la cordillera de Sama. A 15 minutos del centro de Tarija.',
      ecoTag: 'Entorno Ecológico Protegido',
      soil: 'Microclima Templado',
      price: 'Desde $45,000 USD',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      link: '/area-rural',
    },
    {
      id: 'padcaya-nogales',
      title: 'Hacienda y Huerto Los Nogales',
      zone: 'Padcaya Sur · Valle de Tarija',
      type: 'Macrolote Rural',
      desc: '12 Hectáreas con vertiente natural de quebrada. Apta para producción de vid, ciruelo y nogal con casa de campo rústica y caminos internos afirmados.',
      ecoTag: 'Vertiente de Manantial',
      soil: 'Apto Viñedos & Frutales',
      price: '$175,000 USD',
      img: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=800&auto=format&fit=crop&q=80',
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

          {/* 3 Ecological Pillars (Apple Translucent Cards) */}
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

        {/* 3-Column Countryside & Terroir Asset Showcase */}
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
                    className="bg-[#001D13]/85 backdrop-blur-xl border border-[#235841]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#34D399]/70 hover:shadow-[0_16px_40px_rgba(0,35,20,0.5)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1"
                  >
                    <div>
                      {/* Photo Frame with Floating Apple Pills */}
                      <div className="aspect-[16/10] overflow-hidden mb-5 relative rounded-xl bg-[#00140C]">
                        <Image
                          src={img}
                          alt={item.inmueble_name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        />
                        {/* Badges: Operación y Tipo juntos (Apple Translucent Dark Glass) */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className="bg-[#00170E]/90 backdrop-blur-md text-[#A7F3D0] text-[10px] uppercase px-3 py-1 rounded-full font-semibold tracking-wider border border-[#235841] shadow-sm">
                            {formatOperacion(item.categoria?.nombre_categoria)}
                          </span>
                          <span className="bg-[#0B4632]/90 backdrop-blur-md text-white text-[10px] uppercase px-3 py-1 rounded-full font-semibold tracking-wider shadow-sm">
                            {item.tipo}
                          </span>
                        </div>

                        {/* Ecological indicator tag */}
                        <div className="absolute bottom-3 right-3 z-10">
                          <span className="bg-[#00170E]/85 backdrop-blur-md text-[#34D399] text-[10px] px-2.5 py-0.5 rounded-full font-medium border border-[#235841]/70 shadow-sm flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-[#34D399]" />
                            <span>Agua de Riego</span>
                          </span>
                        </div>
                      </div>

                      {/* Location & Terroir Header */}
                      <div className="flex items-center justify-between text-xs font-semibold text-[#34D399] mb-2">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                          {item.ciudad}
                        </span>
                        <span className="text-white/60 text-[11px] font-normal">Valle de Tarija</span>
                      </div>

                      <Link href={`/inmueble/${item.slug}`}>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 hover:text-[#A7F3D0] transition-colors line-clamp-1">
                          {item.inmueble_name}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#D1FAE5]/70 mb-5 line-clamp-2 leading-relaxed">
                        {item.descripcion || 'Propiedad campestre con derechos de agua registrados y documentación saneada en el Valle de Tarija.'}
                      </p>

                      {/* Countryside Attributes Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-[#235841]/40 text-[11px] text-[#A7F3D0]">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#002B1D] border border-[#235841]/50 flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-[#34D399]" /> Agua registrada
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#002B1D] border border-[#235841]/50 flex items-center gap-1">
                          <TreePine className="w-3 h-3 text-[#34D399]" /> Suelo fértil
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#002B1D] border border-[#235841]/50 flex items-center gap-1">
                          <Mountain className="w-3 h-3 text-[#34D399]" /> Valle Central
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#235841]/40 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-[10px] uppercase font-semibold tracking-wider text-[#A7F3D0]/70">Inversión</span>
                        <span className="text-xl font-metric-price font-bold text-white tracking-tight">${p.toLocaleString('es-BO')} USD</span>
                      </div>
                      <Link
                        href={`/inmueble/${item.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#34D399] text-[#A7F3D0] hover:bg-[#34D399] hover:text-[#00170E] font-semibold text-xs transition-[background-color,color,transform] active:scale-[0.97]"
                      >
                        <span>Ver Finca</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            : fallbackTerroirs.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#001D13]/85 backdrop-blur-xl border border-[#235841]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#34D399]/70 hover:shadow-[0_16px_40px_rgba(0,35,20,0.5)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1"
                >
                  <div>
                    {/* Photo Frame with Floating Apple Pills */}
                    <div className="aspect-[16/10] overflow-hidden mb-5 relative rounded-xl bg-[#00140C]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                      />
                      {/* Badges: Operación y Tipo juntos (Apple Translucent Dark Glass) */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        <span className="bg-[#00170E]/90 backdrop-blur-md text-[#A7F3D0] text-[10px] uppercase px-3 py-1 rounded-full font-semibold tracking-wider border border-[#235841] shadow-sm">
                          En Venta
                        </span>
                        <span className="bg-[#0B4632]/90 backdrop-blur-md text-white text-[10px] uppercase px-3 py-1 rounded-full font-semibold tracking-wider shadow-sm">
                          {item.type}
                        </span>
                      </div>

                      {/* Ecological indicator tag */}
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="bg-[#00170E]/85 backdrop-blur-md text-[#34D399] text-[10px] px-2.5 py-0.5 rounded-full font-medium border border-[#235841]/70 shadow-sm flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-[#34D399]" />
                          <span>{item.ecoTag}</span>
                        </span>
                      </div>
                    </div>

                    {/* Location & Terroir Header */}
                    <div className="flex items-center justify-between text-xs font-semibold text-[#34D399] mb-2">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                        {item.zone}
                      </span>
                      <span className="text-white/60 text-[11px] font-normal">{item.soil}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-[#A7F3D0] transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#D1FAE5]/70 mb-5 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>

                    {/* Countryside Attributes Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-[#235841]/40 text-[11px] text-[#A7F3D0]">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#002B1D] border border-[#235841]/50 flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-[#34D399]" /> Riego asegurado
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#002B1D] border border-[#235841]/50 flex items-center gap-1">
                        <TreePine className="w-3 h-3 text-[#34D399]" /> Viñas & Frutales
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#002B1D] border border-[#235841]/50 flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-[#34D399]" /> 1,850 msnm
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#235841]/40 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[10px] uppercase font-semibold tracking-wider text-[#A7F3D0]/70">Precio Terruño</span>
                      <span className="text-xl font-metric-price font-bold text-white tracking-tight">{item.price}</span>
                    </div>
                    <Link
                      href={item.link}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#34D399] text-[#A7F3D0] hover:bg-[#34D399] hover:text-[#00170E] font-semibold text-xs transition-[background-color,color,transform] active:scale-[0.97]"
                    >
                      <span>Ver Finca</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        {/* Ambient Ecological Call to Action for Rural Property Owners */}
        <div className="mt-12 lg:mt-16 rounded-2xl border border-[#235841]/70 bg-gradient-to-r from-[#002B1D] via-[#002418] to-[#001A10] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#00422B] text-[#34D399] flex items-center justify-center shrink-0 hidden sm:flex">
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
            className="bg-[#E60000] hover:bg-[#C00000] active:scale-[0.97] text-white px-7 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-[background-color,transform] whitespace-nowrap shadow-md hover:-translate-y-0.5"
          >
            Vender Mi Tierra con KAIZEN
          </Link>
        </div>

      </div>
    </section>
  );
}
