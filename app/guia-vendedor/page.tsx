'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GuiaVendedorPage() {
  return (
    <div className="space-y-12 pb-20 pt-20 bg-white">
      {/* Banner */}
      <div className="relative min-h-[320px] w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
          alt="El Método KAIZEN para Vender Rápido en Tarija"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 space-y-2 py-12">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Para propietarios en Tarija
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase">
            Guía para vender tu inmueble en Tarija
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Criterios para tasar a precio de mercado, organizar los documentos legales y coordinar visitas con compradores calificados.
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
            Cinco pasos para la venta de una propiedad
          </h2>
          <p className="font-body-md text-sm text-gray-600 leading-relaxed">
            Fijar un precio acorde a la zona y tener la documentación saneada son indispensables para cerrar una venta sin demoras. En KAIZEN apoyamos en la valoración comercial y en la verificación previa ante notaría.
          </p>
        </div>

        {/* Pasos */}
        <div className="space-y-6">
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
            <h3 className="font-headline-sm text-lg font-bold">¿Quieres conocer el valor comercial de tu inmueble en Tarija?</h3>
            <p className="text-xs text-gray-300">
              Completa los datos de tu propiedad y te orientamos con una tasación de referencia.
            </p>
          </div>
          <Link
            href="/vender"
            className="bg-[#E60000] hover:bg-[#C00000] text-white font-bold py-3.5 px-6 rounded text-xs shrink-0 transition shadow flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">calculate</span>
            <span>Solicitar tasación de referencia</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
