'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inmueble } from '@/types/database';
import { formatOperacion } from '@/lib/format';

interface Props {
  inmueble: Inmueble;
}

export default function InmuebleCard({ inmueble }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    inmueble_name,
    slug,
    precio,
    direccion,
    ciudad,
    tipo,
    dormitorios,
    banos,
    terreno,
    construccion,
    categoria,
    imagenes,
    is_featured,
    is_rural,
    descripcion,
  } = inmueble;

  const mainImage =
    imagenes && imagenes.length > 0
      ? imagenes[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80';

  const categoriaNombre = categoria?.nombre_categoria || 'Venta';
  const isAlquiler = categoriaNombre.toLowerCase().includes('alquiler');
  const numPrecio = Number(precio) || 0;

  return (
    <Link href={`/inmueble/${slug}`} className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
      <article className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover-lift flex flex-col h-full apple-shadow-card hover:border-black/[0.14] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1">
        
        {/* Aspect 16/9 Image Container with Preload Shimmer */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-warm">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton-shimmer bg-surface-warm z-0" />
          )}

          <Image
            src={mainImage}
            alt={inmueble_name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Badges: Operación y Tipo juntos (Apple Floating Pills) */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
            <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] sm:text-[11px] uppercase px-3 py-1 rounded-full font-semibold tracking-wider border border-black/[0.08] shadow-sm">
              {formatOperacion(categoriaNombre)}
            </span>
            <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider shadow-sm">
              {tipo}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center justify-between text-legal-badge font-legal-badge uppercase tracking-widest text-text-muted mb-1.5">
              <span className="truncate">{ciudad}</span>
              <span className="text-[10px] text-text-muted font-medium">Tarija</span>
            </div>

            <h3 className="font-headline-sm text-base sm:text-lg font-semibold text-primary mb-2 line-clamp-1 group-hover:text-kaizen-red transition-colors">
              {inmueble_name}
            </h3>

            <p className="text-xs text-text-muted flex items-center gap-1 mb-3 truncate">
              <span className="material-symbols-outlined text-[15px] text-text-muted">location_on</span>
              <span className="truncate">{direccion || ciudad}</span>
            </p>

            <p className="font-body-md text-xs text-text-muted mb-4 line-clamp-2 leading-relaxed">
              {descripcion || 'Inmueble auditado bajo rigurosa verificación legal y técnica en Tarija.'}
            </p>
          </div>

          <div>
            {/* Specs Row */}
            <div className="border-t border-black/[0.05] pt-3.5 mb-4 flex items-center gap-3.5 text-text-muted text-xs">
              {dormitorios > 0 && (
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-text-muted">bed</span>
                  <span>{dormitorios} hab.</span>
                </div>
              )}
              {banos > 0 && (
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-text-muted">shower</span>
                  <span>{banos} bñ.</span>
                </div>
              )}
              {(construccion || terreno) > 0 && (
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-text-muted">square_foot</span>
                  <span>{construccion || terreno} m²</span>
                </div>
              )}
            </div>

            {/* Price Footer */}
            <div className="pt-3 border-t border-black/[0.05] flex items-baseline justify-between">
              <div>
                <span className="text-lg sm:text-xl font-metric-price font-bold text-primary tabular-nums tracking-tight">
                  ${numPrecio.toLocaleString('es-BO')} USD
                </span>
                {isAlquiler && <span className="text-xs font-normal text-text-muted ml-1">/mes</span>}
              </div>

              <span className="text-xs font-semibold text-primary group-hover:text-kaizen-red flex items-center gap-0.5 transition-colors">
                <span>Ver detalle</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform duration-150 ease-out">chevron_right</span>
              </span>
            </div>
          </div>

        </div>

      </article>
    </Link>
  );
}
