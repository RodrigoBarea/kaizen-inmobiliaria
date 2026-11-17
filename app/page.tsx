import BannerPrincipal from '@/components/Banner';
import InmueblesDestacados from '@/components/InmueblesDestacados';
import SimuladorFinanciero from '@/components/SimuladorFinanciero';
import EstandarKaizen from '@/components/EstandarKaizen';
import AreaRuralSection from '@/components/AreaRuralSection';
import DatosRelevantes from '@/components/DatosRelevantes';
import FormularioAsesoria from '@/components/FormularioAsesoria';
import GuiasInmobiliarias from '@/components/GuiasInmobiliarias';
import { getInmuebles, getMetricas } from '@/lib/supabase';
import { Inmueble, MetricasEmpresa } from '@/types/database';

export const revalidate = 60;

export default async function HomePage() {
  let inmueblesDestacados: Inmueble[] = [];
  let inmueblesRurales: Inmueble[] = [];
  let metricas: MetricasEmpresa | undefined;

  try {
    const [destacados, todos, metricasData] = await Promise.all([
      getInmuebles({ isFeatured: true, limit: 9 }),
      getInmuebles({ activeOnly: true }),
      getMetricas(),
    ]);
    inmueblesDestacados = destacados || [];
    inmueblesRurales = todos || [];
    metricas = metricasData;
  } catch (e) {
    console.error('Error fetching home properties and metrics:', e);
  }

  return (
    <>
      <BannerPrincipal />
      <InmueblesDestacados inmuebles={inmueblesDestacados} />
      <SimuladorFinanciero />
      <EstandarKaizen />
      <AreaRuralSection inmuebles={inmueblesRurales} />
      <DatosRelevantes metricas={metricas} />
      <FormularioAsesoria />
      <GuiasInmobiliarias />
    </>
  );
}
