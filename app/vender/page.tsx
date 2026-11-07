'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createLeadVender } from '@/lib/supabase';
import { CheckCircle2, ShieldCheck, TrendingUp, Users, DollarSign, Send, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function VenderPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipo_inmueble: 'Venta',
    ubicacion: '',
    precio_estimado: '',
    detalles: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createLeadVender({
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.email || undefined,
        tipo_inmueble: formData.tipo_inmueble,
        ubicacion: formData.ubicacion,
        precio_estimado: formData.precio_estimado ? Number(formData.precio_estimado) : undefined,
        detalles: formData.detalles || undefined,
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Hubo un error al enviar el formulario. Por favor intenta por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    '¡Hola KAIZEN! 🤝 Tengo una propiedad y quiero Venderla o Darla en Anticrético. Me interesa su Método Kaizen y solicitar un análisis comercial para saber su valor real.'
  )}`;

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Luminous Editorial Header inspirado en LuxuryEstate */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-surface-stone border border-border-hairline px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              Servicio para Propietarios · KAIZEN
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Vende o coloca en anticrético tu inmueble en Tarija
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Tasamos tu propiedad y revisamos los documentos antes de publicarla. Gestionamos la promoción y el contacto con compradores directos en Tarija y el resto del país.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Izquierdo: Beneficios Iconográficos */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-semibold text-kaizen-red uppercase tracking-wider">
                Metodología KAIZEN
              </span>
              <h2 className="font-display-xl text-2xl sm:text-3xl font-bold text-primary mt-1">
                Gestión completa para la venta de tu inmueble
              </h2>
            </div>

            <div className="space-y-6">
              
              {/* Beneficio 1 */}
              <div className="flex gap-4 p-4 rounded-[2px] border border-border-hairline bg-surface-canvas">
                <div className="w-10 h-10 rounded-[2px] bg-red-50 text-kaizen-red flex items-center justify-center shrink-0 border border-red-100">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-primary">
                    Filtro previo de interesados
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-1">
                    Coordinamos visitas únicamente con personas que cuentan con fondos disponibles o con trámite de crédito hipotecario en curso.
                  </p>
                </div>
              </div>

              {/* Beneficio 2 */}
              <div className="flex gap-4 p-4 rounded-[2px] border border-border-hairline bg-surface-canvas">
                <div className="w-10 h-10 rounded-[2px] bg-red-50 text-kaizen-red flex items-center justify-center shrink-0 border border-red-100">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-primary">
                    Fotografía y difusión enfocada
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-1">
                    Preparamos fotografías claras, ficha técnica con datos comprobados y difusión en portales y redes dirigidas a compradores en Tarija.
                  </p>
                </div>
              </div>

              {/* Beneficio 3 */}
              <div className="flex gap-4 p-4 rounded-[2px] border border-border-hairline bg-surface-canvas">
                <div className="w-10 h-10 rounded-[2px] bg-red-50 text-kaizen-red flex items-center justify-center shrink-0 border border-red-100">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-primary">
                    Tasación comercial objetiva
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-1">
                    Calculamos el precio por metro cuadrado comparando transacciones cerradas en la misma zona para evitar fijar precios que demoren la venta.
                  </p>
                </div>
              </div>

              {/* Beneficio 4 */}
              <div className="flex gap-4 p-4 rounded-[2px] border border-border-hairline bg-surface-canvas">
                <div className="w-10 h-10 rounded-[2px] bg-red-50 text-kaizen-red flex items-center justify-center shrink-0 border border-red-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-primary">
                    Acompañamiento legal y notarial
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-1">
                    Redactamos la minuta de compraventa con cláusulas claras, revisamos el estado en Derechos Reales y acompañamos la firma hasta el cobro definitivo.
                  </p>
                </div>
              </div>

            </div>

            {/* Llamado a la Acción Directo */}
            <div className="p-6 rounded-[2px] bg-surface-canvas border border-border-hairline space-y-3">
              <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                <FaWhatsapp className="text-emerald-600 text-lg" />
                <span>¿Prefieres consultar directamente?</span>
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Si prefieres hablar directamente con un asesor sobre tu propiedad en Tarija, escríbenos por WhatsApp.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium text-xs px-5 py-2.5 rounded-[2px] shadow-sm transition-colors"
              >
                <FaWhatsapp className="text-base" />
                <span>Chatear por WhatsApp Ahora</span>
              </a>
            </div>

          </div>

          {/* Lado Derecho: Formulario de Registro */}
          <div className="lg:col-span-6 bg-surface-canvas p-8 sm:p-10 rounded-[2px] border border-border-hairline shadow-sm">
            {success ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#10B981] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display-xl text-2xl font-bold text-primary">¡Información Recibida!</h3>
                <p className="text-sm text-text-muted max-w-sm mx-auto">
                  Un especialista de KAIZEN se comunicará contigo para realizar el análisis comercial de tu inmueble.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-4 inline-block bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-[2px] hover:bg-primary-hover transition"
                >
                  Registrar otra propiedad
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase font-semibold tracking-wider text-kaizen-red">
                    Formulario Oficial de Captación
                  </span>
                  <h3 className="font-display-xl text-xl sm:text-2xl font-bold text-primary mt-1">
                    Confíanos tu propiedad en Tarija
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Completa los datos y te presentaremos un plan de comercialización a medida.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-3.5 py-2.5 bg-white border border-border-hairline rounded-[2px] text-sm text-primary focus:border-primary focus:ring-0"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+591 70000000"
                      className="w-full px-3.5 py-2.5 bg-white border border-border-hairline rounded-[2px] text-sm text-primary focus:border-primary focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-border-hairline rounded-[2px] text-sm text-primary focus:border-primary focus:ring-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Tipo de Operación *
                    </label>
                    <select
                      name="tipo_inmueble"
                      value={formData.tipo_inmueble}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-border-hairline rounded-[2px] text-sm text-primary focus:border-primary focus:ring-0 cursor-pointer"
                    >
                      <option value="Venta">Quiero Vender</option>
                      <option value="Anticrético">Quiero Dar en Anticrético</option>
                      <option value="Alquiler">Quiero Dar en Alquiler</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Precio Estimado en $us
                    </label>
                    <input
                      type="number"
                      name="precio_estimado"
                      value={formData.precio_estimado}
                      onChange={handleChange}
                      placeholder="Ej. 150000"
                      className="w-full px-3.5 py-2.5 bg-white border border-border-hairline rounded-[2px] text-sm text-primary focus:border-primary focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Ubicación Específica (Ciudad y Barrio/Zona) *
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    required
                    value={formData.ubicacion}
                    onChange={handleChange}
                    placeholder="Ej. Tarija, Barrio Miraflores"
                    className="w-full px-3.5 py-2.5 bg-white border border-border-hairline rounded-[2px] text-sm text-primary focus:border-primary focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Detalles Adicionales del Inmueble
                  </label>
                  <textarea
                    name="detalles"
                    rows={3}
                    value={formData.detalles}
                    onChange={handleChange}
                    placeholder="Dormitorios, superficie, estado de papeles o características destacadas..."
                    className="w-full px-3.5 py-2.5 bg-white border border-border-hairline rounded-[2px] text-sm text-primary focus:border-primary focus:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-[2px] shadow-sm transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Procesando solicitud...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Solicitar Análisis Comercial Gratuito</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
