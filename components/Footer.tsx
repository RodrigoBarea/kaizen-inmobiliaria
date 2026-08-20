'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '59170000000';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent('Hola KAIZEN, deseo consultar información sobre sus servicios inmobiliarios.');
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-gray-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/blanco-png-alta-calidad.png"
                alt="KAIZEN Bienes Raíces"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Agencia Inmobiliaria basada en el principio de la mejora continua. Transparencia, asesoramiento legal especializado y tecnología para tus inversiones inmobiliarias en Tarija.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#E60000] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#E60000] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#E60000] hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="text-xs" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#10B981] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xs" />
              </a>
            </div>
          </div>

          {/* Col 2: Inmuebles */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-gray-300 border-b border-gray-800 pb-2">
              Inmuebles
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/compra/page/1" className="hover:text-white hover:underline transition">
                  Inmuebles en Venta
                </Link>
              </li>
              <li>
                <Link href="/alquiler/page/1" className="hover:text-white hover:underline transition">
                  Inmuebles en Alquiler
                </Link>
              </li>
              <li>
                <Link href="/anticretico/page/1" className="hover:text-white hover:underline transition">
                  Inmuebles en Anticrético
                </Link>
              </li>
              <li>
                <Link href="/destacados/page/1" className="hover:text-white hover:underline transition">
                  Propiedades Destacadas
                </Link>
              </li>
              <li>
                <Link href="/area-rural" className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline transition flex items-center gap-1">
                  <span>🌿 Área Rural / Fincas</span>
                </Link>
              </li>
              <li>
                <Link href="/busqueda" className="hover:text-white hover:underline transition">
                  Búsqueda con Mapa
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Enlaces */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-gray-300 border-b border-gray-800 pb-2">
              Empresa & Guías
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-white hover:underline transition">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/vender" className="hover:text-white hover:underline transition">
                  Publicar Propiedad
                </Link>
              </li>
              <li>
                <Link href="/guia-comprador" className="hover:text-white hover:underline transition">
                  Guía del Comprador
                </Link>
              </li>
              <li>
                <Link href="/guia-vendedor" className="hover:text-white hover:underline transition">
                  Guía del Vendedor
                </Link>
              </li>
              <li>
                <Link href="/blog/page/1" className="hover:text-white hover:underline transition">
                  Blog Inmobiliario
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-gray-300 border-b border-gray-800 pb-2">
              Contacto Directo
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#E60000] shrink-0">location_on</span>
                <span>Tarija, Bolivia</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#10B981] shrink-0">phone</span>
                <span>+591 70000000</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-gray-400 shrink-0">mail</span>
                <span>contacto@inmobiliariakaizen.com</span>
              </p>
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded text-xs font-bold transition shadow-sm"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Chat en WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} KAIZEN Bienes Raíces. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <Link href="/sobre-nosotros" className="hover:text-gray-300 transition">
              Políticas de Privacidad
            </Link>
            <Link href="/admin" className="hover:text-gray-300 transition">
              Acceso Gestor CMS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
