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
            Verificación notarial y documental
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-primary tracking-tight">
            Revisión documental antes de publicar cada propiedad
          </h2>
          <p className="text-body-md sm:text-body-lg font-body-lg text-text-muted mt-4 leading-relaxed">
            En Tarija, muchas operaciones se demoran por sucesiones pendientes, observaciones en Folio Real o impuestos municipales sin regularizar. En KAIZEN revisamos estos antecedentes antes de iniciar la comercialización.
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
                1. Verificación en Derechos Reales
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Revisión de tradición propietaria, certificado alodial actualizado y confirmación de que el Folio Real no registre gravámenes ni anotaciones preventivas.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Revisión preventiva
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
                2. Tasación comparativa de mercado
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Fijamos el valor por metro cuadrado tomando transacciones efectivas y oferta real en cada zona de Tarija, evitando sobreprecios que prolonguen los plazos.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Valor de mercado
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
                3. Redacción de minutas y contratos
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Elaboramos minutas con cláusulas formales de arras, plazos de entrega y condiciones de desembolso para protocolización ante notario de fe pública.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Seguridad contractual
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
                4. Coordinación de crédito bancario
              </h3>
              <p className="text-body-sm font-body-sm text-text-muted leading-relaxed">
                Seguimiento directo con entidades financieras locales (Bisa, BNB, Mercantil Santa Cruz, BCP) para la presentación de carpetas y avance del avalúo.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-border-hairline">
              <span className="text-legal-badge font-legal-badge uppercase text-primary font-semibold">
                Gestión crediticia
              </span>
            </div>
          </div>

        </div>

        {/* Big Display Metric Banners */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 border border-border-hairline bg-surface-warm/50 divide-y md:divide-y-0 md:divide-x divide-border-hairline text-center py-6 sm:py-8 rounded-[2px]">
          <div className="p-4 sm:p-6">
            <span className="block text-3xl sm:text-4xl lg:text-[48px] font-display-xl text-primary font-bold tabular-nums">
              +{inView ? countProps : 0}
            </span>
            <span className="text-sm font-semibold text-primary mt-2 block">
              Inmuebles con revisión documental
            </span>
            <span className="text-[11px] font-legal-badge uppercase text-text-muted">
              En Tarija, San Lorenzo y Uriondo
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <span className="block text-3xl sm:text-4xl lg:text-[48px] font-display-xl text-[#0B4632] font-bold tabular-nums">
              {inView ? countSeg : 0}%
            </span>
            <span className="text-sm font-semibold text-primary mt-2 block">
              Operaciones concluidas sin litigios
            </span>
            <span className="text-[11px] font-legal-badge uppercase text-text-muted">
              Registro en Derechos Reales
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <span className="block text-3xl sm:text-4xl lg:text-[48px] font-display-xl text-[#E60000] font-bold tabular-nums">
              {inView ? countDias : 0} Días
            </span>
            <span className="text-sm font-semibold text-primary mt-2 block">
              Tiempo promedio hasta la firma notarial
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
