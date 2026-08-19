import Link from 'next/link';
import { Inmueble } from '@/types/database';
import InmuebleCard from './InmuebleCard';

interface Props {
  inmuebles?: Inmueble[];
}

export default function InmueblesDestacados({ inmuebles = [] }: Props) {
  const list = Array.isArray(inmuebles) ? inmuebles : [];

  return (
    <section className="py-20 md:py-28 bg-[#F7F7F7] px-4 sm:px-8">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#E60000] bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3 inline-block">
            Auditoría & Calidad
          </span>
          <h2 className="font-headline-md text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3">
            Selección KAIZEN: Propiedades con Alta Plusvalía
          </h2>
          <p className="font-body-md text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada inmueble en nuestro portafolio ha superado una estricta auditoría técnica y legal. Presentamos oportunidades reales de inversión y hogares listos para habitar, garantizando tu tranquilidad desde el primer día.
          </p>
        </div>

        {/* Grid */}
        {list.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200 max-w-xl mx-auto shadow-sm">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
              home_work
            </span>
            <p className="font-body-md text-sm text-gray-600">
              Pronto publicaremos nuevas propiedades auditadas en esta sección.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.slice(0, 6).map((inmueble) => (
              <InmuebleCard key={inmueble.id} inmueble={inmueble} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/destacados/page/1"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#E60000] text-white font-label-md text-sm font-bold px-8 py-3.5 rounded transition-colors shadow-sm"
          >
            <span>Ver Todas las Oportunidades</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
