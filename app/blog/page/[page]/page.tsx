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
    <div className="space-y-12 pb-20 pt-20 bg-white">
      
      {/* Banner */}
      <div className="relative min-h-[300px] w-full overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80"
          alt="Blog Inmobiliario KAIZEN"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 space-y-2 py-12">
          <span className="text-xs uppercase font-bold tracking-widest text-red-300 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Artículos & Novedades
          </span>
          <h1 className="font-headline-md text-3xl sm:text-5xl font-black uppercase">
            Blog Inmobiliario
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Noticias, tendencias de plusvalía y consejos de expertos en bienes raíces.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-8">
        
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
              <div
                key={blog.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover-lift flex flex-col group"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={blog.portada || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80'}
                    alt={blog.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E60000]" />
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
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{blog.agente.agent_name}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-headline-md text-lg font-bold text-[#1A1A1A] group-hover:text-[#E60000] transition line-clamp-2">
                    {blog.titulo}
                  </h3>

                  <p className="font-body-md text-xs text-gray-600 line-clamp-3 leading-relaxed flex-grow">
                    {blog.contenido}
                  </p>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E60000] group-hover:underline flex items-center gap-1">
                      <span>Leer artículo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
