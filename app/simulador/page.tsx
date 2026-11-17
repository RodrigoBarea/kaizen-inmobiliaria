import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SimuladorFinanciero from '@/components/SimuladorFinanciero';

export const metadata: Metadata = {
  title: 'Simulador Financiero & Cuota Bancaria | KAIZEN Tarija',
  description: 'Calcula tu cuota bancaria estimada y rentabilidad de alquiler para inmuebles en Tarija, Bolivia.',
};

export default function SimuladorPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-surface-stone border border-border-hairline px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              Herramienta Financiera · KAIZEN
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Simulador de Crédito & Rentabilidad
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Evalúa diferentes escenarios de aporte inicial, plazos y retornos mensuales para tu próxima adquisición inmobiliaria en Tarija.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-kaizen-red transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>

        <SimuladorFinanciero />
      </div>
    </div>
  );
}
