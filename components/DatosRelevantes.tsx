'use client';

import { useEffect, useRef, useState } from 'react';
import { MetricasEmpresa } from '@/types/database';
import { Building2, Trees, Timer, ShieldCheck } from 'lucide-react';

interface Props {
  metricas?: MetricasEmpresa;
}

function useCountUp(target: number, duration: number = 2000, startAnimation: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out cubic function: 1 - Math.pow(1 - progress, 3)
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

function StatCard({
  value,
  prefix = '',
  suffix = '',
  title,
  subtitle,
  icon: Icon,
  accentColor = '#E60000',
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  title: string;
  subtitle: string;
  icon: any;
  accentColor?: string;
  inView: boolean;
}) {
  const animatedCount = useCountUp(value, 2000, inView);

  return (
    <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
      {/* Glow sutil en hover */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200/60">
            KAIZEN
          </span>
        </div>

        <div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight flex items-baseline gap-1 font-mono">
            {prefix && <span className="text-[#E60000]">{prefix}</span>}
            <span>{inView ? animatedCount : 0}</span>
            {suffix && <span className="text-sm sm:text-base font-bold text-gray-500">{suffix}</span>}
          </div>
          <h3 className="font-extrabold text-base text-gray-900 mt-2 line-clamp-1">
            {title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const data = metricas || {
    propiedades_transaccionadas: 180,
    propiedades_transaccionadas_label: 'Propiedades Transaccionadas',
    propiedades_transaccionadas_sub: 'Casas, departamentos y lotes cerrados con éxito',
    hectareas_gestionadas: 60,
    hectareas_gestionadas_label: 'Terrenos y Lotes Gestionados',
    hectareas_gestionadas_sub: 'Fuerte presencia en áreas de expansión y campo en Tarija',
    dias_promedio_colocacion: 35,
    dias_promedio_colocacion_label: 'Tiempo Promedio de Colocación',
    dias_promedio_colocacion_sub: 'Eficiencia y agilidad para quien busca vender o alquilar',
    seguridad_juridica_porcentaje: 100,
    seguridad_juridica_label: 'Seguridad Jurídica y Respaldo',
    seguridad_juridica_sub: 'Tranquilidad en trámites legales y Derechos Reales',
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200/60 text-[#E60000] text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            <span>Resultados & Trayectoria</span>
          </div>
          <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight">
            Datos Relevantes que Respaldan tu Inversión
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Metodología Kaizen aplicada al mercado inmobiliario de Tarija: precisión técnica, agilidad y transparencia en cada operación.
          </p>
        </div>

        {/* 4 Bloques de Métricas con Count-Up Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Bloque 1: Propiedades Transaccionadas */}
          <StatCard
            value={data.propiedades_transaccionadas}
            prefix="+"
            title={data.propiedades_transaccionadas_label}
            subtitle={data.propiedades_transaccionadas_sub}
            icon={Building2}
            accentColor="#E60000"
            inView={inView}
          />

          {/* Bloque 2: Terrenos y Lotes Gestionados */}
          <StatCard
            value={data.hectareas_gestionadas}
            prefix="+"
            suffix="Ha"
            title={data.hectareas_gestionadas_label}
            subtitle={data.hectareas_gestionadas_sub}
            icon={Trees}
            accentColor="#10B981"
            inView={inView}
          />

          {/* Bloque 3: Tiempo Promedio de Colocación */}
          <StatCard
            value={data.dias_promedio_colocacion}
            suffix="Días"
            title={data.dias_promedio_colocacion_label}
            subtitle={data.dias_promedio_colocacion_sub}
            icon={Timer}
            accentColor="#F59E0B"
            inView={inView}
          />

          {/* Bloque 4: Seguridad Jurídica y Respaldo */}
          <StatCard
            value={data.seguridad_juridica_porcentaje}
            suffix="%"
            title={data.seguridad_juridica_label}
            subtitle={data.seguridad_juridica_sub}
            icon={ShieldCheck}
            accentColor="#1A1A1A"
            inView={inView}
          />

        </div>

      </div>
    </section>
  );
}
