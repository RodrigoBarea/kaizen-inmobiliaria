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
    <div className="bg-white min-h-screen pb-24">
      
      {/* Luminous Editorial Header inspirado en LuxuryEstate */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-surface-stone border border-border-hairline px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              Sobre Nosotros · KAIZEN
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Asesoramiento inmobiliario con respaldo legal y técnico en Tarija
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Acompañamos operaciones de compra, venta y anticrético en Tarija con criterios técnicos y documentales rigurosos. Revisamos títulos en Derechos Reales, verificamos gravámenes y orientamos cada etapa hasta la firma notarial.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 space-y-16">
        
        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-canvas p-8 sm:p-10 rounded-[2px] border border-border-hairline space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-primary text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">flag</span>
            </div>
            <h2 className="font-headline-sm text-xl font-bold text-primary">Nuestra misión</h2>
            <p className="font-body-md text-sm text-text-muted leading-relaxed">
              Facilitar transacciones inmobiliarias transparentes en el departamento de Tarija, revisando la documentación legal de cada propiedad y asesorando a propietarios y compradores con números reales de mercado.
            </p>
          </div>

          <div className="bg-surface-canvas p-8 sm:p-10 rounded-[2px] border border-border-hairline space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-primary text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </div>
            <h2 className="font-headline-sm text-xl font-bold text-primary">Nuestra visión</h2>
            <p className="font-body-md text-sm text-text-muted leading-relaxed">
              Ser la inmobiliaria de referencia en Tarija por la exactitud de nuestras tasaciones, la rigurosidad en el saneamiento legal y la claridad en el trato con cada cliente.
            </p>
          </div>
        </div>

        {/* Pilares de Excelencia */}
        <div className="text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-kaizen-red uppercase tracking-wider">
              Nuestros criterios de trabajo
            </span>
            <h2 className="font-display-xl text-2xl sm:text-3xl font-bold text-primary">
              Cómo trabajamos cada propiedad
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-[2px] bg-white border border-border-hairline shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-[2px] bg-red-50 text-kaizen-red flex items-center justify-center border border-red-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-headline-sm font-bold text-base text-primary">Revisión legal previa</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Verificación del Folio Real, certificados alodiales, planos aprobados e impuestos municipales antes de comprometer cualquier pago.
              </p>
            </div>

            <div className="p-6 rounded-[2px] bg-white border border-border-hairline shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-[2px] bg-red-50 text-kaizen-red flex items-center justify-center border border-red-100">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-headline-sm font-bold text-base text-primary">Orientación financiera</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Tasación comercial comparativa por metro cuadrado y asesoramiento para la gestión de créditos bancarios de vivienda.
              </p>
            </div>

            <div className="p-6 rounded-[2px] bg-white border border-border-hairline shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-[2px] bg-red-50 text-kaizen-red flex items-center justify-center border border-red-100">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-headline-sm font-bold text-base text-primary">Asesores locales</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Profesionales con conocimiento directo de las zonas urbanas y rurales de Tarija y de los trámites ante notarías y alcaldías.
              </p>
            </div>
          </div>
        </div>

        {/* Sección del Equipo de Asesores */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-kaizen-red uppercase tracking-wider">
              Equipo comercial
            </span>
            <h2 className="font-display-xl text-2xl sm:text-3xl font-bold text-primary">
              Asesores inmobiliarios en Tarija
            </h2>
            <p className="font-body-md text-sm sm:text-base text-text-muted max-w-xl mx-auto">
              Atención directa en Tarija, San Lorenzo, Uriondo, Bermejo y Yacuiba.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentes.map((agente) => (
              <div
                key={agente.id}
                className="bg-surface-canvas border border-border-hairline rounded-[2px] p-6 text-center space-y-4 shadow-sm"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border border-border-hairline shadow-sm bg-white">
                  <Image
                    src={agente.foto_principal || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'}
                    alt={agente.agent_name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-primary">{agente.agent_name}</h3>
                  <p className="text-xs font-semibold text-kaizen-red">{agente.cargo || 'Asesor Inmobiliario KAIZEN'}</p>
                </div>
                <div className="pt-2 border-t border-border-hairline flex flex-col items-center gap-1.5 text-xs text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{agente.telefono}</span>
                  </div>
                  {agente.correo && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-text-muted" />
                      <span>{agente.correo}</span>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${agente.telefono.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`¡Hola ${agente.agent_name}! 👋 Me comunico desde KAIZEN Bienes Raíces y quisiera recibir asesoramiento inmobiliario.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-medium py-2.5 rounded-[2px] transition-colors shadow-sm"
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
