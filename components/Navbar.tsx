'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inmueblesDropdown, setInmueblesDropdown] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    '¡Hola equipo KAIZEN! 👋 Busco asesoría inmobiliaria en Tarija y quiero conversar con un especialista para conocer mis opciones. ¿Me ayudan?'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  const isInmueblesActive =
    pathname.startsWith('/compra') ||
    pathname.startsWith('/alquiler') ||
    pathname.startsWith('/anticretico');

  return (
    <header className="bg-white/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm transition-all duration-300 h-20 shrink-0">
      <div className="flex justify-between items-center px-4 sm:px-8 h-20 w-full max-w-[1360px] mx-auto">
        
        {/* Logo Oficial KAIZEN */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative h-12 w-auto flex items-center">
            <Image
              src="/logo.png"
              alt="KAIZEN Bienes Raíces"
              width={160}
              height={48}
              priority
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Menú Central */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 h-full">
          <Link
            href="/"
            className={`font-label-md text-sm px-3.5 py-2 rounded transition-colors ${
              pathname === '/'
                ? 'text-[#E60000] font-bold border-b-2 border-[#E60000]'
                : 'text-[#1A1A1A] hover:text-[#E60000] hover:bg-gray-50'
            }`}
          >
            Inicio
          </Link>

          {/* Desplegable Inmuebles */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setInmueblesDropdown(true)}
            onMouseLeave={() => setInmueblesDropdown(false)}
          >
            <button
              type="button"
              className={`font-label-md text-sm px-3.5 py-2 rounded transition-colors flex items-center gap-1 ${
                isInmueblesActive
                  ? 'text-[#E60000] font-bold border-b-2 border-[#E60000]'
                  : 'text-[#1A1A1A] hover:text-[#E60000] hover:bg-gray-50'
              }`}
            >
              <span>Inmuebles</span>
              <span className="material-symbols-outlined text-[18px]">
                {inmueblesDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            <AnimatePresence>
              {inmueblesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-16 left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
                >
                  <Link
                    href="/compra/page/1"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-gray-50 hover:text-[#E60000] font-semibold transition-colors"
                  >
                    Comprar
                  </Link>
                  <Link
                    href="/alquiler/page/1"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-gray-50 hover:text-[#E60000] font-semibold transition-colors"
                  >
                    Alquilar
                  </Link>
                  <Link
                    href="/anticretico/page/1"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-gray-50 hover:text-[#E60000] font-semibold transition-colors"
                  >
                    Anticrético
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/sobre-nosotros"
            className={`font-label-md text-sm px-3.5 py-2 rounded transition-colors ${
              pathname === '/sobre-nosotros'
                ? 'text-[#E60000] font-bold border-b-2 border-[#E60000]'
                : 'text-[#1A1A1A] hover:text-[#E60000] hover:bg-gray-50'
            }`}
          >
            Sobre Nosotros
          </Link>

          <Link
            href="/blog/page/1"
            className={`font-label-md text-sm px-3.5 py-2 rounded transition-colors ${
              pathname.startsWith('/blog')
                ? 'text-[#E60000] font-bold border-b-2 border-[#E60000]'
                : 'text-[#1A1A1A] hover:text-[#E60000] hover:bg-gray-50'
            }`}
          >
            Blog
          </Link>
        </nav>

        {/* Lado derecho */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/vender"
            className="bg-[#E60000] hover:bg-[#C00000] text-white font-label-md text-xs sm:text-sm font-bold px-4 py-2.5 rounded transition-all shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_home</span>
            <span>Publicar Propiedad</span>
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#10B981] hover:bg-[#059669] text-white font-label-md text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded transition-all shadow-sm flex items-center gap-1.5"
          >
            <FaWhatsapp className="text-base" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/admin"
            className="text-gray-400 hover:text-[#1A1A1A] p-2 rounded hover:bg-gray-100 transition"
            title="Gestor de Información (Admin)"
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#1A1A1A] p-2 rounded hover:bg-gray-100"
          aria-label="Menú"
        >
          <span className="material-symbols-outlined text-[28px]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-5 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#1A1A1A] font-bold border-b border-gray-100 text-sm"
              >
                Inicio
              </Link>
              
              <div className="py-2 border-b border-gray-100">
                <span className="block text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider">
                  Inmuebles
                </span>
                <div className="pl-3 space-y-1.5">
                  <Link
                    href="/compra/page/1"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-semibold text-[#1A1A1A] hover:text-[#E60000]"
                  >
                    Comprar
                  </Link>
                  <Link
                    href="/alquiler/page/1"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-semibold text-[#1A1A1A] hover:text-[#E60000]"
                  >
                    Alquilar
                  </Link>
                  <Link
                    href="/anticretico/page/1"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-semibold text-[#1A1A1A] hover:text-[#E60000]"
                  >
                    Anticrético
                  </Link>
                </div>
              </div>

              <Link
                href="/sobre-nosotros"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#1A1A1A] font-semibold border-b border-gray-100 text-sm"
              >
                Sobre Nosotros
              </Link>

              <Link
                href="/blog/page/1"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#1A1A1A] font-semibold border-b border-gray-100 text-sm"
              >
                Blog
              </Link>

              <div className="pt-3 flex flex-col gap-2.5">
                <Link
                  href="/vender"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#E60000] text-white py-2.5 rounded font-bold text-center flex items-center justify-center gap-1.5 text-xs"
                >
                  <span className="material-symbols-outlined text-sm">add_home</span>
                  <span>Publicar Propiedad</span>
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#10B981] text-white py-2.5 rounded font-bold text-center flex items-center justify-center gap-1.5 text-xs"
                >
                  <FaWhatsapp className="text-base" />
                  <span>WhatsApp Inmobiliario</span>
                </a>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-gray-100 text-[#1A1A1A] py-2 rounded text-xs font-semibold text-center"
                >
                  Acceso Gestor (CMS)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
