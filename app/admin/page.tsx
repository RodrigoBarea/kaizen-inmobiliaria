'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getInmuebles, getCategorias, getAgentes, getBlogs, getLeads } from '@/lib/supabase';
import { Inmueble } from '@/types/database';

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

  useEffect(() => {
    async function loadData() {
      try {
        const [inmuebles, categorias, agentes, blogs, leads] = await Promise.all([
          getInmuebles({ limit: 100 }),
          getCategorias(),
          getAgentes(),
          getBlogs(),
          getLeads(),
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
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div>
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
          Resumen General
        </h1>
        <p className="font-body-md text-body-md text-secondary mt-1">
          Métricas clave y actividad reciente de la plataforma KAIZEN.
        </p>
      </div>

      {/* Metric Cards (Stitch 4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-lg border border-surface-variant p-6 hover-lift">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-2xl">apartment</span>
            </div>
            <span className="bg-tertiary-container text-on-tertiary-container font-caption text-caption px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> Activos
            </span>
          </div>
          <h3 className="font-label-md text-label-md text-secondary mb-1">Total Inmuebles</h3>
          <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">
            {loading ? '...' : stats.totalInmuebles}
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-lg border border-surface-variant p-6 hover-lift">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">forum</span>
            </div>
            <span className="bg-surface-container-high text-on-surface-variant font-caption text-caption px-2 py-1 rounded-full flex items-center gap-1">
              Recientes
            </span>
          </div>
          <h3 className="font-label-md text-label-md text-secondary mb-1">Solicitudes / Leads</h3>
          <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">
            {loading ? '...' : stats.leads}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-lg border border-surface-variant p-6 hover-lift">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-2xl">grade</span>
            </div>
            <span className="bg-primary text-white font-caption text-caption px-2 py-1 rounded-full flex items-center gap-1">
              Top
            </span>
          </div>
          <h3 className="font-label-md text-label-md text-secondary mb-1">Inmuebles Destacados</h3>
          <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">
            {loading ? '...' : stats.destacados}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest rounded-lg border border-surface-variant p-6 hover-lift">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-2xl">real_estate_agent</span>
            </div>
          </div>
          <h3 className="font-label-md text-label-md text-secondary mb-1">Equipo de Asesores</h3>
          <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">
            {loading ? '...' : stats.agentes}
          </p>
        </div>

      </div>

      {/* Quick Action Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Inmuebles */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-surface-variant rounded-lg p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-surface-variant">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Últimos Inmuebles Registrados
            </h2>
            <Link
              href="/admin/inmuebles"
              className="text-xs font-bold text-primary hover:underline"
            >
              Ver todos →
            </Link>
          </div>

          <div className="space-y-3">
            {recentInmuebles.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-bright border border-surface-variant hover:bg-surface-container-low transition"
              >
                <div className="min-w-0 flex-1 pr-4">
                  <h4 className="font-semibold text-sm text-on-surface truncate">
                    {i.inmueble_name}
                  </h4>
                  <p className="text-xs text-secondary truncate">
                    {i.direccion}, {i.ciudad} • {i.tipo}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold text-primary">
                    ${Number(i.precio).toLocaleString()}
                  </span>
                  <Link
                    href={`/admin/inmuebles/editar/${i.id}`}
                    className="text-xs text-secondary hover:text-on-surface font-semibold p-1.5 rounded border border-surface-variant"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-6 space-y-4">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold pb-4 border-b border-surface-variant">
            Accesos Rápidos
          </h2>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/admin/inmuebles/nuevo"
              className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/15 transition text-sm"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>Publicar Nuevo Inmueble</span>
            </Link>

            <Link
              href="/admin/agentes"
              className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition text-sm font-semibold text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>Registrar Asesor</span>
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition text-sm font-semibold text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">post_add</span>
              <span>Redactar Artículo de Blog</span>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition text-sm font-semibold text-on-surface"
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
