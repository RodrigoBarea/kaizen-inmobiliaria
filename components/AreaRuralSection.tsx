'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import { formatOperacion } from '@/lib/format';
import { TreePine, Droplets, Mountain, Sun, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  inmuebles?: Inmueble[];
}

export default function AreaRuralSection({ inmuebles = [] }: Props) {
  const ruralList = inmuebles.filter((i) => i.is_rural);

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');

  // Fallback de propiedades campestres y vitivinícolas curadas
  const fallbackTerroirs = [
    {
      id: 'riondo-parrales',
      title: 'Finca Viñedo Los Parrales',
      zone: 'Uriondo · Valle de la Concepción',
      type: 'Finca Vitivinícola',
      desc: '4.8 Hectáreas cultivadas con cepas Syrah y Tannat de altura (1,850 msnm). Incluye tranque propio de 2,000 m³, sistema de riego por goteo computarizado y tendido trifásico.',
      badgeAgua: 'Agua de Riego Permanente',
      superficie: '4.8 Hectáreas',
      altitud: '1,850 msnm',
      price: '$210,000 USD',
      img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&auto=format&fit=crop&q=85',
      link: '/area-rural',
    },
    {
      id: 'san-lorenzo-mollar',
      title: "Quinta Campestre 'El Mollar'",
      zone: 'San Lorenzo · Méndez',
      type: 'Quinta de Recreo & Huerta',
      desc: 'Macrolotes campestres desde 3,500 m² rodeados de sauces centenarios y huerta frutal. Acceso asfaltado directo a 15 min de Tarija, electricidad y agua potable de vertiente.',
      badgeAgua: 'Vertiente Natural + Pozo',
      superficie: '3,500 m²',
      altitud: '1,920 msnm',
      price: 'Desde $58,000 USD',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=85',
      link: '/area-rural',
    },
    {
      id: 'padcaya-nogales',
      title: 'Hacienda Agrícola Los Nogales',
      zone: 'Padcaya · Quebrada Templada',
      type: 'Macrolote Productivo',
      desc: '12 Hectáreas en valle abrigado ideal para berries, nogales o vid de altura. Canal de riego matriz registrado, casona colonial para restaurar y suelo aluvial de primera calidad.',
      badgeAgua: 'Derecho Matriz INRA',
      superficie: '12 Hectáreas',
      altitud: '1,980 msnm',
      price: '$175,000 USD',
      img: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=1200&auto=format&fit=crop&q=85',
      link: '/area-rural',
    },
  ];

  return (
    <section
      className="relative w-full bg-gradient-to-b from-[#021A11] via-[#05281C] to-[#021A11] text-white py-20 sm:py-28 border-t border-b border-[#19503B]/60 overflow-hidden"
      id="vinedos"
    >
      {/* Sutil halo ecológico de fondo */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#105E41]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-[#0A3D2A]/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Encabezado Principal de Campo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-16 pb-10 border-b border-[#19503B]/60">
          
          {/* Narrativa Ecológica */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] bg-[#0A3D2A] border border-[#236E50] text-[#86EFAC] text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
              <TreePine className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Terruños & Propiedades de Campo</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-display-xl font-bold text-white tracking-tight leading-[1.12]">
              Fincas, Viñedos & Terrenos en el{' '}
              <span className="italic font-normal text-[#86EFAC]">Valle de Tarija</span>
            </h2>
            
            <p className="text-sm sm:text-base font-body-md text-white/80 mt-4 max-w-2xl leading-relaxed">
              Propiedades en Uriondo, San Lorenzo, Calamuchita y Padcaya con suelo fértil, microclima templado y títulos plenamente saneados ante el INRA y Derechos Reales. El refugio campestre o proyecto productivo que buscas.
            </p>
          </div>

          {/* Indicadores Agrícolas del Valle */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#05281C]/90 border border-[#19503B] p-4 rounded-[4px] backdrop-blur-sm">
              <div className="flex items-center gap-2.5 text-[#34D399] mb-1">
                <Droplets className="w-4 h-4 text-[#34D399]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">Agua de Riego</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Río Guadalquivir, vertientes y acequias con derechos consuetudinarios inscritos.
              </p>
            </div>

            <div className="bg-[#05281C]/90 border border-[#19503B] p-4 rounded-[4px] backdrop-blur-sm">
              <div className="flex items-center gap-2.5 text-[#34D399] mb-1">
                <Sun className="w-4 h-4 text-[#FDE047]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">Microclima del Valle</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                +300 días de sol al año entre 1,750 y 1,980 msnm. Óptimo para vid y nogal.
              </p>
            </div>
          </div>

        </div>

        {/* 3-Column Country Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ruralList.length >= 3
            ? ruralList.slice(0, 3).map((item) => {
                const img =
                  item.imagenes && item.imagenes.length > 0
                    ? item.imagenes[0]
                    : 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&auto=format&fit=crop&q=85';
                const p = Number(item.precio) || 0;
                const m2 = item.terreno || item.construccion || 0;
                const displayArea = m2 >= 10000 ? `${(m2 / 10000).toFixed(1)} Hectáreas` : `${m2.toLocaleString('es-BO')} m²`;

                const waItemUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `¡Hola equipo KAIZEN! 👋 Me interesa la propiedad rural "${item.inmueble_name}" ($${p.toLocaleString('es-BO')} USD) en ${item.ciudad}. ¿Podrían brindarme información del derecho de agua y títulos de INRA?`
                )}`;

                return (
                  <article
                    key={item.id}
                    className="bg-[#06291C]/80 border border-[#19503B] hover:border-[#34D399] rounded-[4px] overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)] transition-all duration-300"
                  >
                    <div>
                      {/* Photo Frame con badges ecológicos */}
                      <div className="aspect-[16/10] overflow-hidden relative bg-[#021A11]">
                        <Image
                          src={img}
                          alt={item.inmueble_name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#021A11]/80 via-transparent to-black/30" />

                        {/* Badges superiores */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className="bg-[#021A11]/90 backdrop-blur-md text-[#86EFAC] text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider border border-[#19503B]">
                            {item.ciudad}
                          </span>
                          <span className="bg-[#0A3D2A]/90 text-white text-[10px] uppercase px-2 py-1 rounded-[2px] font-semibold tracking-wider border border-[#236E50]">
                            {item.tipo}
                          </span>
                        </div>

                        {/* Badge de Agua */}
                        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-[#021A11]/90 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-[#19503B] text-[11px] text-[#86EFAC] font-medium">
                          <Droplets className="w-3.5 h-3.5 text-[#34D399]" />
                          <span>Agua Saneada</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#34D399] mb-1.5">
                          <span>{item.ciudad} · Tarija</span>
                          <span>{displayArea}</span>
                        </div>

                        <Link href={`/inmueble/${item.slug}`}>
                          <h3 className="text-xl font-headline-sm font-bold text-white mb-2.5 group-hover:text-[#86EFAC] transition-colors line-clamp-1">
                            {item.inmueble_name}
                          </h3>
                        </Link>

                        <p className="text-xs sm:text-sm font-body-md text-white/70 mb-5 line-clamp-2 leading-relaxed">
                          {item.descripcion || 'Propiedad campestre con derechos de agua registrados y documentación saneada en el Valle de Tarija.'}
                        </p>

                        {/* Specs campestres */}
                        <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-[#19503B]/50 text-xs text-white/80 mb-5">
                          <div className="flex items-center gap-1.5">
                            <Mountain className="w-3.5 h-3.5 text-[#34D399]" />
                            <span className="truncate">{displayArea}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                            <span>INRA Saneado</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer con precio y acción */}
                    <div className="p-5 sm:p-6 pt-0">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-[11px] uppercase tracking-wider text-white/60 font-medium">Inversión</span>
                        <span className="text-2xl font-metric-price font-bold text-white tracking-tight">
                          ${p.toLocaleString('es-BO')} <span className="text-xs font-normal text-white/60">USD</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={waItemUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-2.5 bg-[#0D4B34] hover:bg-[#105E41] text-[#86EFAC] hover:text-white border border-[#236E50] text-xs font-semibold transition-colors rounded-[2px] flex items-center justify-center gap-1.5"
                        >
                          <FaWhatsapp className="text-sm" />
                          <span>Consultar</span>
                        </a>

                        <Link
                          href={`/inmueble/${item.slug}`}
                          className="w-full text-center py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors rounded-[2px] flex items-center justify-center gap-1"
                        >
                          <span>Ver Ficha</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            : fallbackTerroirs.map((item) => {
                const waItemUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `¡Hola equipo KAIZEN! 👋 Deseo información sobre la propiedad campestre "${item.title}" (${item.price}) en ${item.zone}. ¿Podrían contactarme con el asesor rural?`
                )}`;

                return (
                  <article
                    key={item.id}
                    className="bg-[#06291C]/80 border border-[#19503B] hover:border-[#34D399] rounded-[4px] overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)] transition-all duration-300"
                  >
                    <div>
                      {/* Photo Frame con badges ecológicos */}
                      <div className="aspect-[16/10] overflow-hidden relative bg-[#021A11]">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#021A11]/80 via-transparent to-black/30" />

                        {/* Badges superiores */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                          <span className="bg-[#021A11]/90 backdrop-blur-md text-[#86EFAC] text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider border border-[#19503B]">
                            {item.zone}
                          </span>
                          <span className="bg-[#0A3D2A]/90 text-white text-[10px] uppercase px-2 py-1 rounded-[2px] font-semibold tracking-wider border border-[#236E50]">
                            {item.type}
                          </span>
                        </div>

                        {/* Badge de Agua */}
                        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-[#021A11]/90 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-[#19503B] text-[11px] text-[#86EFAC] font-medium">
                          <Droplets className="w-3.5 h-3.5 text-[#34D399]" />
                          <span>{item.badgeAgua}</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#34D399] mb-1.5">
                          <span>{item.zone}</span>
                          <span>{item.superficie}</span>
                        </div>

                        <h3 className="text-xl font-headline-sm font-bold text-white mb-2.5 group-hover:text-[#86EFAC] transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-body-md text-white/70 mb-5 leading-relaxed">
                          {item.desc}
                        </p>

                        {/* Specs campestres */}
                        <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-[#19503B]/50 text-xs text-white/80 mb-5">
                          <div className="flex items-center gap-1.5">
                            <Mountain className="w-3.5 h-3.5 text-[#34D399]" />
                            <span>{item.superficie}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-[#FDE047]" />
                            <span>{item.altitud}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer con precio y acción */}
                    <div className="p-5 sm:p-6 pt-0">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-[11px] uppercase tracking-wider text-white/60 font-medium">Precio Terruño</span>
                        <span className="text-2xl font-metric-price font-bold text-white tracking-tight">
                          {item.price}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={waItemUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-2.5 bg-[#0D4B34] hover:bg-[#105E41] text-[#86EFAC] hover:text-white border border-[#236E50] text-xs font-semibold transition-colors rounded-[2px] flex items-center justify-center gap-1.5"
                        >
                          <FaWhatsapp className="text-sm" />
                          <span>Consultar</span>
                        </a>

                        <Link
                          href={item.link}
                          className="w-full text-center py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors rounded-[2px] flex items-center justify-center gap-1"
                        >
                          <span>Ver Ficha</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
        </div>

        {/* Ambient Ecological Call to Action for Rural Property Owners */}
        <div className="mt-14 lg:mt-16 border border-[#236E50] bg-gradient-to-r from-[#042418] via-[#073624] to-[#042418] p-6 sm:p-8 rounded-[4px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-[4px] bg-[#0A3D2A] border border-[#34D399]/30 text-[#86EFAC] flex items-center justify-center shrink-0 hidden sm:flex">
              <TreePine className="w-6 h-6 text-[#34D399]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-headline-sm font-bold text-white">
                ¿Posees una finca, viñedo o terreno rural en Tarija?
              </h4>
              <p className="text-xs sm:text-sm font-body-md text-white/75 mt-1 max-w-xl leading-relaxed">
                Realizamos la tasación agronómica, verificación de derechos de agua y saneamiento ante INRA para conectarte con compradores directos e inversores vitivinícolas.
              </p>
            </div>
          </div>
          
          <Link
            href="/vender"
            className="bg-kaizen-red hover:bg-[#C00000] text-white px-6 py-3 rounded-[2px] text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shadow-md active:scale-[0.98] shrink-0"
          >
            Vender Mi Tierra con KAIZEN
          </Link>
        </div>

      </div>
    </section>
  );
}
