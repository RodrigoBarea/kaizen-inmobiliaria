'use client';

import { useEffect, useRef, useState } from 'react';
import { MetricasEmpresa } from '@/types/database';

interface Props {
  metricas?: MetricasEmpresa;
}

function useCountUp(target: number, duration: number = 1800, startAnimation: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [target, duration, startAnimation]);

  return count;
}

export default function DatosRelevantes({ metricas }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalProps = metricas?.propiedades_transaccionadas || 140;
  const diasCierre = metricas?.dias_promedio_colocacion || 35;
  const seguridad = metricas?.seguridad_juridica_porcentaje || 100;

  const countProps = useCountUp(totalProps, 1800, inView);
  const countDias = useCountUp(diasCierre, 1600, inView);
  const countSeg = useCountUp(seguridad, 1500, inView);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-surface-stone border-b border-border-hairline"
      id="legales"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-text-muted block mb-3 font-semibold">
            El Estándar Notarial KAIZEN
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-primary tracking-tight">
            Transacciones Inmobiliarias con Rigor Jurídico Absoluto.
          </h2>
          <p className="text-body-md sm:text-body-lg font-body-lg text-text-muted mt-4 leading-relaxed">
            En Tarija, un porcentaje significativo de transacciones sufren demoras por herencias no declaradas, doble folio o afectaciones municipales. En KAIZEN intervenimos con auditoría previa antes de publicar cualquier activo.
          </p>
        </div>

        {/* 4 Pillars Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="border border-border-hairline bg-surface-canvas p-6 flex flex-col justify-between rounded-[2px] hover:border-primary transition-colors">
            <div>
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center mb-6 rounded-[2px]">
                <span className="material-symbols-outlined text-[22px]">gavel</span>
              </div>
              <h3 className="text-lg font-headline-sm font-semibold text-primary mb-3">
                1. Auditoría en Derechos Reales
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Verificación de tradición dominial de 30 años, levantamiento de gravámenes, hipotecas previas y certificado alodial en mano antes de la reserva.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Protocolo Preventivo
              </span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="border border-border-hairline bg-surface-canvas p-6 flex flex-col justify-between rounded-[2px] hover:border-primary transition-colors">
            <div>
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center mb-6 rounded-[2px]">
                <span className="material-symbols-outlined text-[22px]">analytics</span>
              </div>
              <h3 className="text-lg font-headline-sm font-semibold text-primary mb-3">
                2. Tasación Científica de Mercado
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Determinamos el valor justo basado en m² homologado, ubicación geoespacial y transacciones notariales cerradas, erradicando especulaciones infundadas.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Cero Sobreprecio
              </span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="border border-border-hairline bg-surface-canvas p-6 flex flex-col justify-between rounded-[2px] hover:border-primary transition-colors">
            <div>
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center mb-6 rounded-[2px]">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <h3 className="text-lg font-headline-sm font-semibold text-primary mb-3">
                3. Minutas Notariadas Blindadas
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Redacción de contratos con cláusulas de arras precisas, plazos resolutivos estrictos y homologación notarial directa para salvaguardar tu patrimonio.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Seguridad Patrimonial
              </span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="border border-border-hairline bg-surface-canvas p-6 flex flex-col justify-between rounded-[2px] hover:border-primary transition-colors">
            <div>
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center mb-6 rounded-[2px]">
                <span className="material-symbols-outlined text-[22px]">account_balance</span>
              </div>
              <h3 className="text-lg font-headline-sm font-semibold text-primary mb-3">
                4. Gestión de Crédito Bancario
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Canalización directa con gerencias de banca privada (Bisa, BNB, Mercantil Santa Cruz, BCP) para agilizar avalúos bancarios y desembolsos sin fricción.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Tramitación Ágil
              </span>
            </div>
          </div>

        </div>

        {/* Big Display Metric Banners */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 border border-border-hairline bg-surface-warm/50 divide-y md:divide-y-0 md:divide-x divide-border-hairline text-center py-6 sm:py-8 rounded-[2px]">
          <div className="p-4 sm:p-6">
            <span className="block text-3xl sm:text-4xl lg:text-[48px] font-display-xl text-primary font-bold">
              +{inView ? countProps : 0}
            </span>
            <span className="text-sm font-semibold text-primary mt-2 block">
              Inmuebles Auditados & Homologados
            </span>
            <span className="text-[11px] font-legal-badge uppercase text-text-muted">
              En Tarija, San Lorenzo y Uriondo
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <span className="block text-3xl sm:text-4xl lg:text-[48px] font-display-xl text-[#0B4632] font-bold">
              {inView ? countSeg : 0}%
            </span>
            <span className="text-sm font-semibold text-primary mt-2 block">
              Títulos con Cero Contingencias
            </span>
            <span className="text-[11px] font-legal-badge uppercase text-text-muted">
              Garantía Registral Notarial
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <span className="block text-3xl sm:text-4xl lg:text-[48px] font-display-xl text-[#E60000] font-bold">
              {inView ? countDias : 0} Días
            </span>
            <span className="text-sm font-semibold text-primary mt-2 block">
              Tiempo Promedio de Cierre Notarial
            </span>
            <span className="text-[11px] font-legal-badge uppercase text-text-muted">
              Desde captación a minuta definitiva
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
