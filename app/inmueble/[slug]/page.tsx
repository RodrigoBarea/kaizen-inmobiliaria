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
    <div className="w-full h-full min-h-[320px] flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-sm">
      Cargando ubicación...
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
      <div className="min-h-screen pt-32 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-secondary">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">
            progress_activity
          </span>
          <p className="font-label-md text-label-md">Cargando detalles de la propiedad...</p>
        </div>
      </div>
    );
  }

  if (!inmueble) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-background px-4">
        <span className="material-symbols-outlined text-6xl text-secondary mb-3">
          domain_disabled
        </span>
        <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
          Propiedad no encontrada
        </h1>
        <p className="font-body-md text-secondary mb-6">
          La propiedad que buscas no está disponible o ha sido retirada.
        </p>
        <Link
          href="/busqueda"
          className="bg-primary text-white font-label-md text-label-md px-6 py-3 rounded hover:bg-on-primary-fixed-variant transition"
        >
          Explorar otras propiedades
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

  // Dynamic WhatsApp Link
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const agentPhone =
    agente?.telefono || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = agentPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    `¡Hola! 👋 Vi esta propiedad: "${inmueble_name}" ($us ${Number(precio).toLocaleString()}). Quisiera agendar una visita y confirmar si la documentación está apta para financiamiento bancario.`
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
    <div className="pt-28 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-background">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/busqueda"
          className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-on-surface transition"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Volver al catálogo</span>
        </Link>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition bg-surface-container-low px-3 py-1.5 rounded"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
          <span>Compartir</span>
        </button>
      </div>

      {/* Gallery Asymmetric Grid (Stitch Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-unit mb-8 relative">
        {/* Main large image */}
        <div
          onClick={() => {
            setPhotoIndex(0);
            setLightboxOpen(true);
          }}
          className="md:col-span-2 aspect-video md:aspect-auto h-64 md:h-[500px] relative overflow-hidden rounded-lg group cursor-pointer bg-surface-container"
        >
          <Image
            src={validImages[0]}
            alt={inmueble_name}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* 2 stacked side images */}
        <div className="hidden md:flex flex-col gap-unit h-[500px]">
          <div
            onClick={() => {
              setPhotoIndex(1 < validImages.length ? 1 : 0);
              setLightboxOpen(true);
            }}
            className="h-1/2 relative overflow-hidden rounded-lg group cursor-pointer bg-surface-container"
          >
            <Image
              src={validImages[1] || validImages[0]}
              alt="Vista 2"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div
            onClick={() => {
              setPhotoIndex(2 < validImages.length ? 2 : 0);
              setLightboxOpen(true);
            }}
            className="h-1/2 relative overflow-hidden rounded-lg group cursor-pointer bg-surface-container"
          >
            <Image
              src={validImages[2] || validImages[0]}
              alt="Vista 3"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Ver todas las fotos button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded shadow-sm font-label-md text-label-md text-on-surface hover:bg-white flex items-center gap-2 transition-colors border border-surface-variant z-10"
        >
          <span className="material-symbols-outlined text-[18px]">photo_library</span>
          <span>Ver todas las fotos ({validImages.length})</span>
        </button>
      </div>

      {/* Main Grid: Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left 2 Columns: Details */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Header Info */}
          <div className="flex flex-col gap-4 border-b border-surface-variant pb-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface font-caption text-caption rounded-full uppercase tracking-wider mb-2 font-semibold">
                  {categoria?.nombre_categoria || 'En Venta'}
                </span>
                <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
                  {inmueble_name}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-secondary">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                  <span className="font-body-md text-body-md">{direccion}, {ciudad}</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary font-bold">
                  $us {Number(precio).toLocaleString()}
                </div>
                <span className="font-caption text-caption text-secondary">Precio de mercado</span>
              </div>
            </div>
          </div>

          {/* Quick Features Bento Grid (Stitch 4-Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <span className="material-symbols-outlined text-3xl text-secondary">bed</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {dormitorios || '-'}
              </span>
              <span className="font-caption text-caption text-secondary uppercase">Dormitorios</span>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <span className="material-symbols-outlined text-3xl text-secondary">shower</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {banos || '-'}
              </span>
              <span className="font-caption text-caption text-secondary uppercase">Baños</span>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <span className="material-symbols-outlined text-3xl text-secondary">square_foot</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {terreno || construccion || '-'}
              </span>
              <span className="font-caption text-caption text-secondary uppercase">M² Totales</span>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <span className="material-symbols-outlined text-3xl text-secondary">directions_car</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {estacionamientos || '-'}
              </span>
              <span className="font-caption text-caption text-secondary uppercase">Garajes</span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Descripción del Inmueble
            </h2>
            <div className="font-body-lg text-body-lg text-secondary leading-relaxed space-y-4">
              <p className="whitespace-pre-line">{descripcion}</p>
            </div>
          </div>

          {/* Technical Specs Table */}
          <div className="border border-surface-variant rounded-lg p-6 bg-surface-container-lowest">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4">
              Ficha Técnica
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-secondary block font-caption">Tipo:</span>
                <span className="font-semibold text-on-surface">{tipo}</span>
              </div>
              <div>
                <span className="text-secondary block font-caption">Operación:</span>
                <span className="font-semibold text-on-surface">{categoria?.nombre_categoria || 'Venta'}</span>
              </div>
              <div>
                <span className="text-secondary block font-caption">Ciudad:</span>
                <span className="font-semibold text-on-surface">{ciudad}</span>
              </div>
              <div>
                <span className="text-secondary block font-caption">Construcción:</span>
                <span className="font-semibold text-on-surface">{construccion ? `${construccion} m²` : 'No especificado'}</span>
              </div>
              <div>
                <span className="text-secondary block font-caption">Terreno:</span>
                <span className="font-semibold text-on-surface">{terreno ? `${terreno} m²` : 'No especificado'}</span>
              </div>
              <div>
                <span className="text-secondary block font-caption">Frente:</span>
                <span className="font-semibold text-on-surface">{frente ? `${frente} m` : 'No especificado'}</span>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-4">
              Ubicación
            </h2>
            <div className="w-full h-80 bg-surface-container rounded-lg overflow-hidden border border-surface-variant">
              <MapaDetalle
                lat={lat || -21.5355}
                lng={lng || -64.7296}
                title={`${inmueble_name} - ${direccion}`}
              />
            </div>
          </div>

        </div>

        {/* Right 1 Column: Sticky Agent Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-surface-container-lowest border border-surface-variant rounded-lg p-6 shadow-[0px_15px_45px_rgba(0,0,0,0.08)] flex flex-col gap-6">
            
            {/* Agent Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container relative shrink-0">
                <Image
                  src={
                    agente?.foto_principal ||
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                  }
                  alt={agente?.agent_name || 'Asesor Kaizen'}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {agente?.agent_name || 'Asesor KAIZEN'}
                </h3>
                <p className="font-caption text-caption text-secondary">
                  {agente?.cargo || 'Asesor Inmobiliario Senior'}
                </p>
              </div>
            </div>

            {/* Philosophy quote */}
            <div className="bg-[#F7F7F7] p-4 rounded-lg border border-gray-200 text-center">
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "Mi objetivo es asegurarme de que hagas la inversión más segura de tu vida con total tranquilidad."
              </p>
              <p className="text-[11px] font-bold text-[#E60000] mt-1.5">
                – {agente?.agent_name || 'Asesor KAIZEN'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-[#E60000] hover:bg-[#C00000] text-white font-label-md text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px] text-white">calendar_month</span>
                <span>Agendar Visita Exclusiva</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-[#10B981] hover:bg-[#059669] text-white font-label-md text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <FaWhatsapp className="text-xl text-white" />
                <span>Consultar Condiciones (WhatsApp)</span>
              </a>
            </div>

            {/* Safety badge */}
            <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold justify-center pt-2 border-t border-gray-200">
              <span className="text-[#1A1A1A]">🛡️</span>
              <span>Propiedad con Revisión Legal KAIZEN</span>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={slides}
      />
    </div>
  );
}
