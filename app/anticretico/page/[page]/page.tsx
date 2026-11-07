'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Inmueble } from '@/types/database';
import { getInmuebles } from '@/lib/supabase';
import InmuebleCard from '@/components/InmuebleCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export default function AnticreticoPage() {
  const params = useParams();
  const currentPage = Number(params?.page) || 1;

  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInmuebles({ categoriaSlug: 'anticretico' });
        setInmuebles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalPages = Math.ceil(inmuebles.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = inmuebles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Luminous Editorial Header inspirado en LuxuryEstate */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-surface-stone border border-border-hairline px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              Catálogo Oficial · Anticrético
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Inmuebles en anticrético en Tarija
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Casas y departamentos en anticresis con contrato legal verificado, inscripción en Derechos Reales y máxima seguridad jurídica.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 space-y-8">
        
        {/* Header con Contador y Enlace al Mapa */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border-hairline">
          <div>
            <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
              Propiedades en anticrético ({inmuebles.length})
            </h2>
            <p className="text-xs text-text-muted">Página {currentPage} de {totalPages}</p>
          </div>
          <Link
            href="/busqueda?categoria=anticretico"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-kaizen-red bg-surface-stone border border-border-hairline px-3 py-1.5 rounded-[2px] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>Ver resultados en mapa interactivo</span>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-xs text-text-muted">Cargando propiedades en anticrético...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-surface-canvas rounded-[2px] border border-border-hairline">
            <p className="font-headline-sm text-base text-text-muted font-semibold">
              No hay inmuebles en anticrético disponibles actualmente.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-[2px] hover:bg-kaizen-red transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((inmueble) => (
              <InmuebleCard key={inmueble.id} inmueble={inmueble} />
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pt-8 flex justify-center items-center gap-2">
            <Link
              href={`/anticretico/page/${Math.max(1, currentPage - 1)}`}
              className={`p-2.5 rounded-[2px] border border-border-hairline text-xs font-semibold flex items-center gap-1 transition-colors ${
                currentPage === 1
                  ? 'pointer-events-none opacity-40 bg-surface-canvas text-text-muted'
                  : 'bg-surface-stone text-primary hover:bg-surface-canvas'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Link>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/anticretico/page/${p}`}
                  className={`w-9 h-9 rounded-[2px] flex items-center justify-center text-xs font-semibold transition-colors ${
                    p === currentPage
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-stone border border-border-hairline text-primary hover:bg-surface-canvas'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>

            <Link
              href={`/anticretico/page/${Math.min(totalPages, currentPage + 1)}`}
              className={`p-2.5 rounded-[2px] border border-border-hairline text-xs font-semibold flex items-center gap-1 transition-colors ${
                currentPage === totalPages
                  ? 'pointer-events-none opacity-40 bg-surface-canvas text-text-muted'
                  : 'bg-surface-stone text-primary hover:bg-surface-canvas'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
