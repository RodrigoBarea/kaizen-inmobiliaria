'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Agente } from '@/types/database';
import { getAgentes } from '@/lib/supabase';
import { ShieldCheck, TrendingUp, Users, Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function SobreNosotrosPage() {
  const [agentes, setAgentes] = useState<Agente[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAgentes();
        setAgentes(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-20 pb-24 pt-20 bg-white">
      
      {/* Banner Hero & Manifiesto */}
      <div className="relative min-h-[400px] w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600&auto=format&fit=crop&q=80"
          alt="Manifiesto KAIZEN Bienes Raíces"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl space-y-4 py-16">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Nuestra Identidad & Manifiesto
          </span>
          <h1 className="font-headline-md text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            KAIZEN: INTEGRIDAD, VISIÓN Y MEJORA CONTINUA EN CADA METRO CUADRADO.
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            El mercado inmobiliario boliviano necesitaba evolucionar. En KAIZEN, no somos simples intermediarios; somos arquitectos de tu tranquilidad patrimonial. Elevamos los estándares de la industria combinando la precisión técnica, el rigor legal y un servicio al cliente genuinamente excepcional.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-20">
        
        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F7F7F7] p-8 sm:p-10 rounded-xl border border-gray-200 space-y-3 hover-lift">
            <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">flag</span>
            </div>
            <h2 className="font-headline-md text-2xl font-black text-[#1A1A1A]">Nuestra Misión</h2>
            <p className="font-body-md text-sm text-gray-600 leading-relaxed">
              Brindar soluciones inmobiliarias integrales y seguras en Bolivia, garantizando transacciones transparentes mediante asesoría legal y financiera experta, protegiendo el patrimonio de cada cliente.
            </p>
          </div>

          <div className="bg-[#F7F7F7] p-8 sm:p-10 rounded-xl border border-gray-200 space-y-3 hover-lift">
            <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">visibility</span>
            </div>
            <h2 className="font-headline-md text-2xl font-black text-[#1A1A1A]">Nuestra Visión</h2>
            <p className="font-body-md text-sm text-gray-600 leading-relaxed">
              Consolidarnos como la red inmobiliaria más confiable y tecnológicamente avanzada de Bolivia, siendo el referente indiscutible en seguridad jurídica y rentabilidad.
            </p>
          </div>
        </div>

        {/* Pilares de Excelencia */}
        <div className="text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#E60000] uppercase tracking-wider">
              Pilares de Excelencia
            </span>
            <h2 className="font-headline-md text-3xl sm:text-4xl font-black text-[#1A1A1A]">
              El Estándar de Calidad KAIZEN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3 hover-lift">
              <div className="w-10 h-10 rounded bg-red-50 text-[#E60000] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-headline-sm font-bold text-lg text-[#1A1A1A]">Seguridad Jurídica</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Auditoría implacable de cada documento y Folio Real antes de cualquier firma.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3 hover-lift">
              <div className="w-10 h-10 rounded bg-red-50 text-[#E60000] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-headline-sm font-bold text-lg text-[#1A1A1A]">Asesoramiento Financiero</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Estructuración de operaciones rentables, seguras y viables crediticiamente.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3 hover-lift">
              <div className="w-10 h-10 rounded bg-red-50 text-[#E60000] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-headline-sm font-bold text-lg text-[#1A1A1A]">Asesores de Élite</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Un equipo de profesionales en constante capacitación técnica, legal y comercial.
              </p>
            </div>
          </div>
        </div>

        {/* Sección del Equipo de Asesores */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#E60000] uppercase tracking-wider">
              Equipo Especializado
            </span>
            <h2 className="font-headline-md text-3xl sm:text-4xl font-black text-[#1A1A1A]">
              Conoce a los Estrategas Detrás de tu Próxima Gran Inversión.
            </h2>
            <p className="font-body-md text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Especialistas locales en La Paz, Santa Cruz, Cochabamba y Tarija listos para guiarte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentes.map((agente) => (
              <div
                key={agente.id}
                className="bg-[#F7F7F7] border border-gray-200 rounded-xl p-6 text-center space-y-4 hover-lift transition"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-gray-300 shadow-sm bg-white">
                  <Image
                    src={agente.foto_principal || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'}
                    alt={agente.agent_name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1A1A1A]">{agente.agent_name}</h3>
                  <p className="text-xs font-semibold text-[#E60000]">{agente.cargo || 'Asesor Inmobiliario KAIZEN'}</p>
                </div>
                <div className="pt-2 border-t border-gray-200 flex flex-col items-center gap-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{agente.telefono}</span>
                  </div>
                  {agente.correo && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <span>{agente.correo}</span>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${agente.telefono.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`¡Hola ${agente.agent_name}! 👋 Me comunico desde KAIZEN Bienes Raíces y quisiera recibir asesoramiento inmobiliario.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold py-2 rounded transition shadow-sm"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>Contactar Asesor</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
