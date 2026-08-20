'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { Inmueble } from '@/types/database';
import { getInmuebles, supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminInmueblesPage() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('Todos');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getInmuebles({ activeOnly: false });
      setInmuebles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleActive = async (id: string, currentVal: boolean) => {
    if (isSupabaseConfigured) {
      await supabase.from('inmuebles').update({ active: !currentVal }).eq('id', id);
    }
    setInmuebles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !currentVal } : item))
    );
  };

  const handleToggleFeatured = async (id: string, currentVal: boolean) => {
    if (isSupabaseConfigured) {
      await supabase.from('inmuebles').update({ is_featured: !currentVal }).eq('id', id);
    }
    setInmuebles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_featured: !currentVal } : item))
    );
  };

  const handleToggleRural = async (id: string, currentVal: boolean) => {
    if (isSupabaseConfigured) {
      await supabase.from('inmuebles').update({ is_rural: !currentVal }).eq('id', id);
    }
    setInmuebles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_rural: !currentVal } : item))
    );
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el inmueble "${name}"?`)) return;

    if (isSupabaseConfigured) {
      const { error } = await supabase.from('inmuebles').delete().eq('id', id);
      if (error) {
        alert('Error eliminando de la base de datos: ' + error.message);
        return;
      }
    }
    setInmuebles((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = inmuebles.filter((i) => {
    const matchesSearch =
      i.inmueble_name.toLowerCase().includes(search.toLowerCase()) ||
      i.direccion.toLowerCase().includes(search.toLowerCase());
    const matchesCity = filterCity === 'Todos' || i.ciudad === filterCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Gestión de Inmuebles
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Administra, publica y sincroniza propiedades con Supabase y Cloudinary
          </p>
        </div>

        <Link
          href="/admin/inmuebles/nuevo"
          className="inline-flex items-center gap-2 bg-[#E60000] hover:bg-[#C00000] text-white font-bold px-4 py-2.5 rounded-xl shadow transition text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Inmueble</span>
        </Link>
      </div>

      {/* Barra de Filtro y Buscador */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título o dirección..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#E60000] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-500 font-medium">Ciudad:</span>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none bg-white"
          >
            <option value="Todos">Toda Tarija</option>
            <option value="Tarija">Tarija (Cercado)</option>
            <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
            <option value="Uriondo">Uriondo / El Valle</option>
            <option value="Bermejo">Bermejo</option>
            <option value="Yacuiba">Yacuiba</option>
            <option value="Villa Montes">Villa Montes</option>
          </select>
        </div>
      </div>

      {/* Tabla de Inmuebles */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center text-gray-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#E60000]" />
            <span className="text-sm">Cargando base de datos...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            No se encontraron inmuebles registrados con estos criterios.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-[11px] border-b border-gray-200">
                <tr>
                  <th className="p-4">Foto & Inmueble</th>
                  <th className="p-4">Tipo & Ciudad</th>
                  <th className="p-4">Precio (USD)</th>
                  <th className="p-4">Operación</th>
                  <th className="p-4 text-center">Destacado</th>
                  <th className="p-4 text-center">Área Rural</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((i) => (
                  <tr key={i.id} className="hover:bg-gray-50/60 transition">
                    
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border">
                          <Image
                            src={
                              i.imagenes?.[0] ||
                              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&auto=format&fit=crop&q=80'
                            }
                            alt={i.inmueble_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 line-clamp-1 block text-sm">
                            {i.inmueble_name}
                          </span>
                          <span className="text-[11px] text-gray-400 flex items-center gap-1 line-clamp-1">
                            <MapPin className="w-3 h-3 text-red-400" />
                            {i.direccion}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-gray-800">
                      {i.tipo}
                      <span className="block text-[11px] text-gray-400 font-normal">{i.ciudad}</span>
                    </td>

                    <td className="p-4 font-black text-[#1A1A1A] text-sm">
                      ${Number(i.precio).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span className="bg-red-50 text-[#E60000] font-bold px-2.5 py-1 rounded-full text-[11px] border border-red-100">
                        {i.categoria?.nombre_categoria || 'Venta'}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(i.id, i.is_featured)}
                        className={`p-1.5 rounded-lg border transition ${
                          i.is_featured
                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                            : 'text-gray-300 hover:text-gray-500 border-gray-200'
                        }`}
                        title={i.is_featured ? 'Quitar de destacados' : 'Marcar como destacado'}
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleRural(i.id, Boolean(i.is_rural))}
                        className={`px-2 py-1 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 mx-auto ${
                          i.is_rural
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'text-gray-300 hover:text-gray-500 border-gray-200'
                        }`}
                        title={i.is_rural ? 'Quitar de Área Rural' : 'Marcar como Área Rural'}
                      >
                        <span>🌿</span>
                        <span>{i.is_rural ? 'Rural' : 'Urbano'}</span>
                      </button>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(i.id, Boolean(i.active !== false))}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full transition ${
                          i.active
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        {i.active ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Activo
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-600" />
                            Pausado
                          </>
                        )}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/inmueble/${i.slug}`}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                          title="Ver en la web"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/inmuebles/editar/${i.id}`}
                          className="p-1.5 text-gray-600 hover:text-[#E60000] rounded-lg hover:bg-gray-100"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(i.id, i.inmueble_name)}
                          className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
