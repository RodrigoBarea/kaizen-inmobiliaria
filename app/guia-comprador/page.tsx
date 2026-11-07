'use client';

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
    <div className="bg-white min-h-screen pb-24">
      
      {/* Luminous Editorial Header inspirado en LuxuryEstate */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-surface-stone border border-border-hairline px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              Para compradores en Tarija · KAIZEN
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Guía para comprar un inmueble en Tarija
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Pasos clave para revisar la documentación, gestionar tu crédito y formalizar la compraventa con respaldo notarial.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 pt-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-kaizen-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>

        <div className="space-y-4">
          <h2 className="font-display-xl text-2xl sm:text-3xl font-bold text-primary">
            Etapas para una compraventa segura en Tarija
          </h2>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Comprar una casa, departamento o terreno requiere confirmar que los títulos estén saneados antes de entregar anticipos. En KAIZEN verificamos los antecedentes del inmueble y coordinamos cada paso hasta el registro definitivo.
          </p>
        </div>

        {/* Pasos */}
        <div className="space-y-4">
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
              className="bg-surface-canvas p-6 rounded-[2px] border border-border-hairline flex gap-4 items-start shadow-sm"
            >
              <div className="w-8 h-8 rounded-[2px] bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                {paso.n}
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm font-bold text-base text-primary">{paso.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{paso.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-surface-canvas border border-border-hairline p-8 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-headline-sm text-lg font-bold text-primary">¿Tienes dudas sobre una propiedad en Tarija?</h3>
            <p className="text-xs text-text-muted">
              Podemos orientarte en la revisión preliminar de los documentos antes de realizar una oferta.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-[2px] text-xs flex items-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            <FaWhatsapp className="text-base" />
            <span>Consultar con un asesor</span>
          </a>
        </div>
      </div>
    </div>
  );
}
