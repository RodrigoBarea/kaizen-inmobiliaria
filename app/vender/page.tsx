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
    <div className="space-y-16 pb-20 pt-20 bg-white">
      
      {/* Hero Explicativo */}
      <div className="relative min-h-[380px] w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
          alt="Método Kaizen de Comercialización"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-4 py-16">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Método Kaizen de Comercialización
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
            MAXIMIZA EL VALOR DE TU PROPIEDAD Y CIERRA LA VENTA EN TIEMPO RÉCORD.
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conoce el Método Kaizen de Comercialización: Filtramos interesados, aplicamos marketing de alto impacto y blindamos el aspecto legal hasta que recibes tu dinero.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Izquierdo: Beneficios Iconográficos */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold text-[#E60000] uppercase tracking-wider">
                Propuesta de Valor KAIZEN
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-1">
                La experiencia de comercializar sin estrés ni riesgos
              </h2>
            </div>

            <div className="space-y-6">
              
              {/* Beneficio 1 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 text-[#E60000] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-[#1A1A1A]">
                    Perfilación Financiera Rigurosa
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    Decimos adiós a las visitas improductivas. Solo llevamos a tu propiedad clientes con capacidad de pago comprobada o pre-aprobación bancaria.
                  </p>
                </div>
              </div>

              {/* Beneficio 2 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 text-[#E60000] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-[#1A1A1A]">
                    Marketing Inmobiliario Premium
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    Posicionamos tu inmueble con fotografía profesional, video recorridos y pauta digital segmentada para atraer a los mejores compradores e inversionistas de Tarija.
                  </p>
                </div>
              </div>

              {/* Beneficio 3 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 text-[#E60000] flex items-center justify-center shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-[#1A1A1A]">
                    Tasación Técnica y Comercial
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    Determinamos el precio justo de mercado basándonos en transacciones reales y recientes en Tarija, asegurando competitividad y alta rentabilidad.
                  </p>
                </div>
              </div>

              {/* Beneficio 4 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-50 text-[#E60000] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-base text-[#1A1A1A]">
                    Acompañamiento Legal Total
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    Gestionamos la redacción de contratos, saneamiento si es requerido y acompañamiento notarial hasta la transferencia efectiva de los fondos.
                  </p>
                </div>
              </div>

            </div>

            {/* Llamado a la Acción Directo */}
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
              <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                <FaWhatsapp className="text-emerald-600 text-lg" />
                <span>¿Prefieres una atención inmediata?</span>
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                ¿Prefieres saltarte los formularios y hablar directamente con un asesor especialista en Tarija?
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs px-5 py-3 rounded shadow transition"
              >
                <FaWhatsapp className="text-base" />
                <span>Chatear por WhatsApp Ahora</span>
              </a>
            </div>

          </div>

          {/* Lado Derecho: Formulario de Registro */}
          <div className="lg:col-span-6 bg-[#F7F7F7] p-8 sm:p-10 rounded-xl border border-gray-200 shadow-sm">
            {success ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#10B981] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-headline-md text-2xl font-black text-[#1A1A1A]">¡Información Recibida!</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Un especialista de KAIZEN se comunicará contigo para realizar el análisis comercial de tu inmueble.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-4 inline-block bg-[#1A1A1A] text-white text-xs font-bold px-6 py-2.5 rounded hover:bg-[#E60000] transition"
                >
                  Registrar otra propiedad
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#E60000]">
                    Formulario Oficial de Captación
                  </span>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-black text-[#1A1A1A] mt-1">
                    Confíanos tu Propiedad. Nosotros Nos Encargamos del Resto.
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Completa los datos y te presentaremos un plan de comercialización a medida.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+591 70000000"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                      Tipo de Operación *
                    </label>
                    <select
                      name="tipo_inmueble"
                      value={formData.tipo_inmueble}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0 cursor-pointer"
                    >
                      <option value="Venta">Quiero Vender</option>
                      <option value="Anticrético">Quiero Dar en Anticrético</option>
                      <option value="Alquiler">Quiero Dar en Alquiler</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                      Precio Estimado en $us
                    </label>
                    <input
                      type="number"
                      name="precio_estimado"
                      value={formData.precio_estimado}
                      onChange={handleChange}
                      placeholder="Ej. 150000"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Ubicación Específica (Ciudad y Barrio/Zona) *
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    required
                    value={formData.ubicacion}
                    onChange={handleChange}
                    placeholder="Ej. Tarija, Barrio Miraflores"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Detalles Adicionales del Inmueble
                  </label>
                  <textarea
                    name="detalles"
                    rows={3}
                    value={formData.detalles}
                    onChange={handleChange}
                    placeholder="Dormitorios, superficie, estado de papeles o características destacadas..."
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded text-sm text-[#1A1A1A] focus:border-[#E60000] focus:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E60000] hover:bg-[#C00000] text-white font-label-md font-bold py-3.5 px-6 rounded shadow transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
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
