'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [comprarDropdown, setComprarDropdown] = useState(false);
  const [nosotrosDropdown, setNosotrosDropdown] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    '¡Hola equipo KAIZEN! 👋 Busco asesoría inmobiliaria en Tarija y quiero agendar una visita. ¿Podrían informarme?'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  const isComprarActive =
    pathname.startsWith('/compra') ||
    pathname.startsWith('/destacados') ||
    pathname.startsWith('/inmueble');

  const isAlquilerActive = pathname.startsWith('/alquiler');
  const isAnticreticoActive = pathname.startsWith('/anticretico');
  const isRuralActive = pathname.startsWith('/area-rural');
  const isVenderActive = pathname.startsWith('/vender');
  const isNosotrosActive =
    pathname.startsWith('/sobre-nosotros') ||
    pathname.startsWith('/guia') ||
    pathname.startsWith('/blog');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-hairline transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3.5 flex justify-between items-center max-w-[1500px] mx-auto">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="relative h-10 sm:h-11 w-auto flex items-center">
            <Image
              src="/logos/negro-png-alta-calidad.png"
              alt="KAIZEN Bienes Raíces Tarija"
              width={200}
              height={50}
              priority
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links (Architecture Apple & Luxury: 100% Sólido sin transparencias) */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
          
          {/* Comprar con Submenú Sólido de Alta Definición */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setComprarDropdown(true)}
            onMouseLeave={() => setComprarDropdown(false)}
          >
            <Link
              href="/compra/page/1"
              className={`text-[13px] font-medium tracking-normal py-1 transition-colors flex items-center gap-1 ${
                isComprarActive
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <span>Comprar</span>
              <span className="material-symbols-outlined text-[16px] text-text-muted">
                expand_more
              </span>
            </Link>

            <AnimatePresence>
              {comprarDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -4 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.8 }}
                  className="absolute top-full left-0 mt-1 w-64 origin-top bg-white border border-gray-200 rounded-[4px] shadow-[0_16px_36px_rgba(0,0,0,0.15)] py-2 z-50"
                >
                  <Link
                    href="/compra/page/1"
                    onClick={() => setComprarDropdown(false)}
                    className="block px-4 py-2.5 text-xs hover:bg-[#F7F7F7] hover:text-kaizen-red transition-colors"
                  >
                    <span className="font-semibold block text-[#1A1A1A]">Inmuebles en venta</span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">Casas, departamentos y terrenos</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <Link
                    href="/destacados/page/1"
                    onClick={() => setComprarDropdown(false)}
                    className="block px-4 py-2.5 text-xs hover:bg-[#F7F7F7] hover:text-kaizen-red transition-colors"
                  >
                    <span className="font-semibold block text-[#1A1A1A] flex items-center justify-between">
                      <span>Propiedades destacadas</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-[2px]">VIP</span>
                    </span>
                    <span className="text-[11px] text-gray-500 block mt-0.5">Selección exclusiva KAIZEN</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Alquilar */}
          <Link
            href="/alquiler/page/1"
            className={`text-[13px] font-medium tracking-normal py-1 transition-colors ${
              isAlquilerActive
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Alquilar
          </Link>

          {/* Anticrético */}
          <Link
            href="/anticretico/page/1"
            className={`text-[13px] font-medium tracking-normal py-1 transition-colors ${
              isAnticreticoActive
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Anticrético
          </Link>

          {/* Fincas & Viñedos (Terruño Rural) */}
          <Link
            href="/area-rural"
            className={`text-[13px] font-medium tracking-normal py-1 transition-colors flex items-center gap-1.5 ${
              isRuralActive
                ? 'text-[#0B4632] font-semibold border-b-2 border-[#0B4632]'
                : 'text-text-muted hover:text-[#0B4632]'
            }`}
          >
            <span>Fincas & Viñedos</span>
          </Link>

          {/* Vender (Servicio para Propietarios) */}
          <Link
            href="/vender"
            className={`text-[13px] font-medium tracking-normal py-1 transition-colors ${
              isVenderActive
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            Vender
          </Link>

          {/* Nosotros con Submenú Sólido */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setNosotrosDropdown(true)}
            onMouseLeave={() => setNosotrosDropdown(false)}
          >
            <Link
              href="/sobre-nosotros"
              className={`text-[13px] font-medium tracking-normal py-1 transition-colors flex items-center gap-1 ${
                isNosotrosActive
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              <span>Nosotros</span>
              <span className="material-symbols-outlined text-[16px] text-text-muted">
                expand_more
              </span>
            </Link>

            <AnimatePresence>
              {nosotrosDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -4 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.8 }}
                  className="absolute top-full left-0 mt-1 w-56 origin-top bg-white border border-gray-200 rounded-[4px] shadow-[0_16px_36px_rgba(0,0,0,0.15)] py-2 z-50"
                >
                  <Link
                    href="/sobre-nosotros"
                    onClick={() => setNosotrosDropdown(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F7F7F7] hover:text-kaizen-red transition-colors"
                  >
                    Sobre KAIZEN
                  </Link>
                  <Link
                    href="/guia-comprador"
                    onClick={() => setNosotrosDropdown(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F7F7F7] hover:text-kaizen-red transition-colors"
                  >
                    Guía del comprador
                  </Link>
                  <Link
                    href="/guia-vendedor"
                    onClick={() => setNosotrosDropdown(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F7F7F7] hover:text-kaizen-red transition-colors"
                  >
                    Guía del vendedor
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <Link
                    href="/blog/page/1"
                    onClick={() => setNosotrosDropdown(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F7F7F7] hover:text-kaizen-red transition-colors"
                  >
                    Blog inmobiliario
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>

        {/* Acciones de la Derecha (Estilo Luxury) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Botón Buscador */}
          <Link
            href="/busqueda"
            aria-label="Buscar propiedad en Tarija"
            className="w-9 h-9 rounded-[2px] flex items-center justify-center text-primary hover:text-kaizen-red hover:bg-surface-canvas active:scale-[0.92] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </Link>

          {/* CTA Agendar Visita con diseño Apple & Luxury */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-kaizen-red hover:bg-[#C00000] active:scale-[0.97] text-white px-4 py-2 rounded-[2px] text-xs font-semibold tracking-wide shadow-sm transition-all duration-150 hover:-translate-y-0.5"
          >
            <FaWhatsapp className="text-[15px] shrink-0" />
            <span className="whitespace-nowrap">Agendar visita</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="lg:hidden p-1.5 text-primary hover:text-kaizen-red active:scale-[0.92] transition-all focus:outline-none"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation (100% Sólido sin transparencias) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.9 }}
            className="lg:hidden bg-white border-b border-border-hairline px-6 py-6 space-y-4 shadow-2xl overflow-hidden"
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
                href="/destacados/page/1"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary flex items-center justify-between"
              >
                <span>Propiedades destacadas</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-[2px]">VIP</span>
              </Link>
              <Link
                href="/alquiler/page/1"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Alquiler
              </Link>
              <Link
                href="/anticretico/page/1"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Anticrético
              </Link>
              <Link
                href="/area-rural"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-[#0B4632] font-semibold flex items-center justify-between"
              >
                <span>Fincas & Viñedos</span>
                <span className="text-[10px] bg-[#E7EFEA] px-2 py-0.5 rounded">Valle de Tarija</span>
              </Link>
              <Link
                href="/vender"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-text-muted hover:text-primary"
              >
                Vender mi propiedad
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
                className="w-full bg-kaizen-red hover:bg-[#C00000] text-white py-2.5 rounded-[2px] font-semibold text-xs text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <FaWhatsapp className="text-base" />
                <span>Agendar visita en Tarija</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}