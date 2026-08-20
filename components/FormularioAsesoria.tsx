'use client';

import { useState } from 'react';
import { SolicitudAsesoria } from '@/types/database';
import { createSolicitudAsesoria } from '@/lib/supabase';
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, MapPin, DollarSign, Home, TreePine, Bell } from 'lucide-react';
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

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
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
    `¡Hola equipo KAIZEN! 👋 Acabo de solicitar asesoría en su página web:\n\n*Nombre:* ${formData.nombre}\n*Interés:* ${formData.interes}\n*Zona:* ${formData.zona_interes}\n*Tipo de Inmueble:* ${formData.tipo_inmueble}\n*Presupuesto:* ${formData.presupuesto || 'A convenir'}\n*Mensaje:* ${formData.mensaje || 'Deseo coordinar una llamada o reunión.'}`
  )}`;

  return (
    <section id="asesoria" className="py-20 md:py-28 bg-[#0D0D0D] text-white relative overflow-hidden">
      
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E60000]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Cabecera Central */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <TreePine className="w-5 h-5" />
          </div>
          <h2 className="font-headline-md text-3xl sm:text-4xl font-black text-white tracking-tight">
            Descubre una nueva forma de vivir e invertir
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            Asesoramiento profesional para comprar, tomar en anticrético o alquilar tu próxima propiedad en la ciudad de Tarija o en el área rural.
          </p>
        </div>

        {/* Notificación Superior / Banner Píldora */}
        <div className="max-w-2xl mx-auto bg-[#181818] border border-white/10 rounded-2xl p-4 sm:px-6 shadow-xl flex items-center gap-3.5 text-left">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <p className="text-xs text-gray-300 leading-snug">
            <strong className="text-white">Atención personalizada sin costo:</strong> Evaluamos opciones reales con verificación en Derechos Reales e INRA.
          </p>
        </div>

        {/* Contenedor Principal: 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Tarjeta de Aspectos Destacados */}
          <div className="lg:col-span-5 bg-[#161616] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#E60000] uppercase tracking-wider">
                Respaldo Integral KAIZEN
              </span>
              <h3 className="font-extrabold text-xl text-white">
                Tu inversión en las mejores manos
              </h3>
            </div>

            <div className="space-y-3.5 pt-2">
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#202020] border border-white/5 hover:border-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Opciones para todo presupuesto</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Desde departamentos y anticréticos accesibles hasta residencias de lujo y viñedos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#202020] border border-white/5 hover:border-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-[#E60000] flex items-center justify-center shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Desde 60 m² hasta más de 5,000 m²</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Casas urbanas, oficinas corporativas, quintas campestres y parcelas productivas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#202020] border border-white/5 hover:border-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ciudad de Tarija & Área Rural</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Miraflores, Aranjuez, Senac, San Lorenzo, Tomatitas, Uriondo y San Andrés.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#202020] border border-white/5 hover:border-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Seguridad Jurídica</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    Auditoría documental y saneamiento en Derechos Reales Tarija antes de cerrar.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo */}
          <div className="lg:col-span-7 bg-[#161616] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10 space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-2xl text-white">
                    ¡Solicitud Recibida con Éxito!
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Gracias <strong className="text-white">{formData.nombre}</strong>. Un especialista de KAIZEN se pondrá en contacto contigo a la brevedad.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition hover:scale-105"
                  >
                    <FaWhatsapp className="text-lg" />
                    <span>Abrir Chat de WhatsApp Ahora</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nombre: '',
                        telefono: '',
                        email: '',
                        interes: 'Comprar',
                        zona_interes: 'Ciudad de Tarija',
                        tipo_inmueble: 'Casa',
                        presupuesto: '',
                        mensaje: '',
                      });
                    }}
                    className="text-xs text-gray-400 hover:text-white font-semibold underline p-2 transition"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Selector de Interés / Operación */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-2">
                    ¿Qué tipo de asesoría necesitas? *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Comprar', 'Anticrético', 'Alquilar'].map((opc) => (
                      <button
                        key={opc}
                        type="button"
                        onClick={() => setFormData({ ...formData, interes: opc })}
                        className={`py-2.5 px-3 rounded-xl font-bold text-xs transition border text-center ${
                          formData.interes === opc
                            ? 'bg-[#E60000] text-white border-[#E60000] shadow-lg shadow-red-950/50'
                            : 'bg-[#202020] text-gray-300 border-white/10 hover:bg-[#282828] hover:text-white'
                        }`}
                      >
                        {opc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campos de Nombre y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Rodrigo Barea"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-white/15 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-[#E60000]/50 focus:border-[#E60000] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <div className="flex items-center">
                      <span className="bg-[#282828] border border-r-0 border-white/15 rounded-l-xl px-3 py-3 text-xs font-bold text-gray-300 flex items-center gap-1">
                        🇧🇴 +591
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="70000000"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-3 rounded-r-xl bg-[#202020] border border-white/15 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-[#E60000]/50 focus:border-[#E60000] outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Correo Electrónico */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Correo Electrónico (Opcional)
                  </label>
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-white/15 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-[#E60000]/50 focus:border-[#E60000] outline-none transition"
                  />
                </div>

                {/* Zona y Tipo de Inmueble */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Zona de Preferencia *
                    </label>
                    <select
                      value={formData.zona_interes}
                      onChange={(e) => setFormData({ ...formData, zona_interes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-white/15 text-white text-sm focus:ring-2 focus:ring-[#E60000]/50 focus:border-[#E60000] outline-none cursor-pointer"
                    >
                      <option value="Ciudad de Tarija" className="bg-[#1A1A1A] text-white">Ciudad de Tarija (Urbano)</option>
                      <option value="Área Rural / Fincas" className="bg-[#1A1A1A] text-white">Área Rural (Fincas, Viñedos, San Lorenzo)</option>
                      <option value="Ambas Zonas" className="bg-[#1A1A1A] text-white">Ambas Zonas / Abierto a opciones</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Tipo de Inmueble *
                    </label>
                    <select
                      value={formData.tipo_inmueble}
                      onChange={(e) => setFormData({ ...formData, tipo_inmueble: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-white/15 text-white text-sm focus:ring-2 focus:ring-[#E60000]/50 focus:border-[#E60000] outline-none cursor-pointer"
                    >
                      <option value="Casa" className="bg-[#1A1A1A] text-white">Casa / Residencia</option>
                      <option value="Departamento" className="bg-[#1A1A1A] text-white">Departamento</option>
                      <option value="Terreno" className="bg-[#1A1A1A] text-white">Terreno / Lote</option>
                      <option value="Finca / Quinta" className="bg-[#1A1A1A] text-white">Finca / Viñedo / Quinta</option>
                      <option value="Oficina Comercial" className="bg-[#1A1A1A] text-white">Oficina / Local Comercial</option>
                    </select>
                  </div>
                </div>

                {/* Presupuesto Estimado */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Presupuesto Estimado ($us)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. $us 50,000 - $us 100,000"
                    value={formData.presupuesto || ''}
                    onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-white/15 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-[#E60000]/50 focus:border-[#E60000] outline-none transition"
                  />
                </div>

                {/* Mensaje / Detalles */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Detalles o requerimientos adicionales (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos qué características buscas (ej. con jardín, agua de riego, número de dormitorios, etc.)"
                    value={formData.mensaje || ''}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#202020] border border-white/15 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-[#E60000]/50 focus:border-[#E60000] outline-none transition"
                  />
                </div>

                {/* Checkbox Aceptación */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 text-[#E60000] bg-[#202020] border-white/20 rounded focus:ring-[#E60000]"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer">
                    Acepto ser contactado por un asesor inmobiliario de KAIZEN para recibir propuestas personalizadas.
                  </label>
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E60000] hover:bg-[#FF1A1A] text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando solicitud...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Solicitar Asesoría Inmobiliaria Gratuita</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
