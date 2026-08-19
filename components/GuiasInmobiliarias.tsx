'use client';

import Link from 'next/link';

export default function GuiasInmobiliarias() {
  return (
    <section className="py-20 md:py-28 bg-white px-4 sm:px-8">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#E60000] bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3 inline-block">
            Recursos Inmobiliarios Estratégicos
          </span>
          <h2 className="font-headline-md text-3xl sm:text-4xl font-black text-[#1A1A1A]">
            Empodera tus Decisiones Financieras
          </h2>
          <p className="font-body-md text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2">
            Información de alto valor para que des el siguiente paso inmobiliario con la certeza de un experto.
          </p>
        </div>

        {/* 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 - Guía del Comprador */}
          <Link href="/guia-comprador" className="group block">
            <div className="bg-[#F7F7F7] rounded-xl border border-[#E2E8F0] hover-lift p-8 flex flex-col sm:flex-row gap-6 items-start h-full shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center shrink-0 group-hover:bg-[#E60000] transition-colors">
                <span className="material-symbols-outlined text-[28px]">key</span>
              </div>
              <div className="space-y-2.5 flex-1">
                <span className="text-[11px] uppercase tracking-widest text-[#E60000] font-bold">
                  Para Compradores
                </span>
                <h3 className="font-headline-md text-xl font-bold text-[#1A1A1A] group-hover:text-[#E60000] transition-colors">
                  Guía Definitiva del Comprador Inteligente
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Domina el mercado, asegura tu crédito y evita las trampas legales al adquirir tu nuevo hogar.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 font-label-md text-xs font-bold text-[#E60000] group-hover:underline">
                    <span>Descargar Guía Gratuita</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2 - Guía del Vendedor */}
          <Link href="/guia-vendedor" className="group block">
            <div className="bg-[#F7F7F7] rounded-xl border border-[#E2E8F0] hover-lift p-8 flex flex-col sm:flex-row gap-6 items-start h-full shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center shrink-0 group-hover:bg-[#E60000] transition-colors">
                <span className="material-symbols-outlined text-[28px]">real_estate_agent</span>
              </div>
              <div className="space-y-2.5 flex-1">
                <span className="text-[11px] uppercase tracking-widest text-[#E60000] font-bold">
                  Para Propietarios
                </span>
                <h3 className="font-headline-md text-xl font-bold text-[#1A1A1A] group-hover:text-[#E60000] transition-colors">
                  El Método KAIZEN para Vender Rápido
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Descubre cómo tasar correctamente tu inmueble y atraer compradores calificados sin desgastar su valor.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 font-label-md text-xs font-bold text-[#E60000] group-hover:underline">
                    <span>Conocer el Método</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
