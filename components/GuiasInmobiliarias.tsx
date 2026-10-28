'use client';

import Link from 'next/link';

export default function GuiasInmobiliarias() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-canvas border-b border-border-hairline">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 border-b border-border-hairline pb-6">
          <div>
            <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-text-muted block mb-2 font-semibold">
              Publicaciones Técnicas KAIZEN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-primary tracking-tight">
              Biblioteca de Conocimiento Inmobiliario
            </h2>
          </div>
          <p className="text-body-sm font-body-sm text-text-muted max-w-md mt-4 md:mt-0 leading-relaxed">
            Consulta y descarga sin costo nuestras guías redactadas por abogados inmobiliarios y tasadores colegiados en Tarija.
          </p>
        </div>

        {/* 2 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Guide 1: Buyer's Guide */}
          <Link href="/guia-comprador" className="block group">
            <div className="bg-surface-stone border border-border-hairline p-7 sm:p-8 flex flex-col justify-between h-full rounded-[2px] group-hover:border-primary transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-[#F5F4F0] text-primary border border-border-hairline px-3 py-1 text-legal-badge font-legal-badge uppercase tracking-widest font-semibold rounded-[2px]">
                    Manual Jurídico 2025 · PDF
                  </span>
                  <span className="text-legal-badge font-legal-badge text-text-muted font-medium">
                    Edición Especial
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-headline-md font-semibold text-primary mb-3 group-hover:text-kaizen-red transition-colors">
                  Guía del Comprador Inteligente: Cómo comprar en Bolivia sin contingencias
                </h3>

                <p className="text-body-md font-body-md text-text-muted mb-6 leading-relaxed">
                  Checklist paso a paso para verificar Folios Reales, certificados alodiales, impuestos anuales pagados, planos aprobados por el Gobierno Municipal de Tarija y cómo evitar anticipos de dinero sin respaldo judicial.
                </p>
              </div>

              <div className="pt-6 border-t border-border-hairline flex items-center justify-between">
                <span className="text-xs text-text-muted">34 Páginas · Formato Ejecutivo</span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:text-kaizen-red group-hover:translate-x-1 transition-all">
                  <span>Ver Guía Gratuita</span>
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Guide 2: Seller's Guide */}
          <Link href="/guia-vendedor" className="block group">
            <div className="bg-surface-stone border border-border-hairline p-7 sm:p-8 flex flex-col justify-between h-full rounded-[2px] group-hover:border-primary transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-[#F5F4F0] text-primary border border-border-hairline px-3 py-1 text-legal-badge font-legal-badge uppercase tracking-widest font-semibold rounded-[2px]">
                    Estrategia Financiera · PDF
                  </span>
                  <span className="text-legal-badge font-legal-badge text-text-muted font-medium">
                    Valuación Real
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-headline-md font-semibold text-primary mb-3 group-hover:text-kaizen-red transition-colors">
                  Guía del Propietario: Estrategia de Fijación de Precio en Tarija
                </h3>

                <p className="text-body-md font-body-md text-text-muted mb-6 leading-relaxed">
                  Aprende cómo evitar que tu inmueble permanezca estancado durante años en el mercado. Criterios de comparabilidad, amortización de mejoras y negociación con compradores respaldados por la banca.
                </p>
              </div>

              <div className="pt-6 border-t border-border-hairline flex items-center justify-between">
                <span className="text-xs text-text-muted">28 Páginas · Plantilla de Tasación</span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:text-kaizen-red group-hover:translate-x-1 transition-all">
                  <span>Ver Guía Gratuita</span>
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </span>
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
