'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Phone, Mail, UserCheck, Loader2 } from 'lucide-react';
import { Agente } from '@/types/database';
import { getAgentes, supabase, isSupabaseConfigured } from '@/lib/supabase';
import CloudinaryUploader from '@/components/CloudinaryUploader';

function generateSlug(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export default function AdminAgentesPage() {
  const [agentes, setAgentes] = useState<Agente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    agent_name: '',
    cargo: 'Asesor Inmobiliario',
    telefono: '+591 ',
    correo: '',
    foto_principal: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAgentes();
      setAgentes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agent_name || !formData.telefono) {
      alert('Nombre y teléfono son obligatorios');
      return;
    }

    setSaving(true);
    try {
      const slug = generateSlug(formData.agent_name);
      const newAgentPayload = {
        agent_name: formData.agent_name,
        slug,
        cargo: formData.cargo,
        telefono: formData.telefono,
        correo: formData.correo || null,
        foto_principal: formData.foto_principal || null,
      };

      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('agentes').insert([newAgentPayload]).select();
        if (error) throw error;
        if (data) setAgentes((prev) => [...prev, ...(data as Agente[])]);
      } else {
        const fallbackAgente: Agente = {
          id: String(Date.now()),
          ...newAgentPayload,
        };
        setAgentes((prev) => [...prev, fallbackAgente]);
      }

      setShowModal(false);
      setFormData({
        agent_name: '',
        cargo: 'Asesor Inmobiliario',
        telefono: '+591 ',
        correo: '',
        foto_principal: '',
      });
      alert('¡Agente agregado con éxito!');
    } catch (err: any) {
      alert('Error agregando agente: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar al asesor "${name}"?`)) return;
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('agentes').delete().eq('id', id);
        if (error) throw error;
      }
      setAgentes((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert('Error eliminando: ' + err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Gestión de Agentes y Asesores
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Cada asesor asignado recibe mensajes directos en su propio número de WhatsApp
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#001E6C] hover:bg-[#1c39bb] text-white font-bold px-4 py-2.5 rounded-xl shadow transition text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Asesor</span>
        </button>
      </div>

      {/* Grid de Agentes */}
      {loading ? (
        <div className="py-20 flex items-center justify-center text-gray-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#1c39bb]" />
          <span className="text-sm">Cargando asesores...</span>
        </div>
      ) : agentes.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-gray-500">
          No hay agentes registrados aún.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agentes.map((agente) => (
            <div
              key={agente.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between items-center text-center space-y-4 relative group"
            >
              <button
                onClick={() => handleDelete(agente.id, agente.agent_name)}
                className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition"
                title="Eliminar agente"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 shadow-md">
                <Image
                  src={
                    agente.foto_principal ||
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
                  }
                  alt={agente.agent_name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-gray-900">{agente.agent_name}</h3>
                <p className="text-xs font-semibold text-[#1c39bb]">{agente.cargo || 'Asesor'}</p>
              </div>

              <div className="w-full space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-center justify-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#1c39bb]" />
                  <span>{agente.telefono}</span>
                </div>
                {agente.correo && (
                  <div className="flex items-center justify-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#1c39bb]" />
                    <span className="truncate">{agente.correo}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Nuevo Agente */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-black text-lg text-gray-900">Registrar Asesor</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Valeria Rios"
                  value={formData.agent_name}
                  onChange={(e) => setFormData({ ...formData, agent_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Cargo / Especialidad</label>
                <input
                  type="text"
                  placeholder="Ej. Asesora Senior de Inversiones"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="+591 70000000"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="asesor@kaizen.com"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <CloudinaryUploader
                  images={formData.foto_principal ? [formData.foto_principal] : []}
                  onChange={(urls) => setFormData({ ...formData, foto_principal: urls[0] || '' })}
                  multiple={false}
                  label="Foto de Perfil (Cloudinary)"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border text-gray-600 font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#001E6C] hover:bg-[#1c39bb] text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Guardar Asesor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
