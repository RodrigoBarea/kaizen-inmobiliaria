import { createClient } from '@supabase/supabase-js';
import { Inmueble, Categoria, Agente, Blog, LeadVender } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('placeholder')
);

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Fallback / Mock Data for instant developer & offline preview
export const MOCK_CATEGORIAS: Categoria[] = [
  { id: '11111111-1111-1111-1111-111111111111', nombre_categoria: 'Venta', slug: 'venta' },
  { id: '22222222-2222-2222-2222-222222222222', nombre_categoria: 'Alquiler', slug: 'alquiler' },
  { id: '33333333-3333-3333-3333-333333333333', nombre_categoria: 'Anticrético', slug: 'anticretico' },
];

export const MOCK_AGENTES: Agente[] = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    agent_name: 'Carlos Mendoza',
    slug: 'carlos-mendoza',
    cargo: 'Director Comercial & Broker',
    telefono: '+591 70000000',
    correo: 'carlos@inmobiliariakaizen.com',
    foto_principal: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    agent_name: 'Valeria Rios',
    slug: 'valeria-rios',
    cargo: 'Asesora Senior de Inversiones',
    telefono: '+591 70000000',
    correo: 'valeria@inmobiliariakaizen.com',
    foto_principal: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
  },
];

export const MOCK_INMUEBLES: Inmueble[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    inmueble_name: 'Hermosa Casa Moderna en Barrio Miraflores',
    slug: 'hermosa-casa-moderna-en-barrio-miraflores',
    direccion: 'Av. Las Palmeras #450, Barrio Miraflores',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 185000,
    dormitorios: 4,
    banos: 3,
    terreno: 350,
    construccion: 280,
    estacionamientos: 2,
    frente: 14,
    descripcion: 'Espectacular residencia moderna de 2 plantas con finos acabados, amplio jardín con churrasquera techada, suite principal con vestidor y balcón panorámico. Cocina equipada con isla de cuarzo y muebles empotrados de primera calidad.',
    lat: -21.5355,
    lng: -64.7296,
    is_featured: true,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    inmueble_name: 'Departamento de Lujo en Equipetrol',
    slug: 'departamento-de-lujo-en-equipetrol',
    direccion: 'Calle 8 Este, Barrio Equipetrol',
    ciudad: 'Santa Cruz',
    tipo: 'Departamento',
    precio: 145000,
    dormitorios: 3,
    banos: 2,
    terreno: 140,
    construccion: 140,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Exclusivo departamento en piso alto con vista panorámica. Edificio inteligente con piscina infinita, gimnasio equipado, salón de eventos y seguridad 24/7. Acabados importados y domótica integrada.',
    lat: -17.7712,
    lng: -63.1950,
    is_featured: true,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    inmueble_name: 'Casa en Alquiler Zona San Gerónimo',
    slug: 'casa-en-alquiler-zona-san-geronimo',
    direccion: 'Zona San Gerónimo, Pasaje Los Sauces',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 750,
    dormitorios: 3,
    banos: 2,
    terreno: 260,
    construccion: 190,
    estacionamientos: 2,
    frente: 10,
    descripcion: 'Acogedora casa en alquiler en zona tranquila y residencial. Cuenta con living comedor luminoso, cocina cerrada, patio trasero con parrillero y garaje para 2 vehículos.',
    lat: -21.5420,
    lng: -64.7150,
    is_featured: true,
    active: true,
    categoria_id: '22222222-2222-2222-2222-222222222222',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[1],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    inmueble_name: 'Departamento en Anticrético Calacoto',
    slug: 'departamento-en-anticretico-calacoto',
    direccion: 'Calle 15 de Calacoto',
    ciudad: 'La Paz',
    tipo: 'Departamento',
    precio: 45000,
    dormitorios: 2,
    banos: 2,
    terreno: 95,
    construccion: 95,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Hermoso departamento soleado en anticrético ubicado en el corazón de la zona sur. Calefacción central, cocina con mesones de granito y terraza privada.',
    lat: -16.5385,
    lng: -68.0845,
    is_featured: true,
    active: true,
    categoria_id: '33333333-3333-3333-3333-333333333333',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[2],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    inmueble_name: 'Residencia Minimalista en Las Palmas',
    slug: 'residencia-minimalista-en-las-palmas',
    direccion: 'Av. Las Palmas, Condominio El Roble',
    ciudad: 'Santa Cruz',
    tipo: 'Casa',
    precio: 320000,
    dormitorios: 4,
    banos: 4,
    terreno: 420,
    construccion: 360,
    estacionamientos: 3,
    frente: 16,
    descripcion: 'Lujosa casa minimalista en condominio exclusivo. Piscina privada con deck de madera, galería con asador gourmet, cocina integrada y suite máster con jacuzzi.',
    lat: -17.8015,
    lng: -63.2050,
    is_featured: true,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    inmueble_name: 'Casa Estilo Colonial en Aranjuez',
    slug: 'casa-estilo-colonial-en-aranjuez',
    direccion: 'Calle Los Pinos, Barrio Aranjuez',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 210000,
    dormitorios: 4,
    banos: 3,
    terreno: 380,
    construccion: 290,
    estacionamientos: 2,
    frente: 15,
    descripcion: 'Hermosa propiedad de diseño cálido colonial con detalles en madera tallada, amplios corredores con teja española, jardín consolidado y pozo de agua propio.',
    lat: -21.5280,
    lng: -64.7390,
    is_featured: true,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    inmueble_name: 'Terreno Urbano en Zona Norte',
    slug: 'terreno-urbano-en-zona-norte',
    direccion: 'Av. Circunvalación Norte',
    ciudad: 'Cochabamba',
    tipo: 'Terreno',
    precio: 98000,
    dormitorios: 0,
    banos: 0,
    terreno: 500,
    construccion: 0,
    estacionamientos: 0,
    frente: 20,
    descripcion: 'Excelente lote totalmente plano con todos los servicios básicos instalados (agua, luz, alcantarillado, gas natural). Ideal para proyecto residencial o comercial.',
    lat: -17.3750,
    lng: -66.1510,
    is_featured: false,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    inmueble_name: 'Penthouse Corporativo Norte en Alquiler',
    slug: 'penthouse-corporativo-norte-en-alquiler',
    direccion: '4to Anillo, Zona Norte',
    ciudad: 'Santa Cruz',
    tipo: 'Departamento',
    precio: 1200,
    dormitorios: 3,
    banos: 3,
    terreno: 180,
    construccion: 180,
    estacionamientos: 2,
    frente: 0,
    descripcion: 'Espectacular departamento amoblado de lujo con vista panorámica. Cortinas automatizadas, aire acondicionado central, terraza privada y áreas sociales de primer nivel.',
    lat: -17.7620,
    lng: -63.1780,
    is_featured: true,
    active: true,
    categoria_id: '22222222-2222-2222-2222-222222222222',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[1],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    inmueble_name: 'Oficina en Torre Empresarial Centro',
    slug: 'oficina-en-torre-empresarial-centro',
    direccion: 'Paseo El Prado, Centro Financiero',
    ciudad: 'La Paz',
    tipo: 'Oficina Comercial',
    precio: 850,
    dormitorios: 2,
    banos: 2,
    terreno: 110,
    construccion: 110,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Oficina ejecutiva con divisiones en vidrio templado, recepción, sala de juntas y kitchenette. Cableado estructurado y seguridad las 24 horas.',
    lat: -16.5010,
    lng: -68.1320,
    is_featured: false,
    active: true,
    categoria_id: '22222222-2222-2222-2222-222222222222',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[1],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    inmueble_name: 'Departamento Amoblado en Barrio Senac',
    slug: 'departamento-amoblado-en-barrio-senac',
    direccion: 'Barrio Senac, Calle Las Palmeras',
    ciudad: 'Tarija',
    tipo: 'Departamento',
    precio: 500,
    dormitorios: 2,
    banos: 1,
    terreno: 75,
    construccion: 75,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Cómodo y moderno departamento completamente amoblado y equipado. Incluye wifi, agua y expensas. Excelente ubicación cercana a universidades y centros comerciales.',
    lat: -21.5450,
    lng: -64.7380,
    is_featured: false,
    active: true,
    categoria_id: '22222222-2222-2222-2222-222222222222',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[1],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000011',
    inmueble_name: 'Casa Amplia en Anticrético San Martín',
    slug: 'casa-amplia-en-anticretico-san-martin',
    direccion: 'Barrio San Martín, Calle Los Ceibos',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 38000,
    dormitorios: 3,
    banos: 2,
    terreno: 220,
    construccion: 160,
    estacionamientos: 2,
    frente: 10,
    descripcion: 'Casa independiente en anticrético por 2 años forzosos. 3 dormitorios amplios, patio privado, cocina con cajonería alta y baja, garaje techado.',
    lat: -21.5310,
    lng: -64.7210,
    is_featured: true,
    active: true,
    categoria_id: '33333333-3333-3333-3333-333333333333',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[2],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000012',
    inmueble_name: 'Departamento Soleado en Cala Cala',
    slug: 'departamento-soleado-en-cala-cala',
    direccion: 'Av. Libertador Bolívar, Cala Cala',
    ciudad: 'Cochabamba',
    tipo: 'Departamento',
    precio: 35000,
    dormitorios: 3,
    banos: 2,
    terreno: 120,
    construccion: 120,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Espacioso departamento en anticrético en piso intermedio. Muy luminoso y cálido, roperos empotrados, suite con vestidor, edificio con ascensor y seguridad.',
    lat: -17.3690,
    lng: -66.1600,
    is_featured: false,
    active: true,
    categoria_id: '33333333-3333-3333-3333-333333333333',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[2],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
    ],
  },
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: '11111111-2222-3333-4444-555555555555',
    titulo: 'Guía definitiva para comprar tu primera vivienda en Bolivia',
    slug: 'guia-definitiva-para-comprar-tu-primera-vivienda-en-bolivia',
    contenido: 'Comprar una propiedad es uno de los pasos financieros más importantes. En esta guía te explicamos los requisitos bancarios para créditos de vivienda social, revisión de títulos de propiedad en Derechos Reales y aspectos clave para tomar la mejor decisión.',
    portada: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    active: true,
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    agente: MOCK_AGENTES[0],
    created_at: new Date().toISOString(),
  },
  {
    id: '66666666-7777-8888-9999-000000000000',
    titulo: 'Tendencias del mercado inmobiliario en 2026',
    slug: 'tendencias-del-mercado-inmobiliario-en-2026',
    contenido: 'Análisis de la plusvalía en las principales ciudades de Bolivia, zonas con mayor rentabilidad para inversión en alquiler y el impacto de los nuevos proyectos de urbanización sustentable.',
    portada: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    active: true,
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    agente: MOCK_AGENTES[1],
    created_at: new Date().toISOString(),
  },
];

// Helper Data Access Functions
export async function getInmuebles(options?: {
  featuredOnly?: boolean;
  categoriaSlug?: string;
  ciudad?: string;
  tipo?: string;
  activeOnly?: boolean;
  limit?: number;
}): Promise<Inmueble[]> {
  if (!isSupabaseConfigured) {
    let list = [...MOCK_INMUEBLES];
    if (options?.activeOnly !== false) list = list.filter(i => i.active);
    if (options?.featuredOnly) list = list.filter(i => i.is_featured);
    if (options?.categoriaSlug) {
      const slugNorm = options.categoriaSlug.toLowerCase();
      const targetSlug = slugNorm === 'compra' ? 'venta' : slugNorm === 'alquila' ? 'alquiler' : slugNorm;
      const cat = MOCK_CATEGORIAS.find(
        c => c.slug.toLowerCase() === targetSlug || c.slug.toLowerCase() === slugNorm || c.nombre_categoria.toLowerCase().includes(targetSlug)
      );
      if (cat) list = list.filter(i => i.categoria_id === cat.id);
    }
    if (options?.ciudad && options.ciudad !== 'Todos') list = list.filter(i => i.ciudad === options.ciudad);
    if (options?.tipo && options.tipo !== 'Todos') list = list.filter(i => i.tipo === options.tipo);
    if (options?.limit) list = list.slice(0, options.limit);
    return list;
  }

  try {
    let query = supabase
      .from('inmuebles')
      .select('*, categoria:categorias(*), agente:agentes(*)');

    if (options?.activeOnly !== false) {
      query = query.eq('active', true);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }
    if (options?.ciudad && options.ciudad !== 'Todos') {
      query = query.eq('ciudad', options.ciudad);
    }
    if (options?.tipo && options.tipo !== 'Todos') {
      query = query.eq('tipo', options.tipo);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error || !data) {
      console.warn('Supabase query error, fallback to mock data:', error);
      return MOCK_INMUEBLES;
    }

    let result = data as Inmueble[];
    if (options?.categoriaSlug) {
      const slugNorm = options.categoriaSlug.toLowerCase();
      const targetSlug = slugNorm === 'compra' ? 'venta' : slugNorm === 'alquila' ? 'alquiler' : slugNorm;
      result = result.filter(
        item =>
          item.categoria?.slug.toLowerCase() === targetSlug ||
          item.categoria?.slug.toLowerCase() === slugNorm ||
          item.categoria?.nombre_categoria.toLowerCase().includes(targetSlug)
      );
    }
    if (options?.limit) {
      result = result.slice(0, options.limit);
    }
    return result;
  } catch (err) {
    console.error('Error fetching inmuebles:', err);
    return MOCK_INMUEBLES;
  }
}

export async function getInmuebleBySlug(slug: string): Promise<Inmueble | null> {
  if (!isSupabaseConfigured) {
    return MOCK_INMUEBLES.find(i => i.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .select('*, categoria:categorias(*), agente:agentes(*)')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return MOCK_INMUEBLES.find(i => i.slug === slug) || null;
    }
    return data as Inmueble;
  } catch (err) {
    console.error('Error fetching inmueble by slug:', err);
    return MOCK_INMUEBLES.find(i => i.slug === slug) || null;
  }
}

export async function getCategorias(): Promise<Categoria[]> {
  if (!isSupabaseConfigured) return MOCK_CATEGORIAS;
  try {
    const { data, error } = await supabase.from('categorias').select('*').order('nombre_categoria');
    if (error || !data || data.length === 0) return MOCK_CATEGORIAS;
    return data as Categoria[];
  } catch {
    return MOCK_CATEGORIAS;
  }
}

export async function getAgentes(): Promise<Agente[]> {
  if (!isSupabaseConfigured) return MOCK_AGENTES;
  try {
    const { data, error } = await supabase.from('agentes').select('*').order('agent_name');
    if (error || !data || data.length === 0) return MOCK_AGENTES;
    return data as Agente[];
  } catch {
    return MOCK_AGENTES;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  if (!isSupabaseConfigured) return MOCK_BLOGS;
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, agente:agentes(*)')
      .eq('active', true)
      .order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return MOCK_BLOGS;
    return data as Blog[];
  } catch {
    return MOCK_BLOGS;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!isSupabaseConfigured) {
    return MOCK_BLOGS.find(b => b.slug === slug) || null;
  }
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, agente:agentes(*)')
      .eq('slug', slug)
      .single();
    if (error || !data) return MOCK_BLOGS.find(b => b.slug === slug) || null;
    return data as Blog;
  } catch {
    return MOCK_BLOGS.find(b => b.slug === slug) || null;
  }
}

export async function getInmuebleById(id: string): Promise<Inmueble | null> {
  if (!isSupabaseConfigured) {
    return MOCK_INMUEBLES.find(i => i.id === id) || null;
  }
  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .select('*, categoria:categorias(*), agente:agentes(*)')
      .eq('id', id)
      .single();
    if (error || !data) return MOCK_INMUEBLES.find(i => i.id === id) || null;
    return data as Inmueble;
  } catch {
    return MOCK_INMUEBLES.find(i => i.id === id) || null;
  }
}

export async function createInmueble(inmuebleData: Partial<Inmueble>): Promise<Inmueble | null> {
  if (!isSupabaseConfigured) {
    const newInmueble: Inmueble = {
      id: `mock-${Date.now()}`,
      inmueble_name: inmuebleData.inmueble_name || '',
      slug: inmuebleData.slug || `inmueble-${Date.now()}`,
      direccion: inmuebleData.direccion || '',
      ciudad: inmuebleData.ciudad || 'Tarija',
      tipo: inmuebleData.tipo || 'Departamento',
      precio: inmuebleData.precio || 0,
      dormitorios: inmuebleData.dormitorios || 0,
      banos: inmuebleData.banos || 0,
      terreno: inmuebleData.terreno || 0,
      construccion: inmuebleData.construccion || 0,
      estacionamientos: inmuebleData.estacionamientos || 0,
      frente: inmuebleData.frente || 0,
      descripcion: inmuebleData.descripcion || '',
      lat: inmuebleData.lat || -21.5355,
      lng: inmuebleData.lng || -64.7296,
      is_featured: Boolean(inmuebleData.is_featured),
      active: inmuebleData.active !== undefined ? inmuebleData.active : true,
      categoria_id: inmuebleData.categoria_id || null,
      agente_id: inmuebleData.agente_id || null,
      imagenes: inmuebleData.imagenes || [],
      created_at: new Date().toISOString(),
    };
    MOCK_INMUEBLES.unshift(newInmueble);
    return newInmueble;
  }

  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .insert([inmuebleData])
      .select()
      .single();
    if (error) {
      console.error('Error creating inmueble:', error);
      return null;
    }
    return data as Inmueble;
  } catch (err) {
    console.error('Exception creating inmueble:', err);
    return null;
  }
}

export async function updateInmueble(id: string, inmuebleData: Partial<Inmueble>): Promise<Inmueble | null> {
  if (!isSupabaseConfigured) {
    const index = MOCK_INMUEBLES.findIndex(i => i.id === id);
    if (index !== -1) {
      MOCK_INMUEBLES[index] = { ...MOCK_INMUEBLES[index], ...inmuebleData };
      return MOCK_INMUEBLES[index];
    }
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .update(inmuebleData)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error('Error updating inmueble:', error);
      return null;
    }
    return data as Inmueble;
  } catch (err) {
    console.error('Exception updating inmueble:', err);
    return null;
  }
}

export async function deleteInmueble(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) {
    const index = MOCK_INMUEBLES.findIndex(i => i.id === id);
    if (index !== -1) {
      MOCK_INMUEBLES.splice(index, 1);
      return true;
    }
    return false;
  }

  try {
    const { error } = await supabase.from('inmuebles').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function getLeads(): Promise<LeadVender[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from('leads_vender')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data as LeadVender[];
  } catch {
    return [];
  }
}

export async function createLead(leadData: Partial<LeadVender>): Promise<boolean> {
  if (!isSupabaseConfigured) return true;
  try {
    const { error } = await supabase.from('leads_vender').insert([leadData]);
    return !error;
  } catch {
    return false;
  }
}

export const createLeadVender = createLead;
export const getLeadsVender = getLeads;

