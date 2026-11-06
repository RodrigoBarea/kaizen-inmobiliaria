'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function GuiaCompradorPage() {
  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    '¡Hola! 🏛️ Necesito información sobre su Asesoramiento Legal y Financiero para respaldar mi inversión en Tarija de forma segura. ¿Con quién puedo hablar?'
  )}`;

  return (
    <div className="space-y-12 pb-20 pt-20 bg-white">
      {/* Banner */}
      <div className="relative min-h-[320px] w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=80"
          alt="Guía Definitiva del Comprador Inteligente en Tarija"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 space-y-2 py-12">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Para compradores en Tarija
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase">
            Guía para comprar un inmueble en Tarija
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Pasos clave para revisar la documentación, gestionar tu crédito y formalizar la compraventa con respaldo notarial.
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
            Etapas para una compraventa segura en Tarija
          </h2>
          <p className="font-body-md text-sm text-gray-600 leading-relaxed">
            Comprar una casa, departamento o terreno requiere confirmar que los títulos estén saneados antes de entregar anticipos. En KAIZEN verificamos los antecedentes del inmueble y coordinamos cada paso hasta el registro definitivo.
          </p>
        </div>

        {/* Pasos */}
        <div className="space-y-6">
          {[
            {
              n: '1',
              title: 'Presupuesto y opciones de crédito',
              desc: 'Definición del monto disponible para la cuota inicial y evaluación de requisitos para crédito de vivienda social o comercial.',
            },
            {
              n: '2',
              title: 'Búsqueda y comparación de propiedades',
              desc: 'Comparación de precios por metro cuadrado, accesos y servicios básicos en las distintas zonas de Tarija.',
            },
            {
              n: '3',
              title: 'Verificación en Derechos Reales y Alcaldía',
              desc: 'Revisión del Folio Real, certificado alodial actualizado, impuestos municipales al día y planos aprobados.',
            },
            {
              n: '4',
              title: 'Minuta de compraventa y desembolso',
              desc: 'Redacción de la minuta con términos claros de pago y entrega, coordinando con la notaría y la entidad financiera.',
            },
            {
              n: '5',
              title: 'Inscripción en Derechos Reales',
              desc: 'Registro del derecho propietario ante Derechos Reales y actualización del registro en Catastro Municipal.',
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
            <h3 className="font-headline-sm text-lg font-bold">¿Tienes dudas sobre una propiedad en Tarija?</h3>
            <p className="text-xs text-gray-300">
              Podemos orientarte en la revisión preliminar de los documentos antes de realizar una oferta.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 px-6 rounded text-xs flex items-center gap-2 shrink-0 transition shadow"
          >
            <FaWhatsapp className="text-base" />
            <span>Consultar con un asesor</span>
          </a>
        </div>
      </div>
    </div>
  );
}
