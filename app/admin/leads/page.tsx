'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, DollarSign, CheckCircle2, Loader2, Inbox } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { LeadVender } from '@/types/database';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const MOCK_LEADS: LeadVender[] = [
  {
    id: '1',
    nombre: 'Gonzalo Fernández',
    telefono: '+591 71234567',
    email: 'gonzalo@gmail.com',
    tipo_inmueble: 'Casa',
    ubicacion: 'Tarija, Barrio Senac',
    precio_estimado: 160000,
    detalles: 'Casa de 2 plantas con garaje para 2 autos, 4 habitaciones y patio amplio.',
    atendido: false,
    created_at: new Date().toISOString(),
  },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadVender[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('leads_vender')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setLeads(data || []);
      } else {
        setLeads(MOCK_LEADS);
      }
    } catch (err) {
      console.error(err);
      setLeads(MOCK_LEADS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleAtendido = async (id: string, currentVal: boolean) => {
    if (isSupabaseConfigured) {
      await supabase.from('leads_vender').update({ atendido: !currentVal }).eq('id', id);
    }
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, atendido: !currentVal } : l))
    );
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      <div>
        <h1 className="text-2xl font-black text-gray-900">
          Solicitudes de Propietarios (Venta)
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Personas que completaron el formulario para comercializar su inmueble
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center text-gray-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#1c39bb]" />
          <span className="text-sm">Cargando solicitudes...</span>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center text-gray-500">
          No hay solicitudes de venta pendientes.
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`bg-white p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition ${
                lead.atendido ? 'border-gray-200 opacity-75' : 'border-blue-200 bg-blue-50/20'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-extrabold text-base text-gray-900">{lead.nombre}</h3>
                  <span className="bg-blue-100 text-[#001E6C] font-bold text-xs px-2.5 py-0.5 rounded-full">
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
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  <FaWhatsapp className="text-base" />
                  <span>Contactar</span>
                </a>

                <button
                  onClick={() => handleToggleAtendido(lead.id, Boolean(lead.atendido))}
                  className="px-3.5 py-2.5 border border-gray-300 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700"
                >
                  {lead.atendido ? 'Marcar pendiente' : 'Marcar atendido'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
