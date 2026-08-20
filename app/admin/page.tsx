'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getInmuebles, getCategorias, getAgentes, getBlogs, getLeads, getMetricas, updateMetricas } from '@/lib/supabase';
import { Inmueble, MetricasEmpresa } from '@/types/database';
import { Building2, Trees, Timer, ShieldCheck, Check, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalInmuebles: 0,
    destacados: 0,
    categorias: 0,
    agentes: 0,
    blogs: 0,
    leads: 0,
  });
  const [recentInmuebles, setRecentInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);

  // Editable Public Metrics State
  const [metricas, setMetricas] = useState<MetricasEmpresa | null>(null);
  const [savingMetricas, setSavingMetricas] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [inmuebles, categorias, agentes, blogs, leads, metricasData] = await Promise.all([
          getInmuebles({ limit: 100 }),
          getCategorias(),
          getAgentes(),
          getBlogs(),
          getLeads(),
          getMetricas(),
        ]);

        setStats({
          totalInmuebles: inmuebles.length,
          destacados: inmuebles.filter((i: Inmueble) => i.is_featured).length,
          categorias: categorias.length,
          agentes: agentes.length,
          blogs: blogs.length,
          leads: leads.length,
        });

        setRecentInmuebles(inmuebles.slice(0, 5));
        setMetricas(metricasData);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveMetricas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!metricas) return;

    setSavingMetricas(true);
    setSavedSuccess(false);
    try {
      await updateMetricas(metricas);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Error al guardar métricas');
      console.error(err);
    } finally {
      setSavingMetricas(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="font-headline-md text-2xl sm:text-3xl font-black text-gray-900">
          Resumen General
        </h1>
        <p className="font-body-md text-xs sm:text-sm text-gray-500 mt-1">
          Métricas clave, actividad reciente y datos de impacto público de KAIZEN.
        </p>
      </div>

      {/* Metric Cards (Platform Internal Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E60000] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">apartment</span>
            </div>
            <span className="bg-red-100 text-[#E60000] font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> Activos
            </span>
          </div>
          <h3 className="text-xs font-bold text-gray-500 mb-1">Total Inmuebles</h3>
          <p className="text-3xl font-black text-gray-900 font-mono">
            {loading ? '...' : stats.totalInmuebles}
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E60000] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">forum</span>
            </div>
            <span className="bg-gray-100 text-gray-700 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              Recientes
            </span>
          </div>
          <h3 className="text-xs font-bold text-gray-500 mb-1">Solicitudes / Leads</h3>
          <p className="text-3xl font-black text-gray-900 font-mono">
            {loading ? '...' : stats.leads}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">grade</span>
            </div>
            <span className="bg-amber-100 text-amber-800 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              Top
            </span>
          </div>
          <h3 className="text-xs font-bold text-gray-500 mb-1">Inmuebles Destacados</h3>
          <p className="text-3xl font-black text-gray-900 font-mono">
            {loading ? '...' : stats.destacados}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">real_estate_agent</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              Asesores
            </span>
          </div>
          <h3 className="text-xs font-bold text-gray-500 mb-1">Equipo Comercial</h3>
          <p className="text-3xl font-black text-gray-900 font-mono">
            {loading ? '...' : stats.agentes}
          </p>
        </div>

      </div>

      {/* Editor de Datos Relevantes Públicos (Portada) */}
      {metricas && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#E60000] text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                <span>Edición en Vivo para la Portada</span>
              </div>
              <h2 className="text-lg font-black text-gray-900">
                Sección: Datos Relevantes de Portada (4 Bloques)
              </h2>
              <p className="text-xs text-gray-500">
                Edita los contadores y subtítulos que se muestran a los visitantes en la pantalla principal.
              </p>
            </div>

            {savedSuccess && (
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl animate-fade-in">
                <Check className="w-4 h-4" />
                <span>¡Métricas actualizadas en la base de datos!</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSaveMetricas} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Bloque 1 */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
                <div className="flex items-center gap-2 text-[#E60000] font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                  <span>Bloque 1 (+180)</span>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Contador</label>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-gray-500">+</span>
                    <input
                      type="number"
                      value={metricas.propiedades_transaccionadas}
                      onChange={(e) => setMetricas({ ...metricas, propiedades_transaccionadas: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#E60000]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Etiqueta</label>
                  <input
                    type="text"
                    value={metricas.propiedades_transaccionadas_label}
                    onChange={(e) => setMetricas({ ...metricas, propiedades_transaccionadas_label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Subtítulo Contexto</label>
                  <input
                    type="text"
                    value={metricas.propiedades_transaccionadas_sub}
                    onChange={(e) => setMetricas({ ...metricas, propiedades_transaccionadas_sub: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
              </div>

              {/* Bloque 2 */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <Trees className="w-4 h-4" />
                  <span>Bloque 2 (+60 Ha)</span>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Hectáreas (Ha)</label>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-gray-500">+</span>
                    <input
                      type="number"
                      value={metricas.hectareas_gestionadas}
                      onChange={(e) => setMetricas({ ...metricas, hectareas_gestionadas: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#E60000]"
                    />
                    <span className="font-bold text-xs text-gray-500">Ha</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Etiqueta</label>
                  <input
                    type="text"
                    value={metricas.hectareas_gestionadas_label}
                    onChange={(e) => setMetricas({ ...metricas, hectareas_gestionadas_label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Subtítulo Contexto</label>
                  <input
                    type="text"
                    value={metricas.hectareas_gestionadas_sub}
                    onChange={(e) => setMetricas({ ...metricas, hectareas_gestionadas_sub: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
              </div>

              {/* Bloque 3 */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                  <Timer className="w-4 h-4" />
                  <span>Bloque 3 (35 Días)</span>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Días Promedio</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={metricas.dias_promedio_colocacion}
                      onChange={(e) => setMetricas({ ...metricas, dias_promedio_colocacion: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#E60000]"
                    />
                    <span className="font-bold text-xs text-gray-500">Días</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Etiqueta</label>
                  <input
                    type="text"
                    value={metricas.dias_promedio_colocacion_label}
                    onChange={(e) => setMetricas({ ...metricas, dias_promedio_colocacion_label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Subtítulo Contexto</label>
                  <input
                    type="text"
                    value={metricas.dias_promedio_colocacion_sub}
                    onChange={(e) => setMetricas({ ...metricas, dias_promedio_colocacion_sub: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
              </div>

              {/* Bloque 4 */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Bloque 4 (100%)</span>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Porcentaje (%)</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={metricas.seguridad_juridica_porcentaje}
                      onChange={(e) => setMetricas({ ...metricas, seguridad_juridica_porcentaje: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#E60000]"
                    />
                    <span className="font-bold text-xs text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Etiqueta</label>
                  <input
                    type="text"
                    value={metricas.seguridad_juridica_label}
                    onChange={(e) => setMetricas({ ...metricas, seguridad_juridica_label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Subtítulo Contexto</label>
                  <input
                    type="text"
                    value={metricas.seguridad_juridica_sub}
                    onChange={(e) => setMetricas({ ...metricas, seguridad_juridica_sub: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-800 focus:ring-2 focus:ring-[#E60000]"
                  />
                </div>
              </div>

            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingMetricas}
                className="bg-[#E60000] hover:bg-[#C00000] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2"
              >
                {savingMetricas ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando en base de datos...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Guardar Cambios de Métricas</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Quick Action Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Inmuebles */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-base font-black text-gray-900">
              Últimos Inmuebles Registrados
            </h2>
            <Link
              href="/admin/inmuebles"
              className="text-xs font-bold text-[#E60000] hover:underline"
            >
              Ver todos →
            </Link>
          </div>

          <div className="space-y-3">
            {recentInmuebles.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200/80 hover:bg-gray-100/60 transition"
              >
                <div className="min-w-0 flex-1 pr-4">
                  <h4 className="font-bold text-sm text-gray-900 truncate">
                    {i.inmueble_name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {i.direccion}, {i.ciudad} • {i.tipo}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-black text-gray-900">
                    ${Number(i.precio).toLocaleString()}
                  </span>
                  <Link
                    href={`/admin/inmuebles/editar/${i.id}`}
                    className="text-xs text-gray-600 hover:text-[#E60000] font-semibold px-2.5 py-1 rounded-lg border border-gray-300 bg-white"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-black text-gray-900 pb-4 border-b border-gray-100">
            Accesos Rápidos
          </h2>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/admin/inmuebles/nuevo"
              className="flex items-center gap-3 p-3 rounded-xl bg-red-50 text-[#E60000] font-bold hover:bg-red-100 transition text-xs"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>Publicar Nuevo Inmueble</span>
            </Link>

            <Link
              href="/admin/agentes"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-xs font-semibold text-gray-800"
            >
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>Registrar Asesor</span>
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-xs font-semibold text-gray-800"
            >
              <span className="material-symbols-outlined text-lg">post_add</span>
              <span>Redactar Artículo de Blog</span>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-xs font-semibold text-gray-800"
            >
              <span className="material-symbols-outlined text-lg">mark_email_unread</span>
              <span>Revisar Solicitudes de Dueños</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
