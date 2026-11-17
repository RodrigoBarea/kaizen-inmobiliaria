'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { Inmueble } from '@/types/database';
import { formatOperacion } from '@/lib/format';

interface Props {
  inmueble: Inmueble;
}

export default function InmuebleCard({ inmueble }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
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
    descripcion,
  } = inmueble;

  const mainImage =
    imagenes && imagenes.length > 0
      ? imagenes[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80';

  const categoriaNombre = categoria?.nombre_categoria || 'Venta';
  const isAlquiler = categoriaNombre.toLowerCase().includes('alquiler');
  const numPrecio = Number(precio) || 0;

  // Cálculos técnicos de metro cuadrado y código de referencia
  const areaM2 = construccion || terreno || 0;
  const precioPorM2 = areaM2 > 0 ? Math.round(numPrecio / areaM2) : null;
  const refCode = id ? `KZ-${String(id).slice(0, 4).toUpperCase()}` : `KZ-${slug.slice(0, 4).toUpperCase()}`;

  // WhatsApp directo con ficha técnica precargada
  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    `Hola equipo KAIZEN. Me interesa la ficha técnica de la propiedad "${inmueble_name}" (REF: ${refCode}, $${numPrecio.toLocaleString('es-BO')} USD). ¿Podrían compartirme el informe de saneamiento y disponibilidad de visita?`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  return (
    <article className="bg-[#EFECE6] border border-[#181816]/15 rounded-none flex flex-col h-full group hover:border-[#181816] transition-colors duration-200">
      
      {/* Aspect Ratio 16/10 Container */}
      <Link href={`/inmueble/${slug}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-[#181816]/5">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#EFECE6] animate-pulse" />
        )}

        <Image
          src={mainImage}
          alt={inmueble_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Technical Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 font-mono text-[9px] uppercase tracking-wider">
          <span className="bg-[#181816] text-[#F6F5F2] px-2 py-0.5">
            {formatOperacion(categoriaNombre)}
          </span>
          <span className="bg-[#F6F5F2] text-[#181816] border border-[#181816]/20 px-2 py-0.5">
            REF: {refCode}
          </span>
        </div>

        {precioPorM2 && (
          <div className="absolute bottom-2.5 right-2.5 bg-[#181816]/90 backdrop-blur-sm text-[#F6F5F2] font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
            ${precioPorM2}/m²
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Ubicación técnica */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#181816]/60 mb-1.5">
            <span className="truncate">{ciudad}</span>
            <span>TARIJA · VERIFICADO</span>
          </div>

          {/* Título en tipografía Editorial Serif */}
          <Link href={`/inmueble/${slug}`} className="block">
            <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#181816] group-hover:text-[#A65D47] transition-colors line-clamp-1 mb-1.5">
              {inmueble_name}
            </h3>
          </Link>

          <p className="text-xs text-[#181816]/65 flex items-center gap-1 mb-3 truncate font-sans">
            <span className="material-symbols-outlined text-[14px] text-[#A65D47]">location_on</span>
            <span className="truncate">{direccion || ciudad}</span>
          </p>

          <p className="font-sans text-xs text-[#181816]/70 mb-4 line-clamp-2 leading-relaxed">
            {descripcion || 'Propiedad auditada con saneamiento registral y folio real verificado en Tarija.'}
          </p>
        </div>

        <div>
          {/* Blueprint Table: 3 celdas divididas */}
          <div className="border-t border-[#181816]/15 border-b border-[#181816]/15 grid grid-cols-3 divide-x divide-[#181816]/15 py-2 mb-4 font-mono text-[10px] uppercase text-[#181816]/80 text-center">
            <div className="px-1">
              <span className="block text-[#181816]/50 text-[9px]">Área</span>
              <span className="font-semibold text-[#181816]">{areaM2 > 0 ? `${areaM2} m²` : 'Auditada'}</span>
            </div>
            <div className="px-1">
              <span className="block text-[#181816]/50 text-[9px]">Tipología</span>
              <span className="font-semibold text-[#181816] truncate block">{tipo}</span>
            </div>
            <div className="px-1">
              <span className="block text-[#181816]/50 text-[9px]">Valor M²</span>
              <span className="font-semibold text-[#A65D47]">
                {precioPorM2 ? `$${precioPorM2}` : 'Consultar'}
              </span>
            </div>
          </div>

          {/* Footer de Precio y Acciones */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <div className="font-editorial text-2xl font-bold text-[#181816] tracking-tight">
                ${numPrecio.toLocaleString('es-BO')} <span className="font-mono text-xs font-normal text-[#181816]/60">USD</span>
              </div>
              {isAlquiler && <span className="font-mono text-[10px] text-[#181816]/60 block -mt-1">/mes</span>}
            </div>

            <div className="flex items-center gap-1.5">
              {/* WhatsApp direct button with prefilled property code */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Consultar por WhatsApp con código de referencia"
                className="w-8 h-8 bg-[#181816] hover:bg-[#A65D47] active:scale-[0.95] text-[#F6F5F2] flex items-center justify-center transition-colors"
              >
                <FaWhatsapp className="text-xs" />
              </a>

              {/* View Detail Link */}
              <Link
                href={`/inmueble/${slug}`}
                className="h-8 px-2.5 border border-[#181816]/25 hover:border-[#181816] hover:bg-[#F6F5F2] active:scale-[0.95] text-[#181816] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all"
              >
                <span>Ficha</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </article>
  );
}
