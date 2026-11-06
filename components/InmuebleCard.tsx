'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inmueble } from '@/types/database';

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
    <Link href={`/inmueble/${slug}`} className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
      <article className="bg-surface-stone border border-border-hairline rounded-[2px] overflow-hidden hover-lift flex flex-col h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-primary">
        
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
            className={`w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Badges: Operación y Tipo de Inmueble únicamente */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-surface-stone/95 backdrop-blur-md text-primary text-[10px] uppercase px-2.5 py-1 rounded-[2px] font-semibold tracking-wider border border-border-hairline shadow-sm">
              {categoriaNombre}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="bg-primary/90 backdrop-blur-md text-white px-2.5 py-1 rounded-[2px] text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              {tipo}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center justify-between text-legal-badge font-legal-badge uppercase tracking-widest text-text-muted mb-1.5">
              <span className="truncate">{ciudad}</span>
              <span className="text-[10px] text-text-muted">Tarija</span>
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
            <div className="border-t border-border-hairline pt-3 mb-4 flex items-center gap-3 text-text-muted text-xs">
              {dormitorios > 0 && (
                <div className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px]">bed</span>
                  <span>{dormitorios} hab.</span>
                </div>
              )}
              {banos > 0 && (
                <div className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px]">shower</span>
                  <span>{banos} bñ.</span>
                </div>
              )}
              {(construccion || terreno) > 0 && (
                <div className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px]">square_foot</span>
                  <span>{construccion || terreno} m²</span>
                </div>
              )}
            </div>

            {/* Price Footer */}
            <div className="pt-2 border-t border-border-hairline flex items-baseline justify-between">
              <div>
                <span className="text-lg sm:text-xl font-metric-price font-bold text-primary tabular-nums tracking-tight">
                  ${numPrecio.toLocaleString('es-BO')} USD
                </span>
                {isAlquiler && <span className="text-xs font-normal text-text-muted ml-1">/mes</span>}
              </div>

              <span className="text-xs font-medium text-primary group-hover:text-kaizen-red flex items-center gap-0.5 transition-colors">
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
