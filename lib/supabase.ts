import { createClient } from '@supabase/supabase-js';
import { Inmueble, Categoria, Agente, Blog, LeadVender, MetricasEmpresa, SolicitudAsesoria } from '@/types/database';

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

// Fallback / Mock Data for instant preview 100% TARIJA
export const MOCK_CATEGORIAS: Categoria[] = [
  { id: '11111111-1111-1111-1111-111111111111', nombre_categoria: 'Venta', slug: 'venta' },
  { id: '22222222-2222-2222-2222-222222222222', nombre_categoria: 'Alquiler', slug: 'alquiler' },
  { id: '33333333-3333-3333-3333-333333333333', nombre_categoria: 'Anticrético', slug: 'anticretico' },
  { id: '44444444-4444-4444-4444-444444444444', nombre_categoria: 'Destacados', slug: 'destacados' },
];

export const MOCK_AGENTES: Agente[] = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    agent_name: 'Carlos Mendoza',
    slug: 'carlos-mendoza',
    cargo: 'Director Comercial & Broker Tarija',
    telefono: '+591 70000000',
    correo: 'carlos@inmobiliariakaizen.com',
    foto_principal: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    agent_name: 'Valeria Rios',
    slug: 'valeria-rios',
    cargo: 'Asesora Senior de Inversiones Tarija',
    telefono: '+591 70000000',
    correo: 'valeria@inmobiliariakaizen.com',
    foto_principal: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
  },
];

export const MOCK_INMUEBLES: Inmueble[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    inmueble_name: 'Residencia Moderna en Miraflores',
    slug: 'residencia-moderna-en-miraflores-tarija',
    direccion: 'Barrio Miraflores, Calle Las Rosas',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 185000,
    moneda: '$us',
    dormitorios: 4,
    banos: 3,
    terreno: 450,
    construccion: 320,
    estacionamientos: 2,
    frente: 15,
    descripcion: 'Exclusiva residencia en el prestigioso Barrio Miraflores de Tarija. Acabados de lujo, jardín privado con churrasquera, cocina equipada con isla de cuarzo y amplia máster suite con vestidor.',
    lat: -21.5398,
    lng: -64.7355,
    is_featured: true,
    is_rural: false,
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
    inmueble_name: 'Penthouse Panorámico en Aranjuez',
    slug: 'penthouse-panoramico-en-aranjuez-tarija',
    direccion: 'Av. Los Molles, Barrio Aranjuez',
    ciudad: 'Tarija',
    tipo: 'Departamento',
    precio: 145000,
    moneda: '$us',
    dormitorios: 3,
    banos: 3,
    terreno: 210,
    construccion: 210,
    estacionamientos: 2,
    frente: 0,
    descripcion: 'Penthouse con terraza privada y vista panorámica inigualable al Valle Central de Tarija. Incluye domótica, suite principal con hidromasaje y acceso a piscina comunitaria.',
    lat: -21.5285,
    lng: -64.7210,
    is_featured: true,
    is_rural: false,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    inmueble_name: 'Terreno Urbanizado en San Jerónimo',
    slug: 'terreno-urbanizado-en-san-jeronimo-tarija',
    direccion: 'Barrio San Jerónimo, Costanera del Guadalquivir',
    ciudad: 'Tarija',
    tipo: 'Terreno',
    precio: 75000,
    moneda: '$us',
    dormitorios: 0,
    banos: 0,
    terreno: 580,
    construccion: 0,
    estacionamientos: 0,
    frente: 18,
    descripcion: 'Lote completamente plano con todos los servicios básicos instalados a pasos de la Costanera del Guadalquivir. Zona de alta plusvalía residencial.',
    lat: -21.5420,
    lng: -64.7180,
    is_featured: true,
    is_rural: false,
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
    id: '00000000-0000-0000-0000-000000000004',
    inmueble_name: 'Casa Estilo Campestre en Tomatitas',
    slug: 'casa-estilo-campestre-en-tomatitas-tarija',
    direccion: 'Camino a Tomatitas, San Lorenzo',
    ciudad: 'San Lorenzo',
    tipo: 'Casa',
    precio: 125000,
    moneda: '$us',
    dormitorios: 3,
    banos: 2,
    terreno: 750,
    construccion: 240,
    estacionamientos: 3,
    frente: 20,
    descripcion: 'Hermosa propiedad campestre rodeada de vegetación, árboles frutales y microclima agradable. Perfecta para casa de fin de semana o vivienda permanente.',
    lat: -21.4850,
    lng: -64.7620,
    is_featured: false,
    is_rural: true,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    inmueble_name: 'Departamento en Alquiler en Barrio Senac',
    slug: 'departamento-en-alquiler-en-barrio-senac-tarija',
    direccion: 'Barrio Senac, Av. Principal',
    ciudad: 'Tarija',
    tipo: 'Departamento',
    precio: 480,
    moneda: '$us',
    dormitorios: 2,
    banos: 2,
    terreno: 95,
    construccion: 95,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Departamento moderno de 2 dormitorios totalmente amoblado. Edificio seguro con ascensor, cámaras de seguridad y excelente iluminación natural.',
    lat: -21.5470,
    lng: -64.7420,
    is_featured: false,
    is_rural: false,
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
    id: '00000000-0000-0000-0000-000000000006',
    inmueble_name: 'Oficina Corporativa en Alquiler - Zona Central',
    slug: 'oficina-corporativa-en-alquiler-zona-central-tarija',
    direccion: 'Calle Sucre esq. Virginio Lema, Zona Central',
    ciudad: 'Tarija',
    tipo: 'Oficina Comercial',
    precio: 650,
    moneda: '$us',
    dormitorios: 0,
    banos: 2,
    terreno: 120,
    construccion: 120,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Oficina comercial en el corazón financiero de Tarija. Planta libre, baño privado, recepción y sistema de climatización.',
    lat: -21.5320,
    lng: -64.7330,
    is_featured: false,
    is_rural: false,
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
    id: '00000000-0000-0000-0000-000000000007',
    inmueble_name: 'Anticrético Casa Familiar en Barrio Tabladita',
    slug: 'anticretico-casa-familiar-en-barrio-tabladita-tarija',
    direccion: 'Barrio Tabladita, Calle Los Sauces',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 35000,
    moneda: '$us',
    dormitorios: 3,
    banos: 2,
    terreno: 350,
    construccion: 220,
    estacionamientos: 2,
    frente: 12,
    descripcion: 'Excelente casa en anticrético. Totalmente saneada con Folio Real en Derechos Reales Tarija para inscripción preventiva de gravamen.',
    lat: -21.5510,
    lng: -64.7380,
    is_featured: true,
    is_rural: false,
    active: true,
    categoria_id: '33333333-3333-3333-3333-333333333333',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[2],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    inmueble_name: 'Anticrético Departamento en Barrio San Martín',
    slug: 'anticretico-departamento-en-barrio-san-martin-tarija',
    direccion: 'Barrio San Martín, a 2 cuadras de la Plaza',
    ciudad: 'Tarija',
    tipo: 'Departamento',
    precio: 22000,
    moneda: '$us',
    dormitorios: 2,
    banos: 1,
    terreno: 80,
    construccion: 80,
    estacionamientos: 1,
    frente: 0,
    descripcion: 'Departamento en planta baja en anticrético por 2 años forzosos. Cocina con cajonería alta y baja, roperos empotrados y patio de servicio.',
    lat: -21.5370,
    lng: -64.7260,
    is_featured: false,
    is_rural: false,
    active: true,
    categoria_id: '33333333-3333-3333-3333-333333333333',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[2],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    inmueble_name: 'Chalet de Lujo en San Mateo',
    slug: 'chalet-de-lujo-en-san-mateo-tarija',
    direccion: 'Zona San Mateo, Urbanización Los Álamos',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 230000,
    moneda: '$us',
    dormitorios: 5,
    banos: 4,
    terreno: 900,
    construccion: 380,
    estacionamientos: 4,
    frente: 25,
    descripcion: 'Chalet de ensueño con piscina templada, quincho techado, salón de juegos y extensos jardines. Documentación 100% al día en DDRR Tarija.',
    lat: -21.4980,
    lng: -64.7460,
    is_featured: true,
    is_rural: false,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    inmueble_name: 'Terreno en Zona Las Panizas',
    slug: 'terreno-en-zona-las-panizas-tarija',
    direccion: 'Las Panizas, a minutos del centro',
    ciudad: 'Tarija',
    tipo: 'Terreno',
    precio: 42000,
    moneda: '$us',
    dormitorios: 0,
    banos: 0,
    terreno: 420,
    construccion: 0,
    estacionamientos: 0,
    frente: 14,
    descripcion: 'Terreno con cerramiento perimetral, plano aprobado y línea de agua y luz en puerta. Alta proyección de revalorización en Tarija.',
    lat: -21.5580,
    lng: -64.7290,
    is_featured: false,
    is_rural: false,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000011',
    inmueble_name: 'Quinta Campestre en San Andrés',
    slug: 'quinta-campestre-en-san-andres-tarija',
    direccion: 'Comunidad San Andrés, Ruta de la Papa y Frutales',
    ciudad: 'Tarija',
    tipo: 'Casa',
    precio: 115000,
    moneda: '$us',
    dormitorios: 3,
    banos: 2,
    terreno: 2500,
    construccion: 180,
    estacionamientos: 4,
    frente: 35,
    descripcion: 'Hermosa quinta con casa de campo, huerta de frutales en producción, sistema de riego por goteo y vistas despejadas a la serranía de Sama.',
    lat: -21.5850,
    lng: -64.7890,
    is_featured: true,
    is_rural: true,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[0],
    imagenes: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: '00000000-0000-0000-0000-000000000012',
    inmueble_name: 'Finca Rústica y Viñedo en Uriondo',
    slug: 'finca-rustica-y-vinedo-en-uriondo-tarija',
    direccion: 'El Valle de la Concepción, Uriondo',
    ciudad: 'Uriondo',
    tipo: 'Terreno',
    precio: 195000,
    moneda: '$us',
    dormitorios: 2,
    banos: 2,
    terreno: 5000,
    construccion: 150,
    estacionamientos: 5,
    frente: 50,
    descripcion: 'Hermosa propiedad en la Ruta del Vino de Tarija con viñedos en producción, casa patronal y derecho de agua de riego permanente.',
    lat: -21.6850,
    lng: -64.6550,
    is_featured: true,
    is_rural: true,
    active: true,
    categoria_id: '11111111-1111-1111-1111-111111111111',
    agente_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    categoria: MOCK_CATEGORIAS[0],
    agente: MOCK_AGENTES[1],
    imagenes: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    ],
  },
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: '99999999-9999-9999-9999-999999999991',
    titulo: 'Guía definitiva para comprar tu primera vivienda en Tarija',
    slug: 'guia-definitiva-para-comprar-tu-primera-vivienda-en-tarija',
    resumen: 'Aprende los pasos esenciales, documentación legal requerida en DDRR Tarija y cómo acceder al crédito de vivienda social.',
    contenido: 'Comprar una casa o departamento en Tarija es un paso fundamental para consolidar tu patrimonio. En este artículo desglosamos la importancia de auditar el Folio Real en Derechos Reales de Tarija, verificar la ausencia de gravámenes e hipotecas ocultas y realizar la transferencia con plena seguridad jurídica.',
    foto_principal: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    portada: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    created_at: '2026-08-10T10:00:00Z',
    autor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    autor: MOCK_AGENTES[0],
    agente: MOCK_AGENTES[0],
  },
  {
    id: '99999999-9999-9999-9999-999999999992',
    titulo: 'Zonas con mayor plusvalía y rentabilidad inmobiliaria en Tarija',
    slug: 'zonas-con-mayor-plusvalia-y-rentabilidad-inmobiliaria-en-tarija',
    resumen: 'Conoce los barrios con mayor proyección de crecimiento y rentabilidad en Tarija: Miraflores, Aranjuez, San Mateo y San Jerónimo.',
    contenido: 'Análisis de la plusvalía en la ciudad de Tarija, zonas con mayor rentabilidad para inversión en alquiler tradicional o temporario y el impacto de los nuevos proyectos de urbanización y costaneras.',
    foto_principal: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    portada: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    created_at: '2026-08-12T14:30:00Z',
    autor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    autor: MOCK_AGENTES[1],
    agente: MOCK_AGENTES[1],
  },
];

export const MOCK_LEADS: LeadVender[] = [
  {
    id: 'lead-1',
    nombre: 'Roberto Vaca',
    telefono: '+591 71234567',
    email: 'roberto.vaca@email.com',
    tipo_inmueble: 'Casa Campestre',
    ubicacion: 'San Lorenzo, Tarija',
    precio_estimado: 120000,
    detalles: 'Quinta de media hectárea con agua de riego.',
    atendido: false,
    created_at: '2026-08-18T12:00:00Z',
  },
];

// In-memory store for newly added items during session
let inMemoryInmuebles = [...MOCK_INMUEBLES];
let inMemoryCategorias = [...MOCK_CATEGORIAS];
let inMemoryAgentes = [...MOCK_AGENTES];
let inMemoryBlogs = [...MOCK_BLOGS];
let inMemoryLeads = [...MOCK_LEADS];

// ==========================================
// INMUEBLES API
// ==========================================

export async function getInmuebles(options?: {
  categoriaSlug?: string;
  isFeatured?: boolean;
  featuredOnly?: boolean;
  isRural?: boolean;
  ruralOnly?: boolean;
  activeOnly?: boolean;
  limit?: number;
  offset?: number;
  ciudad?: string;
  tipo?: string;
  search?: string;
}): Promise<Inmueble[]> {
  const isFeaturedFilter = options?.featuredOnly ?? options?.isFeatured;
  const isRuralFilter = options?.ruralOnly ?? options?.isRural;

  if (!isSupabaseConfigured) {
    let result = [...inMemoryInmuebles];

    if (options?.categoriaSlug && options.categoriaSlug !== 'todos') {
      const slug = options.categoriaSlug.toLowerCase();
      if (slug === 'destacados') {
        result = result.filter((i) => i.is_featured);
      } else if (slug === 'area-rural') {
        result = result.filter((i) => i.is_rural);
      } else {
        result = result.filter((i) => i.categoria?.slug === slug);
      }
    }

    if (isFeaturedFilter !== undefined) {
      result = result.filter((i) => i.is_featured === isFeaturedFilter);
    }

    if (isRuralFilter !== undefined) {
      result = result.filter((i) => Boolean(i.is_rural) === isRuralFilter);
    }

    if (options?.activeOnly) {
      result = result.filter((i) => i.active !== false);
    }

    if (options?.ciudad && options.ciudad !== 'Todas' && options.ciudad !== 'Todos') {
      result = result.filter((i) => i.ciudad.toLowerCase() === options.ciudad?.toLowerCase());
    }

    if (options?.tipo && options.tipo !== 'Todos') {
      result = result.filter((i) => i.tipo.toLowerCase() === options.tipo?.toLowerCase());
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.inmueble_name.toLowerCase().includes(q) ||
          i.direccion.toLowerCase().includes(q) ||
          i.descripcion.toLowerCase().includes(q)
      );
    }

    const start = options?.offset || 0;
    const end = options?.limit ? start + options.limit : undefined;
    return result.slice(start, end);
  }

  try {
    let query = supabase
      .from('inmuebles')
      .select('*, categoria:categorias(*), agente:agentes(*)')
      .order('created_at', { ascending: false });

    if (isFeaturedFilter !== undefined) {
      query = query.eq('is_featured', isFeaturedFilter);
    }

    if (isRuralFilter !== undefined) {
      query = query.eq('is_rural', isRuralFilter);
    }

    if (options?.ciudad && options.ciudad !== 'Todas' && options.ciudad !== 'Todos') {
      query = query.ilike('ciudad', `%${options.ciudad}%`);
    }

    if (options?.tipo && options.tipo !== 'Todos') {
      query = query.eq('tipo', options.tipo);
    }

    if (options?.categoriaSlug && options.categoriaSlug !== 'todos') {
      if (options.categoriaSlug === 'destacados') {
        query = query.eq('is_featured', true);
      } else if (options.categoriaSlug === 'area-rural') {
        query = query.eq('is_rural', true);
      }
    }

    if (options?.limit) {
      const from = options.offset || 0;
      const to = from + options.limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as Inmueble[]) || [];
  } catch (err) {
    console.warn('Supabase getInmuebles error, using fallback mock data:', err);
    return inMemoryInmuebles;
  }
}

export async function countInmuebles(options?: {
  categoriaSlug?: string;
  isFeatured?: boolean;
  featuredOnly?: boolean;
  isRural?: boolean;
  ruralOnly?: boolean;
  activeOnly?: boolean;
}): Promise<number> {
  const isFeaturedFilter = options?.featuredOnly ?? options?.isFeatured;
  const isRuralFilter = options?.ruralOnly ?? options?.isRural;

  if (!isSupabaseConfigured) {
    let result = [...inMemoryInmuebles];
    if (options?.categoriaSlug && options.categoriaSlug !== 'todos') {
      if (options.categoriaSlug === 'destacados') {
        result = result.filter((i) => i.is_featured);
      } else if (options.categoriaSlug === 'area-rural') {
        result = result.filter((i) => i.is_rural);
      } else {
        result = result.filter((i) => i.categoria?.slug === options.categoriaSlug);
      }
    }
    if (isFeaturedFilter !== undefined) {
      result = result.filter((i) => i.is_featured === isFeaturedFilter);
    }
    if (isRuralFilter !== undefined) {
      result = result.filter((i) => Boolean(i.is_rural) === isRuralFilter);
    }
    return result.length;
  }

  try {
    let query = supabase.from('inmuebles').select('*', { count: 'exact', head: true });
    if (isFeaturedFilter !== undefined) {
      query = query.eq('is_featured', isFeaturedFilter);
    }
    if (isRuralFilter !== undefined) {
      query = query.eq('is_rural', isRuralFilter);
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  } catch (err) {
    console.warn('countInmuebles error:', err);
    return inMemoryInmuebles.length;
  }
}

export async function getInmuebleBySlug(slug: string): Promise<Inmueble | null> {
  if (!isSupabaseConfigured) {
    return inMemoryInmuebles.find((i) => i.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .select('*, categoria:categorias(*), agente:agentes(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Inmueble;
  } catch (err) {
    console.warn('getInmuebleBySlug error, searching in memory fallback:', err);
    return inMemoryInmuebles.find((i) => i.slug === slug) || null;
  }
}

export async function getInmuebleById(id: string): Promise<Inmueble | null> {
  if (!isSupabaseConfigured) {
    return inMemoryInmuebles.find((i) => i.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .select('*, categoria:categorias(*), agente:agentes(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Inmueble;
  } catch (err) {
    console.warn('getInmuebleById error, searching in memory:', err);
    return inMemoryInmuebles.find((i) => i.id === id) || null;
  }
}

export async function createInmueble(inmueble: Partial<Inmueble>): Promise<Inmueble> {
  const newItem: Inmueble = {
    id: `local-${Date.now()}`,
    inmueble_name: inmueble.inmueble_name || 'Inmueble sin nombre',
    slug: inmueble.slug || `inmueble-${Date.now()}`,
    precio: Number(inmueble.precio) || 0,
    moneda: inmueble.moneda || '$us',
    tipo: inmueble.tipo || 'Casa',
    ciudad: inmueble.ciudad || 'Tarija',
    direccion: inmueble.direccion || 'Tarija, Bolivia',
    dormitorios: Number(inmueble.dormitorios) || 0,
    banos: Number(inmueble.banos) || 0,
    estacionamientos: Number(inmueble.estacionamientos) || 0,
    construccion: Number(inmueble.construccion) || 0,
    terreno: Number(inmueble.terreno) || 0,
    frente: Number(inmueble.frente) || 0,
    descripcion: inmueble.descripcion || '',
    lat: Number(inmueble.lat) || -21.5355,
    lng: Number(inmueble.lng) || -64.7296,
    categoria_id: inmueble.categoria_id || MOCK_CATEGORIAS[0].id,
    agente_id: inmueble.agente_id || MOCK_AGENTES[0].id,
    imagenes: inmueble.imagenes || [],
    is_featured: Boolean(inmueble.is_featured),
    is_rural: Boolean(inmueble.is_rural),
    active: true,
    created_at: new Date().toISOString(),
  };

  if (!isSupabaseConfigured) {
    inMemoryInmuebles.unshift(newItem);
    return newItem;
  }

  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .insert([inmueble])
      .select()
      .single();

    if (error) throw error;
    return data as Inmueble;
  } catch (err) {
    console.warn('createInmueble error, adding to memory:', err);
    inMemoryInmuebles.unshift(newItem);
    return newItem;
  }
}

export async function updateInmueble(id: string, updates: Partial<Inmueble>): Promise<Inmueble> {
  if (!isSupabaseConfigured) {
    const index = inMemoryInmuebles.findIndex((i) => i.id === id);
    if (index !== -1) {
      inMemoryInmuebles[index] = { ...inMemoryInmuebles[index], ...updates };
      return inMemoryInmuebles[index];
    }
    throw new Error('Inmueble no encontrado');
  }

  try {
    const { data, error } = await supabase
      .from('inmuebles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Inmueble;
  } catch (err) {
    console.warn('updateInmueble error:', err);
    const index = inMemoryInmuebles.findIndex((i) => i.id === id);
    if (index !== -1) {
      inMemoryInmuebles[index] = { ...inMemoryInmuebles[index], ...updates };
      return inMemoryInmuebles[index];
    }
    throw err;
  }
}

export async function deleteInmueble(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) {
    inMemoryInmuebles = inMemoryInmuebles.filter((i) => i.id !== id);
    return true;
  }

  try {
    const { error } = await supabase.from('inmuebles').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('deleteInmueble error:', err);
    inMemoryInmuebles = inMemoryInmuebles.filter((i) => i.id !== id);
    return true;
  }
}

// ==========================================
// CATEGORIAS & AGENTES API
// ==========================================

export async function getCategorias(): Promise<Categoria[]> {
  if (!isSupabaseConfigured) return inMemoryCategorias;
  try {
    const { data, error } = await supabase.from('categorias').select('*').order('nombre_categoria');
    if (error) throw error;
    return data || [];
  } catch {
    return inMemoryCategorias;
  }
}

export async function getAgentes(): Promise<Agente[]> {
  if (!isSupabaseConfigured) return inMemoryAgentes;
  try {
    const { data, error } = await supabase.from('agentes').select('*').order('agent_name');
    if (error) throw error;
    return data || [];
  } catch {
    return inMemoryAgentes;
  }
}

// ==========================================
// BLOGS API
// ==========================================

export async function getBlogs(limit?: number): Promise<Blog[]> {
  if (!isSupabaseConfigured) {
    const list = limit ? inMemoryBlogs.slice(0, limit) : inMemoryBlogs;
    return list.map((b) => ({ ...b, portada: b.portada || b.foto_principal, agente: b.agente || b.autor }));
  }
  try {
    let query = supabase.from('blogs').select('*, autor:agentes(*)').order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map((b: any) => ({
      ...b,
      portada: b.portada || b.foto_principal,
      agente: b.agente || b.autor,
    }));
  } catch {
    return (limit ? inMemoryBlogs.slice(0, limit) : inMemoryBlogs).map((b) => ({
      ...b,
      portada: b.portada || b.foto_principal,
      agente: b.agente || b.autor,
    }));
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!isSupabaseConfigured) {
    const b = inMemoryBlogs.find((b) => b.slug === slug);
    return b ? { ...b, portada: b.portada || b.foto_principal, agente: b.agente || b.autor } : null;
  }
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, autor:agentes(*)')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data
      ? {
          ...data,
          portada: data.portada || data.foto_principal,
          agente: data.agente || data.autor,
        }
      : null;
  } catch {
    const b = inMemoryBlogs.find((b) => b.slug === slug);
    return b ? { ...b, portada: b.portada || b.foto_principal, agente: b.agente || b.autor } : null;
  }
}

// ==========================================
// LEADS VENDER API
// ==========================================

export async function getLeads(): Promise<LeadVender[]> {
  if (!isSupabaseConfigured) return inMemoryLeads;
  try {
    const { data, error } = await supabase.from('leads_vender').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch {
    return inMemoryLeads;
  }
}

export async function createLeadVender(lead: LeadVender): Promise<boolean> {
  if (!isSupabaseConfigured) {
    inMemoryLeads.unshift({ ...lead, id: `lead-${Date.now()}`, created_at: new Date().toISOString() });
    return true;
  }
  try {
    const { error } = await supabase.from('leads_vender').insert([lead]);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('createLeadVender error, registrado:', err);
    inMemoryLeads.unshift({ ...lead, id: `lead-${Date.now()}`, created_at: new Date().toISOString() });
    return true;
  }
}

// ==========================================
// METRICAS & DATOS RELEVANTES API
// ==========================================

export const MOCK_METRICAS: MetricasEmpresa = {
  id: '88888888-8888-8888-8888-888888888888',
  propiedades_transaccionadas: 180,
  propiedades_transaccionadas_label: 'Propiedades Transaccionadas',
  propiedades_transaccionadas_sub: 'Casas, departamentos y lotes cerrados con éxito',
  
  hectareas_gestionadas: 60,
  hectareas_gestionadas_label: 'Terrenos y Lotes Gestionados',
  hectareas_gestionadas_sub: 'Fuerte presencia en áreas de expansión y campo en Tarija',
  
  dias_promedio_colocacion: 35,
  dias_promedio_colocacion_label: 'Tiempo Promedio de Colocación',
  dias_promedio_colocacion_sub: 'Eficiencia y agilidad para quien busca vender o alquilar',
  
  seguridad_juridica_porcentaje: 100,
  seguridad_juridica_label: 'Seguridad Jurídica y Respaldo',
  seguridad_juridica_sub: 'Tranquilidad en trámites legales y Derechos Reales',
  
  updated_at: '2026-08-20T12:00:00Z',
};

let inMemoryMetricas: MetricasEmpresa = { ...MOCK_METRICAS };

export async function getMetricas(): Promise<MetricasEmpresa> {
  if (!isSupabaseConfigured) {
    return inMemoryMetricas;
  }

  try {
    const { data, error } = await supabase
      .from('metricas_empresa')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.warn('getMetricas query error, using fallback:', error);
      return inMemoryMetricas;
    }

    return data as MetricasEmpresa;
  } catch (err) {
    console.warn('getMetricas error:', err);
    return inMemoryMetricas;
  }
}

export async function updateMetricas(updates: Partial<MetricasEmpresa>): Promise<MetricasEmpresa> {
  inMemoryMetricas = { ...inMemoryMetricas, ...updates, updated_at: new Date().toISOString() };

  if (!isSupabaseConfigured) {
    return inMemoryMetricas;
  }

  try {
    const { data, error } = await supabase
      .from('metricas_empresa')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', inMemoryMetricas.id || '88888888-8888-8888-8888-888888888888')
      .select()
      .single();

    if (error) throw error;
    return data as MetricasEmpresa;
  } catch (err) {
    console.warn('updateMetricas error:', err);
    return inMemoryMetricas;
  }
}

// ==========================================
// SOLICITUDES DE ASESORIA API
// ==========================================

export const MOCK_SOLICITUDES_ASESORIA: SolicitudAsesoria[] = [
  {
    id: 'ase-1',
    nombre: 'Gonzalo Morales',
    telefono: '+591 72987654',
    email: 'gonzalo.morales@email.com',
    interes: 'Comprar',
    zona_interes: 'Área Rural / Fincas',
    tipo_inmueble: 'Finca / Quinta',
    presupuesto: '$us 80,000 - $us 150,000',
    mensaje: 'Busco terreno o pequeña finca en Uriondo con agua de riego para viñedo familiar.',
    atendido: false,
    created_at: '2026-08-19T16:00:00Z',
  },
  {
    id: 'ase-2',
    nombre: 'Mariana Gutierrez',
    telefono: '+591 71239876',
    email: 'mariana.gtz@email.com',
    interes: 'Anticrético',
    zona_interes: 'Ciudad de Tarija',
    tipo_inmueble: 'Departamento',
    presupuesto: '$us 20,000 - $us 30,000',
    mensaje: 'Busco departamento de 2 o 3 dormitorios en Miraflores o Aranjuez.',
    atendido: true,
    created_at: '2026-08-18T10:30:00Z',
  },
];

let inMemorySolicitudesAsesoria: SolicitudAsesoria[] = [...MOCK_SOLICITUDES_ASESORIA];

export async function getSolicitudesAsesoria(): Promise<SolicitudAsesoria[]> {
  if (!isSupabaseConfigured) return inMemorySolicitudesAsesoria;
  try {
    const { data, error } = await supabase
      .from('solicitudes_asesoria')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('getSolicitudesAsesoria error, using memory fallback:', err);
    return inMemorySolicitudesAsesoria;
  }
}

export async function createSolicitudAsesoria(solicitud: SolicitudAsesoria): Promise<boolean> {
  const newSolicitud: SolicitudAsesoria = {
    ...solicitud,
    id: `ase-${Date.now()}`,
    atendido: false,
    created_at: new Date().toISOString(),
  };

  if (!isSupabaseConfigured) {
    inMemorySolicitudesAsesoria.unshift(newSolicitud);
    return true;
  }

  try {
    const { error } = await supabase.from('solicitudes_asesoria').insert([solicitud]);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('createSolicitudAsesoria error, fallback local:', err);
    inMemorySolicitudesAsesoria.unshift(newSolicitud);
    return true;
  }
}

export async function updateSolicitudAsesoria(id: string, updates: Partial<SolicitudAsesoria>): Promise<boolean> {
  const idx = inMemorySolicitudesAsesoria.findIndex((s) => s.id === id);
  if (idx !== -1) {
    inMemorySolicitudesAsesoria[idx] = { ...inMemorySolicitudesAsesoria[idx], ...updates };
  }

  if (!isSupabaseConfigured) return true;

  try {
    const { error } = await supabase.from('solicitudes_asesoria').update(updates).eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('updateSolicitudAsesoria error:', err);
    return true;
  }
}


