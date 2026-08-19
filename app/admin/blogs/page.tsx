'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Edit, FileText, Loader2, Save } from 'lucide-react';
import { Blog, Agente } from '@/types/database';
import { getBlogs, getAgentes, supabase, isSupabaseConfigured } from '@/lib/supabase';
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

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [agentes, setAgentes] = useState<Agente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    portada: '',
    agente_id: '',
    active: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [bls, ags] = await Promise.all([getBlogs(), getAgentes()]);
      setBlogs(bls);
      setAgentes(ags);
      if (ags.length > 0) setFormData((prev) => ({ ...prev, agente_id: ags[0].id }));
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
    if (!formData.titulo || !formData.contenido) {
      alert('Título y contenido son obligatorios');
      return;
    }

    setSaving(true);
    try {
      const slug = generateSlug(formData.titulo);
      const newBlogPayload = {
        titulo: formData.titulo,
        slug,
        contenido: formData.contenido,
        portada: formData.portada || null,
        agente_id: formData.agente_id || null,
        active: formData.active,
      };

      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('blogs').insert([newBlogPayload]).select();
        if (error) throw error;
        if (data) setBlogs((prev) => [...(data as Blog[]), ...prev]);
      } else {
        const fallbackBlog: Blog = {
          id: String(Date.now()),
          ...newBlogPayload,
        };
        setBlogs((prev) => [fallbackBlog, ...prev]);
      }

      setShowModal(false);
      setFormData({
        titulo: '',
        contenido: '',
        portada: '',
        agente_id: agentes[0]?.id || '',
        active: true,
      });
      alert('¡Artículo publicado con éxito!');
    } catch (err: any) {
      alert('Error guardando blog: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar el artículo "${title}"?`)) return;
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) throw error;
      }
      setBlogs((prev) => prev.filter((b) => b.id !== id));
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
            Gestión de Artículos y Noticias
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Publica guías, análisis de mercado y novedades inmobiliarias
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#001E6C] hover:bg-[#1c39bb] text-white font-bold px-4 py-2.5 rounded-xl shadow transition text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Artículo</span>
        </button>
      </div>

      {/* Grid de Blogs */}
      {loading ? (
        <div className="py-20 flex items-center justify-center text-gray-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#1c39bb]" />
          <span className="text-sm">Cargando blogs...</span>
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-gray-500">
          No hay artículos publicados todavía.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full bg-gray-100">
                  <Image
                    src={
                      blog.portada ||
                      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
                    }
                    alt={blog.titulo}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{blog.titulo}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {blog.contenido}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-3">
                <span className="text-[11px] font-bold text-[#1c39bb]">
                  {blog.agente?.agent_name || 'Kaizen'}
                </span>

                <button
                  onClick={() => handleDelete(blog.id, blog.titulo)}
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                  title="Eliminar artículo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Nuevo Blog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-black text-lg text-gray-900">Redactar Artículo</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Título del Artículo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Claves para invertir en bienes raíces en 2026"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Autor / Asesor</label>
                <select
                  value={formData.agente_id}
                  onChange={(e) => setFormData({ ...formData, agente_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm bg-white"
                >
                  {agentes.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.agent_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Contenido del Artículo *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Escribe el texto completo del artículo..."
                  value={formData.contenido}
                  onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <CloudinaryUploader
                  images={formData.portada ? [formData.portada] : []}
                  onChange={(urls) => setFormData({ ...formData, portada: urls[0] || '' })}
                  multiple={false}
                  label="Foto de Portada (Cloudinary)"
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
                  <span>Publicar Artículo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
