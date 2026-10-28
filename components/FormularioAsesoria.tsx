'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SolicitudAsesoria } from '@/types/database';
import { createSolicitudAsesoria } from '@/lib/supabase';
import { CheckCircle2, Loader2, ShieldCheck, MapPin, DollarSign, Home } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FormularioAsesoria() {
  const [formData, setFormData] = useState<SolicitudAsesoria>({
    nombre: '',
    telefono: '',
    email: '',
    interes: 'Comprar',
    zona_interes: 'Ciudad de Tarija',
    tipo_inmueble: 'Casa',
    presupuesto: '',
    mensaje: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.telefono.trim()) {
      alert('Por favor ingresa tu nombre y teléfono.');
      return;
    }

    if (!acceptedTerms) {
      alert('Por favor acepta ser contactado para continuar.');
      return;
    }

    setLoading(true);
    try {
      await createSolicitudAsesoria(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al enviar tu solicitud. Intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `¡Hola equipo KAIZEN! 👋 Acabo de solicitar asesoría en su página web:\n\n*Nombre:* ${formData.nombre}\n*Interés:* ${formData.interes}\n*Zona:* ${formData.zona_interes}\n*Tipo:* ${formData.tipo_inmueble}\n*Presupuesto:* ${formData.presupuesto || 'A convenir'}`
  )}`;

  return (
    <section className="bg-surface-stone py-16 sm:py-20 lg:py-24 border-b border-border-hairline" id="asesoria">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-16">
        
        {/* VIP Captación Section (From Stitch Design) */}
        <div className="border border-border-hairline bg-surface-warm p-8 md:p-12 lg:p-16 relative overflow-hidden rounded-[2px]">
          <div className="max-w-2xl relative z-10">
            <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-[#0B4632] block mb-3 font-semibold">
              Servicio de Captación Exclusiva
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-primary tracking-tight mb-4">
              ¿Deseas vender o poner en anticrético tu inmueble en Tarija?
            </h2>
            <p className="text-body-md sm:text-body-lg font-body-lg text-text-muted mb-8 leading-relaxed">
              Realizamos la tasación técnica y saneamiento de carpetas sin costo previo para propietarios calificados. Comercialización discreta y acceso a inversores directos de Tarija, Santa Cruz y La Paz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="bg-[#E60000] hover:bg-[#C00000] text-white px-7 py-3 rounded-[2px] font-body-md font-semibold text-center transition-all duration-150 hover:-translate-y-0.5 shadow-sm text-sm"
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  '¡Hola KAIZEN! Deseo contactar a un agente inmobiliario para evaluar la venta o anticrético de mi propiedad en Tarija.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar agente inmobiliario
              </a>
              <Link
                href="/vender"
                className="border border-primary bg-transparent text-primary hover:bg-primary hover:text-white px-7 py-3 rounded-[2px] font-body-md font-semibold text-center transition-colors text-sm"
              >
                Solicitar Tasación Gratuita
              </Link>
            </div>
          </div>

          {/* Architectural Watermark Decoration */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.04] translate-x-10 translate-y-10 hidden lg:block">
            <span className="text-[340px] font-bold font-title-editorial leading-none tracking-tighter">KZ</span>
          </div>
        </div>

        {/* Lead Consultation Form Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          
          {/* Left Column: Guarantees */}
          <div className="lg:col-span-5 bg-surface-canvas border border-border-hairline p-6 sm:p-8 rounded-[2px] space-y-6">
            <div>
              <span className="text-legal-badge font-legal-badge uppercase tracking-wider text-kaizen-red font-semibold">
                Asesoría Notarial & Financiera
              </span>
              <h3 className="font-headline-sm text-xl sm:text-2xl font-semibold text-primary mt-1">
                Tu patrimonio en manos expertas
              </h3>
              <p className="text-body-sm text-text-muted mt-2 leading-relaxed">
                Respondemos en menos de 2 horas en horario laboral. Analizamos tu caso con verificación preliminar en Derechos Reales.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 bg-surface-stone border border-border-hairline rounded-[2px]">
                <div className="w-8 h-8 rounded-[2px] bg-primary text-white flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-primary">Precios reales sin especulación</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Tasación comparativa según mercado notarial real en Tarija.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-surface-stone border border-border-hairline rounded-[2px]">
                <div className="w-8 h-8 rounded-[2px] bg-primary text-white flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-primary">Casas, Dptos y Terrenos en el Valle</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Opciones en Cercado, Aranjuez, Miraflores, San Lorenzo y Uriondo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-surface-stone border border-border-hairline rounded-[2px]">
                <div className="w-8 h-8 rounded-[2px] bg-primary text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-primary">100% Blindaje Jurídico</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Revisión de gravámenes, folio alodial y títulos notariales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-surface-stone border border-border-hairline p-6 sm:p-10 rounded-[2px] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-subtle text-[#0B4632] border border-[#0B4632]/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-headline-sm font-semibold text-primary">
                  ¡Solicitud Recibida con Éxito!
                </h4>
                <p className="text-body-sm text-text-muted max-w-md mx-auto">
                  Un asesor de KAIZEN se pondrá en contacto contigo a la brevedad. Si deseas atención inmediata, puedes iniciar el chat directo:
                </p>
                <div className="pt-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#E60000] text-white px-6 py-3 rounded-[2px] text-xs font-semibold"
                  >
                    <FaWhatsapp className="text-base" />
                    <span>Continuar por WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-legal-badge font-legal-badge uppercase text-text-muted mb-1 font-semibold">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Rodrigo Barea"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full bg-white border border-border-hairline px-3.5 py-2.5 text-sm text-primary rounded-[2px] focus:border-primary focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-legal-badge font-legal-badge uppercase text-text-muted mb-1 font-semibold">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: +591 70000000"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full bg-white border border-border-hairline px-3.5 py-2.5 text-sm text-primary rounded-[2px] focus:border-primary focus:ring-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-legal-badge font-legal-badge uppercase text-text-muted mb-1 font-semibold">
                      Tipo de Interés
                    </label>
                    <select
                      value={formData.interes}
                      onChange={(e) => setFormData({ ...formData, interes: e.target.value })}
                      className="w-full bg-white border border-border-hairline px-3 py-2.5 text-xs text-primary rounded-[2px] focus:border-primary focus:ring-0 cursor-pointer"
                    >
                      <option value="Comprar">Comprar Inmueble</option>
                      <option value="Vender">Vender mi Inmueble</option>
                      <option value="Anticrético">Anticrético</option>
                      <option value="Alquilar">Alquiler</option>
                      <option value="Inversión Rural">Finca / Viñedo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-legal-badge font-legal-badge uppercase text-text-muted mb-1 font-semibold">
                      Zona Preferida
                    </label>
                    <select
                      value={formData.zona_interes}
                      onChange={(e) => setFormData({ ...formData, zona_interes: e.target.value })}
                      className="w-full bg-white border border-border-hairline px-3 py-2.5 text-xs text-primary rounded-[2px] focus:border-primary focus:ring-0 cursor-pointer"
                    >
                      <option value="Ciudad de Tarija">Ciudad de Tarija (Cercado)</option>
                      <option value="Aranjuez / Los Sauces">Aranjuez / Los Sauces</option>
                      <option value="Miraflores / San Jerónimo">Miraflores / San Jerónimo</option>
                      <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
                      <option value="Uriondo">Valle de la Concepción / Uriondo</option>
                      <option value="Otra Zona">Otra Zona en Bolivia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-legal-badge font-legal-badge uppercase text-text-muted mb-1 font-semibold">
                      Presupuesto ($us)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: $120,000 USD"
                      value={formData.presupuesto || ''}
                      onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                      className="w-full bg-white border border-border-hairline px-3.5 py-2.5 text-xs text-primary rounded-[2px] focus:border-primary focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-legal-badge font-legal-badge uppercase text-text-muted mb-1 font-semibold">
                    Mensaje o Requerimientos Específicos
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detalles sobre el inmueble que buscas o deseas comercializar..."
                    value={formData.mensaje || ''}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-white border border-border-hairline px-3.5 py-2 text-xs text-primary rounded-[2px] focus:border-primary focus:ring-0 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="rounded-[2px] border-border-hairline text-primary focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-[11px] text-text-muted cursor-pointer">
                    Acepto ser contactado por un asesor inmobiliario certificado de KAIZEN.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-black text-white py-3 px-6 rounded-[2px] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando Solicitud...</span>
                      </>
                    ) : (
                      <span>Enviar Consulta Confidencial</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
