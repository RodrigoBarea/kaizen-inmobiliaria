'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types/database';
import { getBlogs } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, Loader2, Calendar, User, ArrowRight } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const params = useParams();
  const currentPage = Number(params?.page) || 1;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Luminous Editorial Header inspirado en LuxuryEstate */}
      <div className="bg-surface-canvas border-b border-border-hairline py-12 sm:py-16">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-primary bg-surface-stone border border-border-hairline px-3 py-1 rounded-[2px] mb-3 shadow-sm">
              Artículos y Publicaciones · KAIZEN
            </span>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
              Blog inmobiliario de Tarija
            </h1>
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Información sobre el mercado inmobiliario en Tarija, trámites legales y recomendaciones para compradores y propietarios.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 space-y-8">
        
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#E60000]" />
            <p className="text-xs text-gray-500">Cargando artículos...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#F7F7F7] rounded-xl border border-gray-200">
            <p className="font-headline-sm text-base text-gray-600 font-semibold">
              No hay publicaciones de blog disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-white rounded-[2px] border border-border-hairline overflow-hidden shadow-sm flex flex-col group transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-surface-canvas">
                  <Image
                    src={blog.portada || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80'}
                    alt={blog.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {new Date(blog.created_at || new Date().toISOString()).toLocaleDateString('es-ES', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                    {blog.agente && (
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-text-muted" />
                        <span>{blog.agente.agent_name}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-headline-sm text-base font-bold text-primary group-hover:text-kaizen-red transition-colors line-clamp-2">
                    {blog.titulo}
                  </h3>

                  <p className="font-body-md text-xs text-text-muted line-clamp-3 leading-relaxed flex-grow">
                    {blog.contenido}
                  </p>

                  <div className="pt-3 border-t border-border-hairline flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary group-hover:text-kaizen-red flex items-center gap-1 transition-colors">
                      <span>Leer artículo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
