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
              Recursos informativos
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-primary tracking-tight">
              Guías inmobiliarias para Tarija
            </h2>
          </div>
          <p className="text-body-sm font-body-sm text-text-muted max-w-md mt-4 md:mt-0 leading-relaxed">
            Pautas prácticas sobre trámites notariales, revisión en Derechos Reales y tasación en el mercado inmobiliario local.
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
                    Guía de compraventa
                  </span>
                  <span className="text-legal-badge font-legal-badge text-text-muted font-medium">
                    Actualizada 2025
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-headline-md font-semibold text-primary mb-3 group-hover:text-kaizen-red transition-colors">
                  Guía del comprador: cómo verificar un inmueble en Tarija
                </h3>

                <p className="text-body-md font-body-md text-text-muted mb-6 leading-relaxed">
                  Lista de verificación para revisar Folio Real, certificados alodiales, impuestos municipales pagados y planos aprobados por el municipio antes de comprometer fondos.
                </p>
              </div>

              <div className="pt-6 border-t border-border-hairline flex items-center justify-between">
                <span className="text-xs text-text-muted">Lectura de 5 minutos</span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:text-kaizen-red group-hover:translate-x-1 transition-all">
                  <span>Leer guía</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
                    Guía para propietarios
                  </span>
                  <span className="text-legal-badge font-legal-badge text-text-muted font-medium">
                    Valuación comercial
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-headline-md font-semibold text-primary mb-3 group-hover:text-kaizen-red transition-colors">
                  Guía del propietario: fijación de precio y venta en Tarija
                </h3>

                <p className="text-body-md font-body-md text-text-muted mb-6 leading-relaxed">
                  Criterios para tasar una propiedad según precios reales de cierre en la zona, organizar los papeles previos y atender visitas de compradores calificados.
                </p>
              </div>

              <div className="pt-6 border-t border-border-hairline flex items-center justify-between">
                <span className="text-xs text-text-muted">Lectura de 5 minutos</span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:text-kaizen-red group-hover:translate-x-1 transition-all">
                  <span>Leer guía</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
