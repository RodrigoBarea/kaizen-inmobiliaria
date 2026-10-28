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

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    '¡Hola equipo KAIZEN! 👋 Busco asesoría inmobiliaria VIP en Tarija y quiero consultar opciones disponibles con un especialista. ¿Me ayudan?'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  const isInmueblesActive =
    pathname.startsWith('/compra') ||
    pathname.startsWith('/alquiler') ||
    pathname.startsWith('/anticretico') ||
    pathname.startsWith('/destacados') ||
    pathname.startsWith('/inmueble');

  return (
    <header className="sticky top-0 z-50 bg-surface-stone/95 backdrop-blur-md border-b border-border-hairline transition-all duration-300">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 flex justify-between items-center max-w-[1500px] mx-auto">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="relative h-11 sm:h-12 w-auto flex items-center">
            <Image
              src="/logos/negro-png-alta-calidad.png"
              alt="KAIZEN Bienes Raíces"
              width={220}
              height={55}
              priority
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          
          {/* Dropdown Inmuebles */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setInmueblesDropdown(true)}
            onMouseLeave={() => setInmueblesDropdown(false)}
          >
            <button
              type="button"
              className={`font-body-sm text-[13px] font-medium tracking-tight flex items-center gap-1 py-1 transition-colors ${
                isInmueblesActive
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <span>Propiedades</span>
              <span className="material-symbols-outlined text-[18px]">
                {inmueblesDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            <AnimatePresence>
              {inmueblesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-8 left-0 w-56 bg-surface-stone border border-border-hairline rounded-[2px] shadow-xl py-2 z-50"
                >
                  <Link
                    href="/compra/page/1"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2 text-xs font-semibold text-primary hover:bg-surface-canvas hover:text-kaizen-red transition-colors"
                  >
                    Venta Exclusiva
                  </Link>
                  <Link
                    href="/alquiler/page/1"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2 text-xs font-semibold text-primary hover:bg-surface-canvas hover:text-kaizen-red transition-colors"
                  >
                    Alquiler Corporativo & Residencial
                  </Link>
                  <Link
                    href="/anticretico/page/1"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2 text-xs font-semibold text-primary hover:bg-surface-canvas hover:text-kaizen-red transition-colors"
                  >
                    Anticréticos Certificados
                  </Link>
                  <Link
                    href="/destacados/page/1"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2 text-xs font-semibold text-primary hover:bg-surface-canvas hover:text-kaizen-red transition-colors"
                  >
                    Colección Destacada
                  </Link>
                  <div className="border-t border-border-hairline my-1" />
                  <Link
                    href="/area-rural"
                    onClick={() => setInmueblesDropdown(false)}
                    className="block px-4 py-2 text-xs font-semibold text-[#0B4632] hover:bg-emerald-subtle transition-colors flex items-center justify-between"
                  >
                    <span>Terrenos & Viñedos</span>
                    <span className="text-[10px] bg-[#E7EFEA] text-[#0B4632] px-1.5 py-0.5 rounded">Valle</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/area-rural"
            className={`font-body-sm text-[13px] font-medium tracking-tight py-1 transition-colors ${
              pathname === '/area-rural'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Terrenos & Viñedos
          </Link>

          <Link
            href="/anticretico/page/1"
            className={`font-body-sm text-[13px] font-medium tracking-tight py-1 transition-colors ${
              pathname.startsWith('/anticretico')
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Anticréticos
          </Link>

          <Link
            href="/vender"
            className={`font-body-sm text-[13px] font-medium tracking-tight py-1 transition-colors ${
              pathname === '/vender'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Vender
          </Link>

          <Link
            href="/guia-comprador"
            className={`font-body-sm text-[13px] font-medium tracking-tight py-1 transition-colors ${
              pathname === '/guia-comprador' || pathname === '/guia-vendedor'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Asesoría Legal
          </Link>

          <Link
            href="/sobre-nosotros"
            className={`font-body-sm text-[13px] font-medium tracking-tight py-1 transition-colors ${
              pathname === '/sobre-nosotros'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Nosotros
          </Link>
        </nav>

        {/* Trailing Action Cluster */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Quick Search Action */}
          <Link
            href="/busqueda"
            aria-label="Buscar propiedad en Tarija"
            className="p-1.5 text-primary hover:text-kaizen-red transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </Link>

          {/* Direct WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#E60000] hover:bg-[#C00000] text-white px-4 py-2 rounded-[2px] text-xs font-semibold tracking-tight shadow-sm transition-all duration-150 hover:-translate-y-0.5"
          >
            <FaWhatsapp className="text-sm" />
            <span>Agenda tu visita</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="lg:hidden p-1.5 text-primary hover:text-kaizen-red transition-colors focus:outline-none"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-surface-stone border-b border-border-hairline px-6 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-3 font-body-sm text-sm">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-primary font-semibold border-b border-border-hairline"
              >
                Inicio
              </Link>
              <Link
                href="/compra/page/1"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Comprar en Tarija
              </Link>
              <Link
                href="/alquiler/page/1"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Alquileres
              </Link>
              <Link
                href="/anticretico/page/1"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Anticréticos Certificados
              </Link>
              <Link
                href="/area-rural"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-[#0B4632] font-semibold flex items-center justify-between"
              >
                <span>Terrenos & Viñedos</span>
                <span className="text-[10px] bg-[#E7EFEA] px-2 py-0.5 rounded">Valle de Tarija</span>
              </Link>
              <Link
                href="/vender"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Vender mi Propiedad
              </Link>
              <Link
                href="/guia-comprador"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Guías & Asesoría Legal
              </Link>
              <Link
                href="/sobre-nosotros"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Sobre Nosotros
              </Link>
            </div>

            <div className="pt-4 border-t border-border-hairline flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#E60000] text-white py-3 rounded-[2px] font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-base" />
                <span>Hablar con un Broker VIP en Tarija</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
