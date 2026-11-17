'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59178000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(
    'Hola equipo KAIZEN, deseo consultar información sobre sus servicios inmobiliarios y curaduría notarial en Tarija.'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  return (
    <footer className="w-full bg-[#EFECE6] border-t border-[#181816]/15 text-[#181816] transition-colors">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-14 sm:py-16 max-w-[1500px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181816]/15">
          
          {/* Brand Identity Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative h-10 w-auto flex items-center">
                <Image
                  src="/logos/negro-png-alta-calidad.png"
                  alt="KAIZEN Bienes Raíces"
                  width={200}
                  height={50}
                  className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-[#181816]/75 max-w-sm leading-relaxed">
              Curaduría, peritaje constructivo y asesoría notarial de bienes raíces en Tarija, Bolivia. Propiedades urbanas, fincas vitivinícolas y verificación documental estricta ante Derechos Reales.
            </p>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-[#A65D47] font-semibold tracking-wider">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Matrícula SEPREC Certificada · Tarija</span>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-[#F6F5F2] border border-[#181816]/15 flex items-center justify-center text-[#181816] hover:bg-[#181816] hover:text-[#F6F5F2] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-[#F6F5F2] border border-[#181816]/15 flex items-center justify-center text-[#181816] hover:bg-[#181816] hover:text-[#F6F5F2] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-[#F6F5F2] border border-[#181816]/15 flex items-center justify-center text-[#181816] hover:bg-[#181816] hover:text-[#F6F5F2] transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="text-xs" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-[#181816] text-[#F6F5F2] hover:bg-[#A65D47] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xs" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Portafolio */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#181816] font-semibold block mb-4">
              Portafolio Tarija
            </span>
            <ul className="space-y-2 font-sans text-xs sm:text-sm">
              <li>
                <Link href="/compra/page/1" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Cartera Residencial
                </Link>
              </li>
              <li>
                <Link href="/area-rural" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors flex items-center gap-1 font-medium">
                  <span>Viñedos & Terruños</span>
                  <span className="text-[9px] font-mono bg-[#181816] text-[#F6F5F2] px-1">Valle</span>
                </Link>
              </li>
              <li>
                <Link href="/alquiler/page/1" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Alquiler Auditado
                </Link>
              </li>
              <li>
                <Link href="/anticretico/page/1" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Anticréticos Certificados
                </Link>
              </li>
              <li>
                <Link href="/vender" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Vender con KAIZEN
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Marco Jurídico & Guías */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#181816] font-semibold block mb-4">
              Marco Jurídico
            </span>
            <ul className="space-y-2 font-sans text-xs sm:text-sm">
              <li>
                <Link href="/guia-comprador" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Guía del Comprador
                </Link>
              </li>
              <li>
                <Link href="/guia-vendedor" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Guía del Propietario
                </Link>
              </li>
              <li>
                <Link href="/blog/page/1" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Publicaciones & Blog
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-[#181816]/75 hover:text-[#A65D47] transition-colors">
                  Manifiesto & Ética
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Office */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#181816] font-semibold block mb-4">
              Oficina Central
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#181816]/75 mb-1">
              Tarija · Valle Central de Bolivia
            </p>
            <p className="font-sans text-xs text-[#181816]/65 mb-3">
              Atención presencial y virtual previa cita.
            </p>
            <div className="font-mono text-xs font-medium text-[#181816]">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#A65D47] transition-colors block">
                WA: +{cleanPhone}
              </a>
              <span className="text-[11px] text-[#181816]/60 block mt-0.5">
                vip@kaizeninmobiliaria.bo
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-[10px] text-[#181816]/60 uppercase tracking-wider gap-4">
          <div>
            © {new Date().getFullYear()} KAIZEN BIENES RAÍCES · TARIJA, BOLIVIA · FOLIO REAL SANEADO
          </div>
          <div className="flex items-center space-x-4">
            <span>Valores expresados en USD ($us)</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-[#181816] underline">
              Gestor CMS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
