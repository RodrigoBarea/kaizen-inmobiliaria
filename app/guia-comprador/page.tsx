'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function GuiaCompradorPage() {
  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    '¡Hola! 🏛️ Necesito información sobre su Asesoramiento Legal y Financiero para respaldar mi inversión en Bolivia de forma segura. ¿Con quién puedo hablar?'
  )}`;

  return (
    <div className="space-y-12 pb-20 pt-20 bg-white">
      {/* Banner */}
      <div className="relative min-h-[320px] w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=80"
          alt="Guía Definitiva del Comprador Inteligente"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 space-y-2 py-12">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Para Compradores
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase">
            Guía Definitiva del Comprador Inteligente
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Domina el mercado, asegura tu crédito y evita las trampas legales al adquirir tu nuevo hogar en Bolivia.
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#E60000] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>

        <div className="space-y-4">
          <h2 className="font-headline-md text-2xl sm:text-3xl font-black text-[#1A1A1A]">
            La Ruta Segura para Comprar tu Inmueble
          </h2>
          <p className="font-body-md text-sm text-gray-600 leading-relaxed">
            Comprar un inmueble es una de las decisiones financieras más trascendentales. En KAIZEN te acompañamos paso a paso para garantizar que cada documento esté en regla y tu capital protegido.
          </p>
        </div>

        {/* Pasos */}
        <div className="space-y-6">
          {[
            {
              n: '1',
              title: 'Tu Realidad Financiera',
              desc: 'Evaluación de presupuesto y estructuración de tu crédito (vivienda social o regular).',
            },
            {
              n: '2',
              title: 'La Búsqueda Estratégica',
              desc: 'Identificación de propiedades verificadas con alto potencial de plusvalía.',
            },
            {
              n: '3',
              title: 'Auditoría Legal en DDRR',
              desc: 'Revisión técnica del Folio Real, gravámenes y estado impositivo municipal.',
            },
            {
              n: '4',
              title: 'Minuta y Desembolso',
              desc: 'Redacción segura del documento de transferencia y coordinación con la entidad bancaria.',
            },
            {
              n: '5',
              title: 'Registro Final',
              desc: 'Consolidación de tu derecho propietario ante Derechos Reales y la Alcaldía.',
            },
          ].map((paso) => (
            <div
              key={paso.n}
              className="bg-[#F7F7F7] p-6 rounded-xl border border-gray-200 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white font-black flex items-center justify-center shrink-0">
                {paso.n}
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm font-bold text-base text-[#1A1A1A]">{paso.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{paso.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#1A1A1A] text-white p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-headline-sm text-lg font-bold">¿Tienes dudas sobre una propiedad en particular?</h3>
            <p className="text-xs text-gray-300">
              Revisamos los papeles de tu futuro hogar sin compromiso.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 px-6 rounded text-xs flex items-center gap-2 shrink-0 transition shadow"
          >
            <FaWhatsapp className="text-base" />
            <span>Revisamos los papeles sin compromiso</span>
          </a>
        </div>
      </div>
    </div>
  );
}
