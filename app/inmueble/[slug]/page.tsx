'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getInmuebleBySlug } from '@/lib/supabase';
import { Inmueble } from '@/types/database';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FaWhatsapp } from 'react-icons/fa';

const MapaDetalle = dynamic(() => import('@/components/MapaDetalle'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] flex items-center justify-center bg-surface-canvas text-text-muted font-medium text-xs">
      Cargando mapa de ubicación...
    </div>
  ),
});

export default function InmuebleDetallePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      const data = await getInmuebleBySlug(slug);
      setInmueble(data);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-surface-stone text-primary animate-pulse">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-body-sm text-xs text-text-muted">Cargando detalles de la propiedad...</p>
      </div>
    );
  }

  if (!inmueble) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-surface-stone px-4 text-center">
        <span className="material-symbols-outlined text-6xl text-text-muted mb-3">
          domain_disabled
        </span>
        <h1 className="font-headline-md text-2xl font-semibold text-primary mb-2">
          Propiedad no encontrada
        </h1>
        <p className="font-body-md text-sm text-text-muted mb-6 max-w-md">
          El inmueble que buscas ha sido vendido o retirado temporalmente de cartera.
        </p>
        <Link
          href="/compra/page/1"
          className="bg-primary text-white font-body-sm text-xs font-semibold px-6 py-3 rounded-[2px] hover:bg-black transition"
        >
          Explorar otras propiedades en Tarija
        </Link>
      </div>
    );
  }

  const {
    inmueble_name,
    precio,
    direccion,
    ciudad,
    tipo,
    dormitorios,
    banos,
    terreno,
    construccion,
    estacionamientos,
    frente,
    descripcion,
    lat,
    lng,
    categoria,
    agente,
    imagenes,
    is_featured,
  } = inmueble;

  const defaultImg =
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80';
  const validImages = imagenes && imagenes.length > 0 ? imagenes : [defaultImg];
  const slides = validImages.map((src) => ({ src }));

  const numPrecio = Number(precio) || 0;
  const categoriaNombre = categoria?.nombre_categoria || 'Venta';
  const isAlquiler = categoriaNombre.toLowerCase().includes('alquiler');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const agentPhone =
    agente?.telefono || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = agentPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    `¡Hola! 👋 Vi la propiedad "${inmueble_name}" ($${numPrecio.toLocaleString('es-BO')} USD) en Tarija. Deseo agendar una visita y consultar más detalles.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: inmueble_name,
        text: `Descubre esta propiedad en KAIZEN: ${inmueble_name}`,
        url: currentUrl,
      });
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert('¡Enlace de la propiedad copiado al portapapeles!');
    }
  };

  return (
    <div className="pt-6 sm:pt-8 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1500px] mx-auto bg-surface-stone">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex justify-between items-center mb-5 sm:mb-6">
        <Link
          href="/compra/page/1"
          className="inline-flex items-center gap-1 font-body-sm text-xs font-semibold text-text-muted hover:text-primary transition"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Volver al catálogo Tarija</span>
        </Link>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 font-body-sm text-xs font-semibold text-primary hover:text-kaizen-red transition bg-surface-canvas border border-border-hairline px-3 py-1.5 rounded-[2px]"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
          <span>Compartir</span>
        </button>
      </div>

      {/* Gallery Section */}
      {validImages.length === 1 ? (
        <div
          onClick={() => {
            setPhotoIndex(0);
            setLightboxOpen(true);
          }}
          className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full overflow-hidden rounded-[2px] mb-6 cursor-pointer group bg-surface-warm border border-border-hairline"
        >
          <Image
            src={validImages[0]}
            alt={inmueble_name}
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-[#E7EFEA] border border-[#0B4632] text-[#0B4632] px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold shadow-sm">
              Título Saneado DD.RR.
            </span>
            <span className="bg-surface-stone/95 backdrop-blur border border-border-hairline text-primary px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold">
              Apto Crédito Bancario
            </span>
          </div>
        </div>
      ) : validImages.length === 2 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 relative rounded-[2px] overflow-hidden md:h-[480px] w-full">
          <div
            onClick={() => {
              setPhotoIndex(0);
              setLightboxOpen(true);
            }}
            className="h-[300px] md:h-full w-full relative overflow-hidden rounded-[2px] group cursor-pointer bg-surface-warm"
          >
            <Image
              src={validImages[0]}
              alt={inmueble_name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-[#E7EFEA] border border-[#0B4632] text-[#0B4632] px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold shadow-sm">
                Título Saneado DD.RR.
              </span>
              <span className="bg-surface-stone/95 backdrop-blur border border-border-hairline text-primary px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold">
                Apto Crédito Bancario
              </span>
            </div>
          </div>
          <div
            onClick={() => {
              setPhotoIndex(1);
              setLightboxOpen(true);
            }}
            className="h-[300px] md:h-full w-full relative overflow-hidden rounded-[2px] group cursor-pointer bg-surface-warm"
          >
            <Image
              src={validImages[1]}
              alt={`${inmueble_name} - 2`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 bg-surface-stone/95 backdrop-blur-md px-3.5 py-2 rounded-[2px] shadow-sm font-body-sm text-xs font-semibold text-primary hover:bg-white flex items-center gap-2 transition-colors border border-border-hairline z-10"
          >
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
            <span>Ver todas las fotos (2)</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 relative rounded-[2px] overflow-hidden md:h-[480px] w-full">
          {/* Main large image (fills 2 columns completely, no aspect-ratio conflict) */}
          <div
            onClick={() => {
              setPhotoIndex(0);
              setLightboxOpen(true);
            }}
            className="md:col-span-2 h-[320px] md:h-full w-full relative overflow-hidden rounded-[2px] group cursor-pointer bg-surface-warm"
          >
            <Image
              src={validImages[0]}
              alt={inmueble_name}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-[#E7EFEA] border border-[#0B4632] text-[#0B4632] px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold shadow-sm">
                Título Saneado DD.RR.
              </span>
              <span className="bg-surface-stone/95 backdrop-blur border border-border-hairline text-primary px-3 py-1 text-legal-badge font-legal-badge tracking-wider uppercase font-semibold">
                Apto Crédito Bancario
              </span>
            </div>
          </div>

          {/* 2 stacked side images (fills 1 column in 2 equal rows) */}
          <div className="hidden md:grid grid-rows-2 gap-3 h-full w-full">
            <div
              onClick={() => {
                setPhotoIndex(1);
                setLightboxOpen(true);
              }}
              className="h-full w-full relative overflow-hidden rounded-[2px] group cursor-pointer bg-surface-warm"
            >
              <Image
                src={validImages[1]}
                alt="Vista 2"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div
              onClick={() => {
                setPhotoIndex(2);
                setLightboxOpen(true);
              }}
              className="h-full w-full relative overflow-hidden rounded-[2px] group cursor-pointer bg-surface-warm"
            >
              <Image
                src={validImages[2]}
                alt="Vista 3"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 bg-surface-stone/95 backdrop-blur-md px-3.5 py-2 rounded-[2px] shadow-sm font-body-sm text-xs font-semibold text-primary hover:bg-white flex items-center gap-2 transition-colors border border-border-hairline z-10"
          >
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
            <span>Ver todas las fotos ({validImages.length})</span>
          </button>
        </div>
      )}

      {/* Main Grid: Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left 8 Columns: Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Info */}
          <div className="border-b border-border-hairline pb-6 space-y-3">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-surface-canvas border border-border-hairline text-primary text-legal-badge font-legal-badge uppercase tracking-wider mb-2 font-semibold rounded-[2px]">
                {categoria?.nombre_categoria || 'En Venta'} · Ref: KZ-{inmueble.id.slice(0, 4).toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-bold text-primary leading-tight">
              {inmueble_name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <span>{direccion}, {ciudad} · Tarija</span>
              </div>

              <div className="text-2xl sm:text-3xl font-metric-price font-bold text-primary">
                ${numPrecio.toLocaleString('es-BO')} USD
                {isAlquiler && <span className="text-xs font-normal text-text-muted ml-1">/mes</span>}
              </div>
            </div>
          </div>

          {/* Quick Specs Bento Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-surface-canvas border border-border-hairline p-5 rounded-[2px] flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-2xl text-primary mb-1">bed</span>
              <span className="text-lg font-semibold text-primary">{dormitorios || '-'}</span>
              <span className="text-[10px] font-legal-badge text-text-muted uppercase">Dormitorios</span>
            </div>

            <div className="bg-surface-canvas border border-border-hairline p-5 rounded-[2px] flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-2xl text-primary mb-1">shower</span>
              <span className="text-lg font-semibold text-primary">{banos || '-'}</span>
              <span className="text-[10px] font-legal-badge text-text-muted uppercase">Baños</span>
            </div>

            <div className="bg-surface-canvas border border-border-hairline p-5 rounded-[2px] flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-2xl text-primary mb-1">square_foot</span>
              <span className="text-lg font-semibold text-primary">{construccion || terreno || '-'}</span>
              <span className="text-[10px] font-legal-badge text-text-muted uppercase">M² Totales</span>
            </div>

            <div className="bg-surface-canvas border border-border-hairline p-5 rounded-[2px] flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-2xl text-primary mb-1">directions_car</span>
              <span className="text-lg font-semibold text-primary">{estacionamientos || '-'}</span>
              <span className="text-[10px] font-legal-badge text-text-muted uppercase">Garajes</span>
            </div>
          </div>

          {/* Legal Warranty Box */}
          <div className="p-5 border border-[#0B4632]/20 bg-[#E7EFEA] rounded-[2px] flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0B4632] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">verified</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[#0B4632]">
                Inmueble Auditado y Homologado por KAIZEN
              </h4>
              <p className="text-xs text-[#0B4632]/80 leading-relaxed">
                Este activo cuenta con Folio Real depurado, tradición dominial comprobada, certificado alodial vigente y aptitud legal para crédito bancario en entidades supervisadas por ASFI.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-headline-sm font-semibold text-primary">
              Descripción del Inmueble
            </h2>
            <div className="text-body-md text-text-muted leading-relaxed whitespace-pre-line">
              {descripcion}
            </div>
          </div>

          {/* Technical Specs Table */}
          <div className="border border-border-hairline rounded-[2px] p-6 bg-surface-canvas space-y-4">
            <h3 className="text-base font-semibold text-primary">
              Ficha Técnica & Catastral
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-text-muted block uppercase font-legal-badge">Tipo:</span>
                <span className="font-semibold text-primary text-sm">{tipo}</span>
              </div>
              <div>
                <span className="text-text-muted block uppercase font-legal-badge">Operación:</span>
                <span className="font-semibold text-primary text-sm">{categoria?.nombre_categoria || 'Venta'}</span>
              </div>
              <div>
                <span className="text-text-muted block uppercase font-legal-badge">Jurisdicción:</span>
                <span className="font-semibold text-primary text-sm">{ciudad} (Tarija)</span>
              </div>
              <div>
                <span className="text-text-muted block uppercase font-legal-badge">Construcción:</span>
                <span className="font-semibold text-primary text-sm">{construccion ? `${construccion} m²` : 'No especificado'}</span>
              </div>
              <div>
                <span className="text-text-muted block uppercase font-legal-badge">Terreno:</span>
                <span className="font-semibold text-primary text-sm">{terreno ? `${terreno} m²` : 'No especificado'}</span>
              </div>
              <div>
                <span className="text-text-muted block uppercase font-legal-badge">Frente:</span>
                <span className="font-semibold text-primary text-sm">{frente ? `${frente} m` : 'No especificado'}</span>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="space-y-3">
            <h2 className="text-xl font-headline-sm font-semibold text-primary">
              Ubicación en el Mapa
            </h2>
            <div className="w-full h-80 rounded-[2px] overflow-hidden border border-border-hairline bg-surface-canvas">
              <MapaDetalle
                lat={lat || -21.5355}
                lng={lng || -64.7296}
                title={`${inmueble_name} - ${direccion}`}
              />
            </div>
          </div>

        </div>

        {/* Right 4 Columns: Sticky Agent Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-surface-canvas border border-border-hairline rounded-[2px] p-6 space-y-6 shadow-sm">
            
            {/* Price Header in Sidebar */}
            <div className="border-b border-border-hairline pb-4">
              <span className="text-[10px] font-legal-badge uppercase tracking-wider text-text-muted block mb-1">
                Precio de {categoria?.nombre_categoria || 'Venta'}
              </span>
              <div className="text-2xl sm:text-3xl font-metric-price font-bold text-primary">
                ${numPrecio.toLocaleString('es-BO')} USD
                {isAlquiler && <span className="text-xs font-normal text-text-muted ml-1">/mes</span>}
              </div>
            </div>

            {/* Agent Info */}
            <div className="flex items-center gap-4 border-b border-border-hairline pb-5">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-warm relative shrink-0 border border-border-hairline">
                <Image
                  src={
                    agente?.foto_principal ||
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                  }
                  alt={agente?.agent_name || 'Asesor Kaizen'}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-primary">
                  {agente?.agent_name || 'Broker Asignado KAIZEN'}
                </h3>
                <p className="text-xs text-text-muted">
                  {agente?.cargo || 'Especialista Residencial Tarija'}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#0B4632] font-semibold mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B4632]" />
                  <span>Disponible ahora</span>
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="space-y-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#E60000] hover:bg-[#C00000] text-white py-3.5 px-4 rounded-[2px] font-semibold text-xs text-center flex items-center justify-center gap-2 shadow-sm transition-all duration-150 hover:-translate-y-0.5"
              >
                <FaWhatsapp className="text-lg" />
                <span>Agendar Visita por WhatsApp</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded-[2px] font-semibold text-xs text-center flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">phone</span>
                <span>Llamar al Asesor</span>
              </a>
            </div>

            {/* Kaizen Guarantee note */}
            <div className="border-t border-border-hairline pt-4 text-[11px] text-text-muted space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#0B4632]">shield</span>
                <span>Garantía de Cero Riesgo KAIZEN</span>
              </div>
              <p>
                No realizas ningún anticipo sin previa revisión de folio real y documentación homologada.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox for Gallery */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={photoIndex}
      />
    </div>
  );
}
