'use client';

import { useState, useId } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function SimuladorFinanciero() {
  const [precio, setPrecio] = useState<number>(120000);
  const [aportePct, setAportePct] = useState<number>(20);
  const [plazoAnios, setPlazoAnios] = useState<number>(20);

  const precioId = useId();
  const aporteId = useId();
  const plazoId = useId();

  // Cálculos Financieros
  const tasaAnual = 0.075; // 7.5% Tasa de Interés Referencial Anual
  const tasaMensual = tasaAnual / 12;
  const meses = plazoAnios * 12;

  const aporteInicial = Math.round(precio * (aportePct / 100));
  const montoFinanciar = Math.max(0, precio - aporteInicial);

  // Fórmula de Amortización Francesa
  const cuotaMensual =
    montoFinanciar > 0
      ? Math.round(
          (montoFinanciar *
            (tasaMensual * Math.pow(1 + tasaMensual, meses))) /
            (Math.pow(1 + tasaMensual, meses) - 1)
        )
      : 0;

  // Renta Mensual Proyectada (~0.68% mensual del valor del inmueble = ~8.16% anual)
  const rentaMensual = Math.round(precio * 0.0068);
  const rentabilidadAnual = (0.0068 * 12 * 100).toFixed(1);

  // Contacto por WhatsApp con datos precargados del simulador
  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    `¡Hola equipo KAIZEN! 👋 Utilicé su Simulador Financiero en el sitio web con estos parámetros:\n\n` +
      `• Valor del inmueble: $${precio.toLocaleString('es-BO')} USD\n` +
      `• Aporte Inicial (${aportePct}%): $${aporteInicial.toLocaleString('es-BO')} USD\n` +
      `• Plazo: ${plazoAnios} años\n` +
      `• Cuota Bancaria Estimada: ~$${cuotaMensual.toLocaleString('es-BO')} USD/mes\n` +
      `• Renta Proyectada: ~$${rentaMensual.toLocaleString('es-BO')} USD/mes\n\n` +
      `¿Podrían brindarme una corrida financiera oficial y mostrarme inmuebles disponibles en Tarija?`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  return (
    <section className="w-full bg-[#0D1117] text-white py-16 sm:py-24 border-y border-white/10" id="simulador">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/15">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-kaizen-red block mb-2 font-semibold">
              Herramienta de Decisión Financiera
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-headline-lg font-bold text-white tracking-tight">
              Simulador Financiero & <span className="italic font-normal text-kaizen-red">Retorno de Inversión</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-body-md text-white/80 max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            Calcula la cuota bancaria estimada y la proyección de rentabilidad por alquiler antes de agendar tu visita en Tarija.
          </p>
        </div>

        {/* Simulator Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Controls: 7 Columns */}
          <div className="lg:col-span-7 space-y-7 bg-white/5 border border-white/10 rounded-[4px] p-6 sm:p-8">
            
            {/* Control 1: Valor de la propiedad */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor={precioId} className="text-xs uppercase tracking-wider font-semibold text-white/80">
                  1. Valor de la Propiedad ($us)
                </label>
                <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                  ${precio.toLocaleString('es-BO')} <span className="text-xs font-normal text-white/60">USD</span>
                </span>
              </div>
              <input
                id={precioId}
                type="range"
                min="30000"
                max="600000"
                step="5000"
                value={precio}
                onChange={(e) => setPrecio(Number(e.target.value))}
                className="w-full accent-kaizen-red h-2 bg-white/20 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-white/50 mt-1">
                <span>$30,000 USD</span>
                <span>$300,000 USD</span>
                <span>$600,000+ USD</span>
              </div>
            </div>

            {/* Control 2: % Aporte Inicial */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor={aporteId} className="text-xs uppercase tracking-wider font-semibold text-white/80">
                  2. Aporte Inicial en Efectivo (%)
                </label>
                <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {aportePct}% <span className="text-xs font-normal text-white/60">(${aporteInicial.toLocaleString('es-BO')} USD)</span>
                </span>
              </div>
              <input
                id={aporteId}
                type="range"
                min="10"
                max="60"
                step="5"
                value={aportePct}
                onChange={(e) => setAportePct(Number(e.target.value))}
                className="w-full accent-kaizen-red h-2 bg-white/20 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-white/50 mt-1">
                <span>10% (Mínimo crédito)</span>
                <span>30%</span>
                <span>60% (Recomendado)</span>
              </div>
            </div>

            {/* Control 3: Plazo en Años */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor={plazoId} className="text-xs uppercase tracking-wider font-semibold text-white/80">
                  3. Plazo de Financiamiento
                </label>
                <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {plazoAnios} <span className="text-xs font-normal text-white/60">Años</span>
                </span>
              </div>
              <input
                id={plazoId}
                type="range"
                min="5"
                max="30"
                step="5"
                value={plazoAnios}
                onChange={(e) => setPlazoAnios(Number(e.target.value))}
                className="w-full accent-kaizen-red h-2 bg-white/20 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-white/50 mt-1">
                <span>5 años</span>
                <span>15 años</span>
                <span>30 años</span>
              </div>
            </div>

            <div className="pt-3 text-xs text-white/60 border-t border-white/10 flex flex-wrap justify-between gap-2">
              <span>Monto a financiar: ${montoFinanciar.toLocaleString('es-BO')} USD</span>
              <span>Tasa referencial amortizada: 7.5% anual</span>
            </div>

          </div>

          {/* Real-Time Results: 5 Columns High Contrast Card */}
          <div className="lg:col-span-5 bg-white text-primary p-6 sm:p-8 rounded-[4px] border border-gray-200 shadow-xl flex flex-col justify-between h-full">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-kaizen-red font-bold block mb-4">
                Proyección Financiera KAIZEN
              </span>

              {/* Resultado 1: Cuota Mensual */}
              <div className="pb-6 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted block mb-1">
                  Cuota Bancaria Mensual Estimada
                </span>
                <div className="text-3xl sm:text-4xl font-metric-price font-bold text-primary tracking-tight">
                  ${cuotaMensual.toLocaleString('es-BO')}{' '}
                  <span className="text-sm font-normal text-text-muted">USD/mes</span>
                </div>
                <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                  Fórmula de amortización francesa a {plazoAnios} años con seguro y gravamen incluidos.
                </p>
              </div>

              {/* Resultado 2: Renta Mensual Proyectada */}
              <div className="py-6 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted block mb-1">
                  Renta Mensual Proyectada (Alquiler)
                </span>
                <div className="text-3xl sm:text-4xl font-metric-price font-bold text-kaizen-red tracking-tight">
                  ${rentaMensual.toLocaleString('es-BO')}{' '}
                  <span className="text-sm font-normal text-text-muted">USD/mes</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-1 rounded-[2px] w-fit">
                  <span className="material-symbols-outlined text-[15px]">trending_up</span>
                  <span>Rentabilidad Estimada: ~{rentabilidadAnual}% anual en Tarija</span>
                </div>
              </div>

              {/* Comparativa Cuota vs Renta */}
              <div className="py-4 text-xs font-semibold text-primary flex justify-between items-center">
                <span className="text-text-muted">Diferencial Flujo Mensual:</span>
                <span className={rentaMensual >= cuotaMensual ? 'text-emerald-700 font-bold' : 'text-primary'}>
                  {rentaMensual >= cuotaMensual ? '+' : ''}${(rentaMensual - cuotaMensual).toLocaleString('es-BO')} USD/mes
                </span>
              </div>
            </div>

            {/* Direct CTA WhatsApp with calculated figures */}
            <div className="pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-kaizen-red hover:bg-[#C00000] active:scale-[0.98] text-white py-3 px-4 rounded-[2px] font-semibold text-xs transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <FaWhatsapp className="text-base" />
                <span>Solicitar Corrida Oficial con un Asesor</span>
              </a>
              <span className="block text-center text-[11px] text-text-muted mt-2">
                Sin compromiso · Asesoría personalizada en Tarija
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
