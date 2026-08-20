import BannerPrincipal from '@/components/Banner';
import InmueblesDestacados from '@/components/InmueblesDestacados';
import AreaRuralSection from '@/components/AreaRuralSection';
import Asesoramiento from '@/components/Asesoramiento';
import GuiasInmobiliarias from '@/components/GuiasInmobiliarias';
import { getInmuebles } from '@/lib/supabase';
import { Inmueble } from '@/types/database';

export const revalidate = 60;

export default async function HomePage() {
  let inmueblesDestacados: Inmueble[] = [];
  let inmueblesRurales: Inmueble[] = [];

  try {
    const [destacados, todos] = await Promise.all([
      getInmuebles({ isFeatured: true, limit: 6 }),
      getInmuebles({ activeOnly: true }),
    ]);
    inmueblesDestacados = destacados || [];
    inmueblesRurales = todos || [];
  } catch (e) {
    console.error('Error fetching home properties:', e);
  }

  return (
    <>
      <BannerPrincipal />
      <InmueblesDestacados inmuebles={inmueblesDestacados} />
      <AreaRuralSection inmuebles={inmueblesRurales} />
      <Asesoramiento />
      <GuiasInmobiliarias />
    </>
  );
}
