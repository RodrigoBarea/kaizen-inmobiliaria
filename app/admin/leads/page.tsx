'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, DollarSign, CheckCircle2, Loader2, Inbox, Sparkles, UserCheck, MessageSquare, Building2, Trees } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { LeadVender, SolicitudAsesoria } from '@/types/database';
import { getLeads, getSolicitudesAsesoria, updateSolicitudAsesoria, supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState<'asesoria' | 'vender'>('asesoria');
  const [leadsVender, setLeadsVender] = useState<LeadVender[]>([]);
  const [solicitudesAsesoria, setSolicitudesAsesoria] = useState<SolicitudAsesoria[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [venderData, asesoriaData] = await Promise.all([
        getLeads(),
        getSolicitudesAsesoria(),
      ]);
      setLeadsVender(venderData);
      setSolicitudesAsesoria(asesoriaData);
    } catch (err) {
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleAtendidoVender = async (id: string, currentVal: boolean) => {
    if (isSupabaseConfigured) {
      await supabase.from('leads_vender').update({ atendido: !currentVal }).eq('id', id);
    }
    setLeadsVender((prev) =>
      prev.map((l) => (l.id === id ? { ...l, atendido: !currentVal } : l))
    );
  };

  const handleToggleAtendidoAsesoria = async (id: string, currentVal: boolean) => {
    await updateSolicitudAsesoria(id, { atendido: !currentVal });
    setSolicitudesAsesoria((prev) =>
      prev.map((s) => (s.id === id ? { ...s, atendido: !currentVal } : s))
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Centro de Contactos & Asesorías
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Gestiona solicitudes de asesoría (comprar, vender, anticrético) y captaciones de propiedades
          </p>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('asesoria')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'asesoria'
                ? 'bg-white text-[#E60000] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asesorías de Clientes ({solicitudesAsesoria.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vender')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'vender'
                ? 'bg-white text-[#E60000] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Captaciones de Venta ({leadsVender.length})</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#E60000]" />
          <span className="text-sm font-semibold">Cargando solicitudes...</span>
        </div>
      ) : activeTab === 'asesoria' ? (
        
        /* Listado de Asesorías */
        solicitudesAsesoria.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl border border-gray-200 text-center text-gray-500 space-y-2">
            <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-800 text-base">No hay solicitudes de asesoría pendientes</h3>
            <p className="text-xs text-gray-400">Las personas que completen el formulario de portada aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitudesAsesoria.map((s) => (
              <div
                key={s.id}
                className={`bg-white p-6 rounded-3xl border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition ${
                  s.atendido ? 'border-gray-200 opacity-75' : 'border-red-200 bg-red-50/20'
                }`}
              >
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base text-gray-900">{s.nombre}</h3>
                    
                    <span className="bg-[#E60000] text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                      {s.interes}
                    </span>

                    <span className="bg-gray-100 text-gray-800 font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                      {s.tipo_inmueble}
                    </span>

                    <span className={`font-semibold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      s.zona_interes.includes('Rural')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-50 text-blue-800'
                    }`}>
                      {s.zona_interes.includes('Rural') ? <Trees className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {s.zona_interes}
                    </span>

                    {s.atendido && (
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                        Atendido
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1 font-mono font-semibold text-gray-800">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {s.telefono}
                    </span>
                    {s.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {s.email}
                      </span>
                    )}
                    {s.presupuesto && (
                      <span className="flex items-center gap-1 font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        Presupuesto: {s.presupuesto}
                      </span>
                    )}
                  </div>

                  {s.mensaje && (
                    <p className="text-xs text-gray-700 bg-white p-3 rounded-2xl border border-gray-200 mt-2 leading-relaxed">
                      💬 <strong className="text-gray-900">Mensaje:</strong> "{s.mensaje}"
                    </p>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={`https://wa.me/${s.telefono.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                      `Hola ${s.nombre}, te contactamos de KAIZEN Bienes Raíces Tarija respecto a tu solicitud de asesoría para ${s.interes.toLowerCase()} (${s.tipo_inmueble} en ${s.zona_interes}). ¿Cómo podemos ayudarte?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow"
                  >
                    <FaWhatsapp className="text-base" />
                    <span>Contactar por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => handleToggleAtendidoAsesoria(s.id || '', Boolean(s.atendido))}
                    className="px-3.5 py-2.5 border border-gray-300 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 transition"
                  >
                    {s.atendido ? 'Marcar pendiente' : 'Marcar atendido'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )

      ) : (
        
        /* Listado de Captaciones (Venta de Inmuebles) */
        leadsVender.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl border border-gray-200 text-center text-gray-500 space-y-2">
            <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-800 text-base">No hay solicitudes de venta de propietarios</h3>
            <p className="text-xs text-gray-400">Los dueños que deseen comercializar su inmueble aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leadsVender.map((lead) => (
              <div
                key={lead.id}
                className={`bg-white p-6 rounded-3xl border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition ${
                  lead.atendido ? 'border-gray-200 opacity-75' : 'border-red-200 bg-red-50/20'
                }`}
              >
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base text-gray-900">{lead.nombre}</h3>
                    <span className="bg-red-100 text-[#E60000] font-bold text-xs px-2.5 py-0.5 rounded-full">
                      {lead.tipo_inmueble}
                    </span>
                    {lead.atendido && (
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2 py-0.5 rounded-full">
                        Atendido
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {lead.ubicacion}
                    </span>
                    {lead.precio_estimado && (
                      <span className="flex items-center gap-1 font-bold text-gray-800">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        Estimado: ${Number(lead.precio_estimado).toLocaleString()} USD
                      </span>
                    )}
                    {lead.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {lead.email}
                      </span>
                    )}
                  </div>

                  {lead.detalles && (
                    <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mt-2">
                      {lead.detalles}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={`https://wa.me/${lead.telefono.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hola ${lead.nombre}, te contactamos de Kaizen Inmobiliaria respecto a tu solicitud de venta.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow"
                  >
                    <FaWhatsapp className="text-base" />
                    <span>Contactar</span>
                  </a>

                  <button
                    onClick={() => handleToggleAtendidoVender(lead.id || '', Boolean(lead.atendido))}
                    className="px-3.5 py-2.5 border border-gray-300 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700"
                  >
                    {lead.atendido ? 'Marcar pendiente' : 'Marcar atendido'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )

      )}

    </div>
  );
}
