'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Inmueble } from '@/types/database';
import { getInmuebles } from '@/lib/supabase';
import InmuebleCard from '@/components/InmuebleCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export default function CompraPage() {
  const params = useParams();
  const currentPage = Number(params?.page) || 1;

  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInmuebles({ categoriaSlug: 'venta' });
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
    <div className="space-y-12 pb-20 pt-20 bg-white">
      
      {/* Banner de Categoría */}
      <div className="relative min-h-[300px] w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
          alt="Inmuebles en Venta"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 space-y-2 py-12">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Catálogo Oficial KAIZEN
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase">
            Inmuebles en Venta
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Propiedades residenciales, comerciales y terrenos con títulos de propiedad verificados.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-8">
        {/* Header con Contador */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
          <div>
            <h2 className="font-headline-md text-xl font-bold text-[#1A1A1A]">
              Propiedades Disponibles ({inmuebles.length})
            </h2>
            <p className="text-xs text-gray-500">Página {currentPage} de {totalPages}</p>
          </div>
          <Link
            href="/busqueda?categoria=venta"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E60000] hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>Ver resultados en mapa interactivo</span>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#E60000]" />
            <p className="text-xs text-gray-500">Cargando propiedades en venta...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#F7F7F7] rounded-xl border border-gray-200">
            <p className="font-headline-sm text-base text-gray-600 font-semibold">
              No hay inmuebles disponibles en esta sección actualmente.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#1A1A1A] text-white text-xs font-bold px-6 py-2.5 rounded hover:bg-[#E60000] transition"
            >
              Volver al Inicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((inmueble) => (
              <InmuebleCard key={inmueble.id} inmueble={inmueble} />
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pt-8 flex justify-center items-center gap-2">
            <Link
              href={`/compra/page/${Math.max(1, currentPage - 1)}`}
              className={`p-2.5 rounded border border-gray-200 text-xs font-bold flex items-center gap-1 ${
                currentPage === 1
                  ? 'pointer-events-none opacity-40 bg-gray-100 text-gray-400'
                  : 'bg-white text-[#1A1A1A] hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Link>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/compra/page/${p}`}
                  className={`w-9 h-9 rounded flex items-center justify-center text-xs font-bold transition ${
                    p === currentPage
                      ? 'bg-[#E60000] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-[#1A1A1A] hover:bg-gray-50'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>

            <Link
              href={`/compra/page/${Math.min(totalPages, currentPage + 1)}`}
              className={`p-2.5 rounded border border-gray-200 text-xs font-bold flex items-center gap-1 ${
                currentPage === totalPages
                  ? 'pointer-events-none opacity-40 bg-gray-100 text-gray-400'
                  : 'bg-white text-[#1A1A1A] hover:bg-gray-50'
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
