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
    'Hola equipo KAIZEN, deseo consultar información sobre sus servicios inmobiliarios en Tarija.'
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  return (
    <footer className="w-full bg-surface-canvas border-t border-border-hairline text-primary transition-colors">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-14 sm:py-16 max-w-[1500px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-hairline">
          
          {/* Brand Identity Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative h-10 w-auto flex items-center">
                <Image
                  src="/logos/negro-png-alta-calidad.png"
                  alt="KAIZEN Bienes Raíces"
                  width={200}
                  height={50}
                  className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            <p className="text-body-sm font-body-sm text-text-muted max-w-sm leading-relaxed">
              Correduría y asesoramiento inmobiliario de alto estándar en Tarija, Bolivia. Especialistas en residencias de autor, fincas vinícolas y blindaje jurídico notarial.
            </p>

            <div className="flex items-center gap-2 text-legal-badge font-legal-badge uppercase text-[#0B4632] font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Matrícula SEPREC Certificada · Tarija</span>
            </div>

            <div className="flex items-center space-x-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[2px] bg-surface-warm border border-border-hairline flex items-center justify-center text-primary hover:bg-[#E60000] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[2px] bg-surface-warm border border-border-hairline flex items-center justify-center text-primary hover:bg-[#E60000] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[2px] bg-surface-warm border border-border-hairline flex items-center justify-center text-primary hover:bg-[#E60000] hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="text-xs" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[2px] bg-[#E7EFEA] border border-[#0B4632]/20 flex items-center justify-center text-[#0B4632] hover:bg-[#0B4632] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Portafolio */}
          <div>
            <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-primary font-semibold block mb-4">
              Portafolio Tarija
            </span>
            <ul className="space-y-2.5 text-body-sm font-body-sm">
              <li>
                <Link href="/compra/page/1" className="text-text-muted hover:text-primary transition-colors">
                  Cartera Residencial
                </Link>
              </li>
              <li>
                <Link href="/area-rural" className="text-text-muted hover:text-[#0B4632] transition-colors flex items-center gap-1 font-medium">
                  <span>Viñedos & Terruños</span>
                  <span className="text-[9px] bg-[#E7EFEA] text-[#0B4632] px-1 rounded">Valle</span>
                </Link>
              </li>
              <li>
                <Link href="/alquiler/page/1" className="text-text-muted hover:text-primary transition-colors">
                  Alquiler Corporativo
                </Link>
              </li>
              <li>
                <Link href="/anticretico/page/1" className="text-text-muted hover:text-primary transition-colors">
                  Anticréticos Certificados
                </Link>
              </li>
              <li>
                <Link href="/vender" className="text-text-muted hover:text-kaizen-red transition-colors">
                  Vender con KAIZEN
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Marco Jurídico & Guías */}
          <div>
            <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-primary font-semibold block mb-4">
              Marco Jurídico
            </span>
            <ul className="space-y-2.5 text-body-sm font-body-sm">
              <li>
                <Link href="/guia-comprador" className="text-text-muted hover:text-primary transition-colors">
                  Guía del Comprador
                </Link>
              </li>
              <li>
                <Link href="/guia-vendedor" className="text-text-muted hover:text-primary transition-colors">
                  Guía del Propietario
                </Link>
              </li>
              <li>
                <Link href="/blog/page/1" className="text-text-muted hover:text-primary transition-colors">
                  Publicaciones & Blog
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-text-muted hover:text-primary transition-colors">
                  Manifiesto & Ética
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Office */}
          <div>
            <span className="text-legal-badge font-legal-badge uppercase tracking-widest text-primary font-semibold block mb-4">
              Oficina Central
            </span>
            <p className="text-body-sm font-body-sm text-text-muted mb-1">
              Tarija · Valle Central de Bolivia
            </p>
            <p className="text-body-sm font-body-sm text-text-muted mb-3">
              Atención presencial y virtual previa cita.
            </p>
            <div className="text-body-sm font-body-sm font-medium text-primary">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-kaizen-red transition-colors block">
                WhatsApp: +{cleanPhone}
              </a>
              <span className="text-xs text-text-muted block mt-0.5">
                vip@kaizeninmobiliaria.bo
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-legal-badge font-legal-badge text-text-muted gap-4">
          <div>
            © {new Date().getFullYear()} KAIZEN Bienes Raíces. Tarija, Bolivia. Matrícula de Comercio & Derechos Reales Homologados.
          </div>
          <div className="flex items-center space-x-4 text-[10px]">
            <span>Valores expresados en USD y BOB oficial</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-primary underline">
              Gestor CMS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
