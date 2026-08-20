'use client';

import Link from 'next/link';
import InmuebleCard from '@/components/InmuebleCard';
import { Inmueble } from '@/types/database';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowRight, Compass, ShieldCheck, Waves } from 'lucide-react';

interface Props {
  inmuebles?: Inmueble[];
}

export default function AreaRuralSection({ inmuebles = [] }: Props) {
  const ruralInmuebles = inmuebles.filter((i) => i.is_rural).slice(0, 3);

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    '¡Hola equipo KAIZEN! 🍇 Me interesan las propiedades en el Área Rural de Tarija (fincas, viñedos, quintas o terrenos de campo). ¿Podrían brindarme información y opciones disponibles?'
  )}`;

  return (
    <section className="py-20 md:py-28 bg-[#151C18] text-white relative overflow-hidden">
      {/* Glow ambiental de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E60000]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 relative z-10 space-y-16">
        
        {/* Cabecera de la Sección con Copywriting de Alto Impacto */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-white/10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full">
              <span>🌿 Especialidad KAIZEN: Inversiones Campestres</span>
            </div>
            
            <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Fincas, Viñedos y Quintas: <span className="text-emerald-400">El Valor de la Tierra en Tarija</span>
            </h2>
            
            <p className="font-body-md text-sm sm:text-base text-gray-300 leading-relaxed">
              El área rural del Valle Central de Tarija representa una de las inversiones de mayor revalorización y calidad de vida. Te conectamos con propiedades exclusivas en <strong>Uriondo (Valle de la Concepción), San Lorenzo, Tomatitas, San Andrés y Tolomosa</strong>, con derechos de agua de riego, tierra fértil y seguridad jurídica blindada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/area-rural"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded shadow-lg transition-all"
            >
              <span>Ver Catálogo Rural</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-5 py-4 rounded transition-all"
            >
              <FaWhatsapp className="text-emerald-400 text-base" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 3 Pilares del Área Rural KAIZEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Waves className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm font-bold text-base text-white">Agua de Riego y Servicios</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Verificamos concesiones de agua permanentes, tomas de acequia y factibilidad de energía eléctrica y caminos accesibles.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm font-bold text-base text-white">Saneamiento Legal en DDRR e INRA</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Auditoría minuciosa de títulos agrarios ejecutoriales, Folios Reales y planimetrías para una transferencia limpia y sin conflictos.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm font-bold text-base text-white">Potencial Productivo y Turístico</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tierras con vocación para viñedos boutique, casas de fin de semana, cabañas de alquiler vacacional o agricultura de alto rendimiento.
            </p>
          </div>
        </div>

        {/* Grilla de Inmuebles Rurales Destacados */}
        {ruralInmuebles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>🍇 Oportunidades Seleccionadas en el Campo</span>
              </h3>
              <Link
                href="/area-rural"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Ver todas ({inmuebles.filter(i => i.is_rural).length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {ruralInmuebles.map((inmueble) => (
                <div key={inmueble.id} className="bg-white rounded-lg overflow-hidden text-gray-900 shadow-xl">
                  <InmuebleCard inmueble={inmueble} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Banner CTA para Propietarios de Terrenos Rurales */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#1A261F] to-[#151C18] border border-emerald-600/30 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              ¿Tienes una finca, terreno o quinta en Tarija?
            </span>
            <h4 className="font-headline-md text-2xl sm:text-3xl font-black text-white">
              Vende tu Propiedad Rural con los Especialistas de KAIZEN
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Conectamos tu tierra con compradores calificados, inversionistas y familias que buscan su refugio campestre. Nos encargamos de la tasación comercial y el saneamiento documental completo.
            </p>
          </div>

          <Link
            href="/vender"
            className="bg-[#E60000] hover:bg-[#C00000] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded shadow-xl transition-all shrink-0 flex items-center gap-2"
          >
            <span>Solicitar Tasación Gratuita de mi Tierra</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
