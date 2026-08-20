'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/inmuebles', label: 'Inmuebles', icon: 'apartment' },
  { href: '/admin/categorias', label: 'Categorías', icon: 'category' },
  { href: '/admin/agentes', label: 'Agentes', icon: 'real_estate_agent' },
  { href: '/admin/blogs', label: 'Blog', icon: 'article' },
  { href: '/admin/leads', label: 'Leads', icon: 'forum' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-on-surface flex-shrink-0 flex flex-col hidden md:flex h-full border-r border-surface-variant/20 z-20">
      {/* Brand / Logo */}
      <div className="h-20 flex items-center px-gutter border-b border-surface-variant/10">
        <Link href="/admin" className="inline-block bg-white/95 p-1.5 rounded-lg">
          <Image
            src="/logos/negro-png-alta-calidad.png"
            alt="KAIZEN Admin"
            width={140}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-unit overflow-y-auto admin-scroll">
        <ul className="space-y-1 px-unit">
          {MENU_ITEMS.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-surface-variant/15 text-primary font-bold'
                      : 'text-surface-dim hover:bg-surface-variant/5 hover:text-white'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] transition-all ${
                      isActive ? 'icon-fill text-primary' : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-md text-label-md">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Quick Link to Web */}
      <div className="p-gutter border-t border-surface-variant/10 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition px-2 py-1.5 rounded hover:bg-white/5"
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          <span>Ver Portal Público</span>
        </Link>

        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div className="w-10 h-10 rounded-full bg-surface-variant/20 flex items-center justify-center border border-surface-variant/30 text-white">
            <span className="material-symbols-outlined text-surface-dim">person</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-label-md text-white truncate">Admin KAIZEN</p>
            <p className="font-caption text-caption text-gray-400 truncate">admin@kaizen.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
