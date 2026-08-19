'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function Asesoramiento() {
  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    '¡Hola! 🏛️ Necesito información sobre su Asesoramiento Legal y Financiero para respaldar mi inversión en Bolivia de forma segura. ¿Con quién puedo hablar?'
  )}`;

  return (
    <section className="py-20 md:py-28 bg-[#F7F7F7] px-4 sm:px-8 border-y border-gray-200">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Lado Izquierdo */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#E60000] bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3 inline-block">
              Filosofía de Mejora Continua
            </span>
            <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight">
              El Estándar KAIZEN: <span className="text-[#E60000]">Evolucionando el Mercado Inmobiliario Boliviano</span>
            </h2>
            <p className="font-body-md text-sm sm:text-base text-gray-600 mt-4 leading-relaxed max-w-2xl">
              <strong>"Kaizen"</strong> significa mejora continua. Redefinimos la gestión inmobiliaria en Bolivia eliminando la improvisación, protegiendo tu capital y asegurando que cada paso te acerque a tus metas financieras con total transparencia.
            </p>
          </div>

          {/* 2 Bloques */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex gap-5 items-start hover-lift transition">
              <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1A1A1A]">
                  Asesoramiento Legal Integral
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong>Seguridad Jurídica Blindada.</strong> Nuestro equipo legal audita cada Folio Real, verifica el estado en Derechos Reales (DDRR), impuestos al día y planos aprobados. Cero sorpresas, cero riesgos de estafas.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex gap-5 items-start hover-lift transition">
              <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1A1A1A]">
                  Estrategia Financiera
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong>Inversión Inteligente.</strong> Te guiamos en la obtención de créditos de vivienda social, analizamos tasas bancarias y proyectamos la plusvalía de tu inmueble para maximizar tu Retorno de Inversión (ROI).
                </p>
              </div>
            </div>

          </div>

          {/* Botones */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10B981] hover:bg-[#059669] text-white font-label-md text-sm font-bold px-6 py-3.5 rounded transition-all shadow-sm hover:shadow flex items-center gap-2"
            >
              <FaWhatsapp className="text-lg" />
              <span>Hablar con un Asesor</span>
            </a>
            <Link
              href="/vender"
              className="bg-[#1A1A1A] hover:bg-[#E60000] text-white font-label-md text-sm font-bold px-6 py-3.5 rounded transition-colors shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">shield_person</span>
              <span>Quiero Vender de Forma Segura</span>
            </Link>
          </div>

        </div>

        {/* Lado Derecho: Imagen */}
        <div className="lg:col-span-5">
          <div className="relative h-[380px] sm:h-[460px] lg:h-[500px] rounded-xl overflow-hidden shadow-md border border-gray-200 group bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&auto=format&fit=crop&q=80"
              alt="El Estándar KAIZEN en Bolivia"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Auditoría 100% Garantizada</span>
              <p className="font-headline-sm text-sm sm:text-base font-bold">
                Tranquilidad patrimonial y transparencia absoluta en cada firma.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
