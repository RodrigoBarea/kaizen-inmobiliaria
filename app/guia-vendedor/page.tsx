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
          alt="El Método KAIZEN para Vender Rápido"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 space-y-2 py-12">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Para Propietarios
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase">
            El Método KAIZEN para Vender Rápido
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Descubre cómo tasar correctamente tu inmueble y atraer compradores calificados sin desgastar su valor.
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
            Estrategia de Comercialización en 5 Pasos
          </h2>
          <p className="font-body-md text-sm text-gray-600 leading-relaxed">
            Vender al precio correcto requiere estrategia, documentación al día y exposición masiva ante compradores serios. En KAIZEN nos encargamos de todo el proceso.
          </p>
        </div>

        {/* Pasos */}
        <div className="space-y-6">
          {[
            {
              n: '1',
              title: 'Tasación Basada en Datos',
              desc: 'Fijación del precio comercial óptimo para competir en el mercado boliviano.',
            },
            {
              n: '2',
              title: 'Saneamiento Documental',
              desc: 'Preparación de la carpeta legal completa para evitar que la venta se caiga.',
            },
            {
              n: '3',
              title: 'Home Staging',
              desc: 'Acondicionamiento estético y fotografía profesional para enamorar al comprador.',
            },
            {
              n: '4',
              title: 'Exposición Multicanal',
              desc: 'Campañas de marketing digital en las principales redes y portales.',
            },
            {
              n: '5',
              title: 'Cierre Seguro',
              desc: 'Blindaje legal de la transacción hasta que el dinero esté en tu cuenta.',
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
            <h3 className="font-headline-sm text-lg font-bold">¿Listo para maximizar el valor de tu inmueble?</h3>
            <p className="text-xs text-gray-300">
              Registra los datos de tu propiedad y prepararemos un estudio comercial sin costo.
            </p>
          </div>
          <Link
            href="/vender"
            className="bg-[#E60000] hover:bg-[#C00000] text-white font-bold py-3.5 px-6 rounded text-xs shrink-0 transition shadow flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">calculate</span>
            <span>Solicitar tasación gratuita y vender sin estrés</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
