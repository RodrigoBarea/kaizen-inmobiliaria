'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Inmueble } from '@/types/database';

interface Props {
  inmueble: Inmueble;
}

export default function InmuebleCard({ inmueble }: Props) {
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
    categoria,
    imagenes,
    is_featured,
    descripcion,
  } = inmueble;

  const mainImage =
    imagenes && imagenes.length > 0
      ? imagenes[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80';

  const categoriaNombre = categoria?.nombre_categoria || 'Venta';
  const isAlquiler = categoriaNombre.toLowerCase().includes('alquiler');

  return (
    <Link href={`/inmueble/${slug}`} className="block h-full group">
      <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden hover-lift flex flex-col h-full shadow-sm hover:shadow-md transition-all">
        
        {/* Imagen 16/9 con zoom en hover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={inmueble_name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges UI KAIZEN */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
            {is_featured && (
              <div className="bg-[#E60000] text-white text-[10px] uppercase px-2.5 py-1 rounded font-bold tracking-wider shadow-sm flex items-center gap-1">
                <span>⭐ Destacado KAIZEN</span>
              </div>
            )}
            <div className="bg-white/95 backdrop-blur text-[#1A1A1A] text-[10px] uppercase px-2.5 py-1 rounded font-bold tracking-wider border border-gray-200 shadow-sm flex items-center gap-1">
              <span>{categoriaNombre}</span>
            </div>
          </div>

          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] font-semibold">
            {tipo}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Precio prominente en Negro Ónix */}
          <div className="mb-2">
            <span className="font-headline-md text-xl sm:text-2xl font-black text-[#1A1A1A]">
              $us {Number(precio).toLocaleString()}
            </span>
            {isAlquiler && (
              <span className="text-xs font-normal text-gray-500 ml-1">/mes</span>
            )}
          </div>

          <h3 className="font-headline-sm text-base font-bold text-[#1A1A1A] line-clamp-1 group-hover:text-[#E60000] transition-colors mb-1">
            {inmueble_name}
          </h3>

          <p className="text-xs text-gray-500 flex items-center gap-1 mb-2.5 truncate">
            <span className="material-symbols-outlined text-[15px] text-[#E60000]">location_on</span>
            <span>{direccion}, {ciudad}</span>
          </p>

          <p className="font-body-md text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {descripcion || 'Propiedad verificada bajo los más altos estándares de calidad KAIZEN.'}
          </p>

          {/* Features footer */}
          <div className="mt-auto border-t border-gray-100 pt-3 flex items-center justify-between text-gray-600 text-xs font-semibold">
            <div className="flex items-center gap-3">
              {dormitorios > 0 && (
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-gray-500">bed</span>
                  <span>{dormitorios} hab.</span>
                </div>
              )}
              {banos > 0 && (
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-gray-500">shower</span>
                  <span>{banos} bñ.</span>
                </div>
              )}
              {terreno > 0 && (
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-gray-500">square_foot</span>
                  <span>{terreno} m²</span>
                </div>
              )}
            </div>

            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              ✅ Verificado
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}
