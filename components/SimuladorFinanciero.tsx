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
    `Hola equipo KAIZEN. Utilicé su Simulador Financiero en el sitio web con estos parámetros:\n\n` +
      `• Valor del inmueble: $${precio.toLocaleString('es-BO')} USD\n` +
      `• Aporte Inicial (${aportePct}%): $${aporteInicial.toLocaleString('es-BO')} USD\n` +
      `• Plazo: ${plazoAnios} años\n` +
      `• Cuota Bancaria Estimada: ~$${cuotaMensual.toLocaleString('es-BO')} USD/mes\n` +
      `• Renta Proyectada: ~$${rentaMensual.toLocaleString('es-BO')} USD/mes\n\n` +
      `¿Podrían brindarme una corrida financiera oficial y mostrarme inmuebles que calcen con este perfil?`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  return (
    <section className="w-full bg-[#181816] text-[#F6F5F2] py-16 sm:py-24 border-y border-[#181816]" id="simulador">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#F6F5F2]/15">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A65D47] block mb-2 font-medium">
              Herramienta de Decisión Patrimonial
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F5F2] tracking-tight">
              Simulador Financiero & <span className="italic font-normal text-[#A65D47]">Retorno de Capital</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#F6F5F2]/65 max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            Calcula la cuota bancaria estimada y la proyección de rentabilidad por alquiler antes de agendar tu visita en Tarija.
          </p>
        </div>

        {/* Simulator Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Controls: 7 Columns */}
          <div className="lg:col-span-7 space-y-8 bg-[#181816] border border-[#F6F5F2]/15 p-6 sm:p-8">
            
            {/* Control 1: Valor de la propiedad */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label htmlFor={precioId} className="font-mono text-xs uppercase tracking-wider text-[#F6F5F2]/80">
                  1. Valor de la Propiedad ($us)
                </label>
                <span className="font-editorial text-2xl sm:text-3xl font-semibold text-[#F6F5F2] tabular-nums">
                  ${precio.toLocaleString('es-BO')} <span className="font-mono text-xs font-normal text-[#F6F5F2]/50">USD</span>
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
                className="w-full accent-[#A65D47] h-1.5 bg-[#F6F5F2]/20 rounded-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#F6F5F2]/40 mt-1.5">
                <span>$30,000</span>
                <span>$300,000</span>
                <span>$600,000+</span>
              </div>
            </div>

            {/* Control 2: % Aporte Inicial */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label htmlFor={aporteId} className="font-mono text-xs uppercase tracking-wider text-[#F6F5F2]/80">
                  2. Aporte Inicial en Efectivo (%)
                </label>
                <span className="font-editorial text-2xl sm:text-3xl font-semibold text-[#F6F5F2] tabular-nums">
                  {aportePct}% <span className="font-mono text-xs font-normal text-[#F6F5F2]/50">(${aporteInicial.toLocaleString('es-BO')} USD)</span>
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
                className="w-full accent-[#A65D47] h-1.5 bg-[#F6F5F2]/20 rounded-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#F6F5F2]/40 mt-1.5">
                <span>10% (Mínimo bancario)</span>
                <span>30%</span>
                <span>60% (Recomendado inversión)</span>
              </div>
            </div>

            {/* Control 3: Plazo en Años */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label htmlFor={plazoId} className="font-mono text-xs uppercase tracking-wider text-[#F6F5F2]/80">
                  3. Plazo de Financiamiento
                </label>
                <span className="font-editorial text-2xl sm:text-3xl font-semibold text-[#F6F5F2] tabular-nums">
                  {plazoAnios} <span className="font-mono text-xs font-normal text-[#F6F5F2]/50">Años</span>
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
                className="w-full accent-[#A65D47] h-1.5 bg-[#F6F5F2]/20 rounded-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#F6F5F2]/40 mt-1.5">
                <span>5 años</span>
                <span>15 años</span>
                <span>30 años</span>
              </div>
            </div>

            <div className="pt-2 font-mono text-[11px] text-[#F6F5F2]/50 border-t border-[#F6F5F2]/10 flex flex-wrap justify-between gap-2">
              <span>Monto a financiar: ${montoFinanciar.toLocaleString('es-BO')} USD</span>
              <span>Tasa referencial amortizada: 7.5% anual</span>
            </div>

          </div>

          {/* Real-Time Results: 5 Columns High Contrast Display */}
          <div className="lg:col-span-5 bg-[#EFECE6] text-[#181816] p-6 sm:p-8 border border-[#F6F5F2]/20 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#A65D47] font-semibold block mb-4">
                Proyección Financiera KAIZEN
              </span>

              {/* Resultado 1: Cuota Mensual */}
              <div className="pb-6 border-b border-[#181816]/15">
                <span className="font-mono text-xs uppercase tracking-wider text-[#181816]/70 block mb-1">
                  Cuota Bancaria Mensual Estimada
                </span>
                <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#181816] tracking-tight">
                  ${cuotaMensual.toLocaleString('es-BO')}{' '}
                  <span className="font-mono text-sm font-normal text-[#181816]/60">USD/mes</span>
                </div>
                <p className="font-sans text-xs text-[#181816]/65 mt-1.5">
                  Fórmula de amortización francesa a {plazoAnios} años con seguro y gravamen incluidos.
                </p>
              </div>

              {/* Resultado 2: Renta Mensual Proyectada */}
              <div className="py-6 border-b border-[#181816]/15">
                <span className="font-mono text-xs uppercase tracking-wider text-[#181816]/70 block mb-1">
                  Renta Mensual Proyectada (Alquiler)
                </span>
                <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#A65D47] tracking-tight">
                  ${rentaMensual.toLocaleString('es-BO')}{' '}
                  <span className="font-mono text-sm font-normal text-[#181816]/60">USD/mes</span>
                </div>
                <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-[#181816]/80">
                  <span className="inline-block w-2 h-2 bg-[#A65D47]" />
                  <span>Yield Bruto Estimado: ~{rentabilidadAnual}% anual en Tarija</span>
                </div>
              </div>

              {/* Comparativa Cuota vs Renta */}
              <div className="py-4 font-mono text-xs text-[#181816]/80 flex justify-between items-center">
                <span>Diferencial Flujo Mensual:</span>
                <span className={`font-semibold ${rentaMensual >= cuotaMensual ? 'text-emerald-700' : 'text-[#181816]'}`}>
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
                className="w-full bg-[#181816] hover:bg-[#A65D47] active:scale-[0.98] text-[#F6F5F2] py-3.5 px-4 rounded-none font-mono text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-[15px]" />
                <span>Solicitar Corrida Oficial con Asesor</span>
              </a>
              <span className="block text-center font-mono text-[9px] uppercase tracking-wider text-[#181816]/50 mt-2">
                Sin compromiso · Respuesta en menos de 2 horas hábiles
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
