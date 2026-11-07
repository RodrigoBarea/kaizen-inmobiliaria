'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GuiaVendedorPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Luminous Editorial Header inspirado en LuxuryEstate */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-surface-stone border border-border-hairline px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              Para propietarios en Tarija · KAIZEN
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Guía para vender tu inmueble en Tarija
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Criterios para tasar a precio de mercado, organizar los documentos legales y coordinar visitas con compradores calificados.
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
            Cinco pasos para la venta de una propiedad
          </h2>
          <p className="font-body-md text-sm text-text-muted leading-relaxed">
            Fijar un precio acorde a la zona y tener la documentación saneada son indispensables para cerrar una venta sin demoras. En KAIZEN apoyamos en la valoración comercial y en la verificación previa ante notaría.
          </p>
        </div>

        {/* Pasos */}
        <div className="space-y-4">
          {[
            {
              n: '1',
              title: 'Tasación comercial comparativa',
              desc: 'Fijación del precio por metro cuadrado tomando como referencia transacciones recientes en la misma zona de Tarija.',
            },
            {
              n: '2',
              title: 'Revisión y saneamiento de documentos',
              desc: 'Revisión del Folio Real, plano de lote o construcción e impuestos municipales para subsanar observaciones con anticipación.',
            },
            {
              n: '3',
              title: 'Preparación y fotografía del inmueble',
              desc: 'Organización del espacio y fotos claras que muestren la distribución, iluminación y estado general de la propiedad.',
            },
            {
              n: '4',
              title: 'Publicación y filtro de interesados',
              desc: 'Difusión en canales inmobiliarios y coordinación de visitas únicamente con personas con presupuesto o crédito preaprobado.',
            },
            {
              n: '5',
              title: 'Minuta de compraventa y pago',
              desc: 'Firma del contrato de transferencia ante notario de fe pública y seguimiento del desembolso en cuenta bancaria.',
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
            <h3 className="font-headline-sm text-lg font-bold text-primary">¿Quieres conocer el valor comercial de tu inmueble en Tarija?</h3>
            <p className="text-xs text-text-muted">
              Completa los datos de tu propiedad y te orientamos con una tasación de referencia.
            </p>
          </div>
          <Link
            href="/vender"
            className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-[2px] text-xs shrink-0 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">calculate</span>
            <span>Solicitar tasación de referencia</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
