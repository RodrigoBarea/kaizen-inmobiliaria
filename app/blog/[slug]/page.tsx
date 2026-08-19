'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Loader2, Share2 } from 'lucide-react';
import { Blog } from '@/types/database';
import { getBlogBySlug } from '@/lib/supabase';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#1c39bb]" />
        <p className="text-sm font-semibold">Cargando artículo...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Artículo no encontrado</h1>
        <Link
          href="/blog/page/1"
          className="inline-flex items-center gap-2 bg-[#001E6C] text-white px-6 py-2.5 rounded-xl font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-fade-in">
      
      <Link
        href="/blog/page/1"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1c39bb] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a todos los artículos
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {blog.titulo}
        </h1>

        <div className="flex items-center gap-4 text-xs text-gray-500 border-b pb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {blog.created_at ? new Date(blog.created_at).toLocaleDateString('es-BO') : 'Reciente'}
          </span>
          {blog.agente && (
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {blog.agente.agent_name}
            </span>
          )}
        </div>
      </div>

      {blog.portada && (
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-100">
          <Image
            src={blog.portada}
            alt={blog.titulo}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Contenido del Artículo */}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4 whitespace-pre-line text-base sm:text-lg">
        {blog.contenido}
      </div>

    </article>
  );
}
