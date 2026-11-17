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
    <>
      {/* Top Bar Técnica Monoespaciada (Estándar Arquitectónico Japandi) */}
      <div className="w-full bg-[#EFECE6] border-b border-[#181816]/10 px-4 sm:px-6 md:px-8 lg:px-12 py-1.5 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#181816]/75 uppercase tracking-widest select-none">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-1.5 h-1.5 bg-[#A65D47]" />
          <span className="font-semibold text-[#181816]">KAIZEN®</span>
          <span className="hidden sm:inline text-[#181816]/40">—</span>
          <span className="hidden sm:inline">Curaduría Notarial & Patrimonio</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[#181816]/70">
          <span>Valle Central de Tarija</span>
          <span>·</span>
          <span>Folio Real Saneado 100%</span>
        </div>
        <div className="flex items-center gap-2 text-right">
          <span className="text-[#A65D47] font-semibold">CERO RIESGOS</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-[#F6F5F2]/90 backdrop-blur-md border-b border-[#181816]/15 transition-all duration-300">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3.5 flex justify-between items-center max-w-[1500px] mx-auto">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-9 sm:h-10 w-auto flex items-center">
              <Image
                src="/logos/negro-png-alta-calidad.png"
                alt="KAIZEN Bienes Raíces Tarija"
                width={200}
                height={50}
                priority
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            
            {/* Comprar con Submenú */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setComprarDropdown(true)}
              onMouseLeave={() => setComprarDropdown(false)}
            >
              <Link
                href="/compra/page/1"
                className={`text-[13px] font-medium tracking-normal py-1 transition-colors flex items-center gap-1 ${
                  isComprarActive
                    ? 'text-[#181816] font-semibold border-b border-[#181816]'
                    : 'text-[#181816]/70 hover:text-[#181816]'
                }`}
              >
                <span>Comprar</span>
                <span className="material-symbols-outlined text-[16px] text-[#181816]/50">
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
                    className="absolute top-full left-0 mt-1 w-64 origin-top bg-[#F6F5F2] border border-[#181816]/15 rounded-none shadow-lg py-2 z-50"
                  >
                    <Link
                      href="/compra/page/1"
                      onClick={() => setComprarDropdown(false)}
                      className="block px-4 py-2.5 text-xs hover:bg-[#EFECE6] hover:text-[#A65D47] transition-colors"
                    >
                      <span className="font-semibold block text-[#181816]">Inmuebles en venta</span>
                      <span className="text-[11px] text-[#181816]/60 block mt-0.5 font-mono">Casas, departamentos y terrenos</span>
                    </Link>
                    <div className="border-t border-[#181816]/10 my-1" />
                    <Link
                      href="/destacados/page/1"
                      onClick={() => setComprarDropdown(false)}
                      className="block px-4 py-2.5 text-xs hover:bg-[#EFECE6] hover:text-[#A65D47] transition-colors"
                    >
                      <span className="font-semibold block text-[#181816] flex items-center justify-between">
                        <span>Propiedades destacadas</span>
                        <span className="text-[9px] font-mono bg-[#181816] text-[#F6F5F2] px-1.5 py-0.5">VIP</span>
                      </span>
                      <span className="text-[11px] text-[#181816]/60 block mt-0.5 font-mono">Curaduría exclusiva KAIZEN</span>
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
                  ? 'text-[#181816] font-semibold border-b border-[#181816]'
                  : 'text-[#181816]/70 hover:text-[#181816]'
              }`}
            >
              Alquilar
            </Link>

            {/* Anticrético */}
            <Link
              href="/anticretico/page/1"
              className={`text-[13px] font-medium tracking-normal py-1 transition-colors ${
                isAnticreticoActive
                  ? 'text-[#181816] font-semibold border-b border-[#181816]'
                  : 'text-[#181816]/70 hover:text-[#181816]'
              }`}
            >
              Anticrético
            </Link>

            {/* Fincas & Viñedos */}
            <Link
              href="/area-rural"
              className={`text-[13px] font-medium tracking-normal py-1 transition-colors flex items-center gap-1.5 ${
                isRuralActive
                  ? 'text-[#A65D47] font-semibold border-b border-[#A65D47]'
                  : 'text-[#181816]/70 hover:text-[#A65D47]'
              }`}
            >
              <span>Fincas & Viñedos</span>
            </Link>

            {/* Vender */}
            <Link
              href="/vender"
              className={`text-[13px] font-medium tracking-normal py-1 transition-colors ${
                isVenderActive
                  ? 'text-[#181816] font-semibold border-b border-[#181816]'
                  : 'text-[#181816]/70 hover:text-[#181816]'
              }`}
            >
              Vender
            </Link>

            {/* Nosotros con Submenú */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setNosotrosDropdown(true)}
              onMouseLeave={() => setNosotrosDropdown(false)}
            >
              <Link
                href="/sobre-nosotros"
                className={`text-[13px] font-medium tracking-normal py-1 transition-colors flex items-center gap-1 ${
                  isNosotrosActive
                    ? 'text-[#181816] font-semibold border-b border-[#181816]'
                    : 'text-[#181816]/70 hover:text-[#181816]'
                }`}
              >
                <span>Nosotros</span>
                <span className="material-symbols-outlined text-[16px] text-[#181816]/50">
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
                    className="absolute top-full left-0 mt-1 w-56 origin-top bg-[#F6F5F2] border border-[#181816]/15 rounded-none shadow-lg py-2 z-50"
                  >
                    <Link
                      href="/sobre-nosotros"
                      onClick={() => setNosotrosDropdown(false)}
                      className="block px-4 py-2 text-xs font-medium text-[#181816] hover:bg-[#EFECE6] hover:text-[#A65D47] transition-colors"
                    >
                      Sobre KAIZEN
                    </Link>
                    <Link
                      href="/guia-comprador"
                      onClick={() => setNosotrosDropdown(false)}
                      className="block px-4 py-2 text-xs font-medium text-[#181816] hover:bg-[#EFECE6] hover:text-[#A65D47] transition-colors"
                    >
                      Guía del comprador
                    </Link>
                    <Link
                      href="/guia-vendedor"
                      onClick={() => setNosotrosDropdown(false)}
                      className="block px-4 py-2 text-xs font-medium text-[#181816] hover:bg-[#EFECE6] hover:text-[#A65D47] transition-colors"
                    >
                      Guía del vendedor
                    </Link>
                    <div className="border-t border-[#181816]/10 my-1" />
                    <Link
                      href="/blog/page/1"
                      onClick={() => setNosotrosDropdown(false)}
                      className="block px-4 py-2 text-xs font-medium text-[#181816] hover:bg-[#EFECE6] hover:text-[#A65D47] transition-colors"
                    >
                      Blog inmobiliario
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>

          {/* Acciones de la Derecha */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Botón Buscador */}
            <Link
              href="/busqueda"
              aria-label="Buscar propiedad en Tarija"
              className="w-9 h-9 rounded-none border border-transparent hover:border-[#181816]/20 flex items-center justify-center text-[#181816] hover:text-[#A65D47] hover:bg-[#EFECE6] active:scale-[0.95] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </Link>

            {/* CTA Agendar Visita con estética Japandi / Botón Recto */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#181816] hover:bg-[#A65D47] active:scale-[0.97] text-[#F6F5F2] px-4 py-2.5 rounded-none text-xs font-mono uppercase tracking-wider transition-colors duration-200"
            >
              <FaWhatsapp className="text-[14px] shrink-0" />
              <span className="whitespace-nowrap">Agendar Visita</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="lg:hidden p-1.5 text-[#181816] hover:text-[#A65D47] active:scale-[0.92] transition-all focus:outline-none"
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
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.9 }}
              className="lg:hidden bg-[#F6F5F2] border-t border-[#181816]/15 px-6 py-6 space-y-4 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816] font-semibold border-b border-[#181816]/10"
                >
                  Inicio
                </Link>
                <Link
                  href="/compra/page/1"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816]/80 hover:text-[#A65D47]"
                >
                  Comprar en Tarija
                </Link>
                <Link
                  href="/destacados/page/1"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816]/80 hover:text-[#A65D47] flex items-center justify-between"
                >
                  <span>Propiedades destacadas</span>
                  <span className="text-[9px] bg-[#181816] text-[#F6F5F2] px-1.5 py-0.5">VIP</span>
                </Link>
                <Link
                  href="/alquiler/page/1"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816]/80 hover:text-[#A65D47]"
                >
                  Alquiler
                </Link>
                <Link
                  href="/anticretico/page/1"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816]/80 hover:text-[#A65D47]"
                >
                  Anticrético
                </Link>
                <Link
                  href="/area-rural"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#A65D47] font-semibold flex items-center justify-between"
                >
                  <span>Fincas & Viñedos</span>
                  <span className="text-[10px] bg-[#EFECE6] px-2 py-0.5 text-[#181816]">Valle de Tarija</span>
                </Link>
                <Link
                  href="/vender"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816]/80 hover:text-[#A65D47]"
                >
                  Vender mi propiedad
                </Link>
                <Link
                  href="/guia-comprador"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816]/80 hover:text-[#A65D47]"
                >
                  Guías & Asesoría Legal
                </Link>
                <Link
                  href="/sobre-nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#181816]/80 hover:text-[#A65D47]"
                >
                  Sobre Nosotros
                </Link>
              </div>

              <div className="pt-4 border-t border-[#181816]/10 flex flex-col gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#181816] hover:bg-[#A65D47] text-[#F6F5F2] py-2.5 rounded-none font-mono text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Agendar visita en Tarija</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}