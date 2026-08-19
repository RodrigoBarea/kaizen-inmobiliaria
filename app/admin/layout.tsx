import AdminSidebar from '@/components/admin/AdminSidebar';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-on-surface h-screen flex overflow-hidden font-body-md text-body-md">
      {/* Sidebar Desktop */}
      <AdminSidebar />

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Top App Bar */}
        <header className="h-20 bg-surface-container-lowest flex items-center justify-between px-gutter border-b border-surface-variant z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-secondary">
              <span className="font-label-md text-label-md">KAIZEN CMS</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="font-label-md text-label-md text-on-surface font-bold">
                Gestor de Información
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/inmuebles/nuevo"
              className="bg-primary text-white px-5 h-10 rounded flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-colors shadow-sm font-label-md text-label-md"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Nuevo Inmueble</span>
            </Link>
          </div>
        </header>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto admin-scroll p-margin-mobile md:p-margin-desktop">
          <div className="max-w-container-max mx-auto space-y-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
