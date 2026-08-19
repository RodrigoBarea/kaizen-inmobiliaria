import BannerPrincipal from '@/components/Banner';
import InmueblesDestacados from '@/components/InmueblesDestacados';
import Asesoramiento from '@/components/Asesoramiento';
import GuiasInmobiliarias from '@/components/GuiasInmobiliarias';
import { getInmuebles } from '@/lib/supabase';
import { Inmueble } from '@/types/database';

export const revalidate = 60;

export default async function HomePage() {
  let inmueblesDestacados: Inmueble[] = [];
  try {
    inmueblesDestacados = (await getInmuebles({ isFeatured: true, limit: 6 })) || [];
  } catch (e) {
    console.error('Error fetching destacados:', e);
  }

  return (
    <>
      <BannerPrincipal />
      <InmueblesDestacados inmuebles={inmueblesDestacados} />
      <Asesoramiento />
      <GuiasInmobiliarias />
    </>
  );
}
