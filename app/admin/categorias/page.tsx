'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, Loader2, Tags } from 'lucide-react';
import { Categoria } from '@/types/database';
import { getCategorias, supabase, isSupabaseConfigured } from '@/lib/supabase';

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

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCategorias();
      setCategorias(data);
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
    if (!nombre.trim()) return;

    setSaving(true);
    try {
      const slug = generateSlug(nombre);
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('categorias')
          .insert([{ nombre_categoria: nombre, slug }])
          .select();
        if (error) throw error;
        if (data) setCategorias((prev) => [...prev, ...data]);
      } else {
        const newCat: Categoria = {
          id: String(Date.now()),
          nombre_categoria: nombre,
          slug,
        };
        setCategorias((prev) => [...prev, newCat]);
      }

      setNombre('');
      alert('Categoría creada con éxito');
    } catch (err: any) {
      alert('Error creando categoría: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`¿Eliminar la categoría "${catName}"?`)) return;
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('categorias').delete().eq('id', id);
        if (error) throw error;
      }
      setCategorias((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert('Error eliminando categoría: ' + err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      
      <div>
        <h1 className="text-2xl font-black text-gray-900">
          Gestor de Categorías
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Define los tipos de operaciones (Venta, Alquiler, Anticrético, etc.)
        </p>
      </div>

      {/* Formulario Crear */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Nombre de la Nueva Categoría
          </label>
          <input
            type="text"
            required
            placeholder="Ej. Remate Judicial / Preventa"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto bg-[#001E6C] hover:bg-[#1c39bb] text-white font-bold px-6 py-2.5 rounded-xl shadow transition text-sm flex items-center justify-center gap-2 shrink-0"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>Agregar Categoría</span>
        </button>
      </form>

      {/* Listado */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center text-gray-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xs">Cargando categorías...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-[11px] border-b border-gray-200">
              <tr>
                <th className="p-4">Nombre de Categoría</th>
                <th className="p-4">Slug Identificador</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categorias.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-bold text-gray-900 text-sm">{cat.nombre_categoria}</td>
                  <td className="p-4 font-mono text-gray-500">{cat.slug}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id, cat.nombre_categoria)}
                      className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                      title="Eliminar categoría"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
