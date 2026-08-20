-- ==============================================================================
-- KAIZEN BIENES RAÍCES - LIMPIEZA, ESTRUCTURA Y DATOS 100% TARIJA (CON ÁREA RURAL)
-- ==============================================================================
-- Este script elimina de forma segura las tablas anteriores e instala el
-- nuevo schema completo con las 12 propiedades, agentes de Tarija y soporte rural.

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. LIMPIEZA COMPLETA DE TABLAS ANTERIORES
DROP TABLE IF EXISTS public.metricas_empresa CASCADE;
DROP TABLE IF EXISTS public.leads_vender CASCADE;
DROP TABLE IF EXISTS public.blogs CASCADE;
DROP TABLE IF EXISTS public.inmuebles CASCADE;
DROP TABLE IF EXISTS public.agentes CASCADE;
DROP TABLE IF EXISTS public.categorias CASCADE;

-- 2. TABLA: CATEGORIAS (Operaciones Inmobiliarias)
CREATE TABLE public.categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_categoria TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA: AGENTES (Equipo Inmobiliario KAIZEN Tarija)
CREATE TABLE public.agentes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    cargo TEXT,
    telefono TEXT NOT NULL,
    correo TEXT,
    foto_principal TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA: INMUEBLES (Catálogo de Propiedades en Tarija + Área Rural)
CREATE TABLE public.inmuebles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inmueble_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    precio NUMERIC(15, 2) NOT NULL,
    moneda TEXT DEFAULT '$us' NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('Casa', 'Departamento', 'Terreno', 'Oficina Comercial')),
    ciudad TEXT NOT NULL CHECK (ciudad IN ('Tarija', 'San Lorenzo', 'Uriondo', 'Bermejo', 'Yacuiba', 'Villa Montes')),
    direccion TEXT NOT NULL,
    dormitorios INTEGER DEFAULT 0 NOT NULL,
    banos INTEGER DEFAULT 0 NOT NULL,
    estacionamientos INTEGER DEFAULT 0,
    construccion NUMERIC(10, 2),
    terreno NUMERIC(10, 2) NOT NULL,
    frente NUMERIC(10, 2),
    descripcion TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    categoria_id UUID NOT NULL REFERENCES public.categorias(id) ON DELETE RESTRICT,
    agente_id UUID NOT NULL REFERENCES public.agentes(id) ON DELETE RESTRICT,
    imagenes TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    is_rural BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLA: BLOGS (Artículos del Mercado Inmobiliario en Tarija)
CREATE TABLE public.blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    resumen TEXT,
    contenido TEXT NOT NULL,
    foto_principal TEXT,
    autor_id UUID REFERENCES public.agentes(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABLA: LEADS_VENDER (Captación de Propiedades en Tarija)
CREATE TABLE public.leads_vender (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT,
    tipo_inmueble TEXT NOT NULL,
    ubicacion TEXT NOT NULL,
    precio_estimado NUMERIC(15, 2),
    detalles TEXT,
    atendido BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TABLA: METRICAS_EMPRESA (Datos Relevantes y Tracción de KAIZEN)
CREATE TABLE public.metricas_empresa (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    propiedades_transaccionadas INTEGER DEFAULT 180 NOT NULL,
    propiedades_transaccionadas_label TEXT DEFAULT 'Propiedades Transaccionadas' NOT NULL,
    propiedades_transaccionadas_sub TEXT DEFAULT 'Casas, departamentos y lotes cerrados con éxito en Tarija' NOT NULL,
    
    hectareas_gestionadas INTEGER DEFAULT 60 NOT NULL,
    hectareas_gestionadas_label TEXT DEFAULT 'Terrenos y Lotes Gestionados' NOT NULL,
    hectareas_gestionadas_sub TEXT DEFAULT 'Fuerte presencia en áreas de expansión urbana y campo' NOT NULL,
    
    dias_promedio_colocacion INTEGER DEFAULT 35 NOT NULL,
    dias_promedio_colocacion_label TEXT DEFAULT 'Tiempo Promedio de Colocación' NOT NULL,
    dias_promedio_colocacion_sub TEXT DEFAULT 'Eficiencia y agilidad para quien busca vender o alquilar' NOT NULL,
    
    seguridad_juridica_porcentaje INTEGER DEFAULT 100 NOT NULL,
    seguridad_juridica_label TEXT DEFAULT 'Seguridad Jurídica y Respaldo' NOT NULL,
    seguridad_juridica_sub TEXT DEFAULT 'Tranquilidad en trámites legales y Derechos Reales' NOT NULL,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- SEGURIDAD Y POLÍTICAS RLS (Row Level Security)
-- ==============================================================================

ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inmuebles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads_vender ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metricas_empresa ENABLE ROW LEVEL SECURITY;

-- Políticas de Lectura Pública
CREATE POLICY "Lectura pública de categorías" ON public.categorias FOR SELECT USING (true);
CREATE POLICY "Lectura pública de agentes" ON public.agentes FOR SELECT USING (true);
CREATE POLICY "Lectura pública de inmuebles" ON public.inmuebles FOR SELECT USING (true);
CREATE POLICY "Lectura pública de blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Lectura pública de metricas" ON public.metricas_empresa FOR SELECT USING (true);

-- Escritura pública para captación de leads
CREATE POLICY "Inserción pública de leads de venta" ON public.leads_vender FOR INSERT WITH CHECK (true);

-- Políticas completas para usuarios autenticados (Gestor CMS / Admin)
CREATE POLICY "Control total autenticado categorias" ON public.categorias FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Control total autenticado agentes" ON public.agentes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Control total autenticado inmuebles" ON public.inmuebles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Control total autenticado blogs" ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Control total autenticado leads" ON public.leads_vender FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Control total autenticado metricas" ON public.metricas_empresa FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- INSERCIÓN DE DATOS 100% TARIJA (SEED DATA CON PROPIEDADES RURALES)
-- ==============================================================================

-- 1. Categorías
INSERT INTO public.categorias (id, nombre_categoria, slug, descripcion) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Venta', 'venta', 'Propiedades disponibles para compra y transferencia de dominio en Tarija'),
  ('22222222-2222-2222-2222-222222222222', 'Alquiler', 'alquiler', 'Casas, departamentos y oficinas en alquiler en Tarija'),
  ('33333333-3333-3333-3333-333333333333', 'Anticrético', 'anticretico', 'Contratos de anticrético respaldados por registro en Derechos Reales Tarija'),
  ('44444444-4444-4444-4444-444444444444', 'Destacados', 'destacados', 'Selección de propiedades exclusivas de alta plusvalía en Tarija');

-- 2. Agentes de Tarija
INSERT INTO public.agentes (id, agent_name, slug, cargo, telefono, correo, foto_principal) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Carlos Mendoza', 'carlos-mendoza', 'Director Comercial & Broker Tarija', '+591 70000000', 'carlos@inmobiliariakaizen.com', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Valeria Rios', 'valeria-rios', 'Asesora Senior de Inversiones Tarija', '+591 70000000', 'valeria@inmobiliariakaizen.com', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80');

-- 3. 12 Inmuebles en Tarija (Incluyendo Selección Especial de Área Rural)
INSERT INTO public.inmuebles (
    id, inmueble_name, slug, precio, moneda, tipo, ciudad, direccion,
    dormitorios, banos, estacionamientos, construccion, terreno, frente,
    descripcion, lat, lng, categoria_id, agente_id, imagenes, is_featured, is_rural
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'Residencia Moderna en Miraflores',
    'residencia-moderna-en-miraflores-tarija',
    185000,
    '$us',
    'Casa',
    'Tarija',
    'Barrio Miraflores, Calle Las Rosas',
    4, 3, 2, 320, 450, 15,
    'Exclusiva residencia en el prestigioso Barrio Miraflores de Tarija. Acabados de lujo, jardín privado con churrasquera, cocina equipada con isla de cuarzo y amplia máster suite con vestidor.',
    -21.5398,
    -64.7355,
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    ARRAY[
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80'
    ],
    true,
    false
),
(
    '00000000-0000-0000-0000-000000000002',
    'Penthouse Panorámico en Aranjuez',
    'penthouse-panoramico-en-aranjuez-tarija',
    145000,
    '$us',
    'Departamento',
    'Tarija',
    'Av. Los Molles, Barrio Aranjuez',
    3, 3, 2, 210, 210, 0,
    'Penthouse con terraza privada y vista panorámica inigualable al Valle Central de Tarija. Incluye domótica, suite principal con hidromasaje y acceso a piscina comunitaria.',
    -21.5285,
    -64.7210,
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    ARRAY[
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80'
    ],
    true,
    false
),
(
    '00000000-0000-0000-0000-000000000003',
    'Terreno Urbanizado en San Jerónimo',
    'terreno-urbanizado-en-san-jeronimo-tarija',
    75000,
    '$us',
    'Terreno',
    'Tarija',
    'Barrio San Jerónimo, Costanera del Guadalquivir',
    0, 0, 0, 0, 580, 18,
    'Lote completamente plano con todos los servicios básicos instalados a pasos de la Costanera del Guadalquivir. Zona de alta plusvalía residencial.',
    -21.5420,
    -64.7180,
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    ARRAY[
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80'
    ],
    true,
    false
),
(
    '00000000-0000-0000-0000-000000000004',
    'Casa Estilo Campestre en Tomatitas',
    'casa-estilo-campestre-en-tomatitas-tarija',
    125000,
    '$us',
    'Casa',
    'San Lorenzo',
    'Camino a Tomatitas, San Lorenzo',
    3, 2, 3, 240, 750, 20,
    'Hermosa propiedad campestre rodeada de vegetación, árboles frutales y microclima agradable. Perfecta para casa de fin de semana o vivienda permanente.',
    -21.4850,
    -64.7620,
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    ARRAY[
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80'
    ],
    false,
    true
),
(
    '00000000-0000-0000-0000-000000000005',
    'Departamento en Alquiler en Barrio Senac',
    'departamento-en-alquiler-en-barrio-senac-tarija',
    480,
    '$us',
    'Departamento',
    'Tarija',
    'Barrio Senac, Av. Principal',
    2, 2, 1, 95, 95, 0,
    'Departamento moderno de 2 dormitorios totalmente amoblado. Edificio seguro con ascensor, cámaras de seguridad y excelente iluminación natural.',
    -21.5470,
    -64.7420,
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    ARRAY[
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80'
    ],
    false,
    false
),
(
    '00000000-0000-0000-0000-000000000006',
    'Oficina Corporativa en Alquiler - Zona Central',
    'oficina-corporativa-en-alquiler-zona-central-tarija',
    650,
    '$us',
    'Oficina Comercial',
    'Tarija',
    'Calle Sucre esq. Virginio Lema, Zona Central',
    0, 2, 1, 120, 120, 0,
    'Oficina comercial en el corazón financiero de Tarija. Planta libre, baño privado, recepción y sistema de climatización.',
    -21.5320,
    -64.7330,
    '22222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    ARRAY[
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80'
    ],
    false,
    false
),
(
    '00000000-0000-0000-0000-000000000007',
    'Anticrético Casa Familiar en Barrio Tabladita',
    'anticretico-casa-familiar-en-barrio-tabladita-tarija',
    35000,
    '$us',
    'Casa',
    'Tarija',
    'Barrio Tabladita, Calle Los Sauces',
    3, 2, 2, 220, 350, 12,
    'Excelente casa en anticrético. Totalmente saneada con Folio Real en Derechos Reales Tarija para inscripción preventiva de gravamen.',
    -21.5510,
    -64.7380,
    '33333333-3333-3333-3333-333333333333',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    ARRAY[
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80'
    ],
    true,
    false
),
(
    '00000000-0000-0000-0000-000000000008',
    'Anticrético Departamento en Barrio San Martín',
    'anticretico-departamento-en-barrio-san-martin-tarija',
    22000,
    '$us',
    'Departamento',
    'Tarija',
    'Barrio San Martín, a 2 cuadras de la Plaza',
    2, 1, 1, 80, 80, 0,
    'Departamento en planta baja en anticrético por 2 años forzosos. Cocina con cajonería alta y baja, roperos empotrados y patio de servicio.',
    -21.5370,
    -64.7260,
    '33333333-3333-3333-3333-333333333333',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    ARRAY[
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80'
    ],
    false,
    false
),
(
    '00000000-0000-0000-0000-000000000009',
    'Chalet de Lujo en San Mateo',
    'chalet-de-lujo-en-san-mateo-tarija',
    230000,
    '$us',
    'Casa',
    'Tarija',
    'Zona San Mateo, Urbanización Los Álamos',
    5, 4, 4, 380, 900, 25,
    'Chalet de ensueño con piscina templada, quincho techado, salón de juegos y extensos jardines. Documentación 100% al día en DDRR Tarija.',
    -21.4980,
    -64.7460,
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    ARRAY[
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80'
    ],
    true,
    false
),
(
    '00000000-0000-0000-0000-000000000010',
    'Terreno en Zona Las Panizas',
    'terreno-en-zona-las-panizas-tarija',
    42000,
    '$us',
    'Terreno',
    'Tarija',
    'Las Panizas, a minutos del centro',
    0, 0, 0, 0, 420, 14,
    'Terreno con cerramiento perimetral, plano aprobado y línea de agua y luz en puerta. Alta proyección de revalorización en Tarija.',
    -21.5580,
    -64.7290,
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    ARRAY[
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80'
    ],
    false,
    false
),
(
    '00000000-0000-0000-0000-000000000011',
    'Quinta Campestre en San Andrés',
    'quinta-campestre-en-san-andres-tarija',
    115000,
    '$us',
    'Casa',
    'Tarija',
    'Comunidad San Andrés, Ruta de la Papa y Frutales',
    3, 2, 4, 180, 2500, 35,
    'Hermosa quinta con casa de campo, huerta de frutales en producción, sistema de riego por goteo y vistas despejadas a la serranía de Sama.',
    -21.5850,
    -64.7890,
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    ARRAY[
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80'
    ],
    true,
    true
),
(
    '00000000-0000-0000-0000-000000000012',
    'Finca Rústica y Viñedo en Uriondo',
    'finca-rustica-y-vinedo-en-uriondo-tarija',
    195000,
    '$us',
    'Terreno',
    'Uriondo',
    'El Valle de la Concepción, Uriondo',
    2, 2, 5, 150, 5000, 50,
    'Hermosa propiedad en la Ruta del Vino de Tarija con viñedos en producción, casa patronal y derecho de agua de riego permanente.',
    -21.6850,
    -64.6550,
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    ARRAY[
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'
    ],
    true,
    true
);

-- 4. Artículos de Blog Inmobiliario Tarija
INSERT INTO public.blogs (id, titulo, slug, resumen, contenido, foto_principal, autor_id) VALUES
(
    '99999999-9999-9999-9999-999999999991',
    'Guía definitiva para comprar tu primera vivienda en Tarija',
    'guia-definitiva-para-comprar-tu-primera-vivienda-en-tarija',
    'Aprende los pasos esenciales, documentación legal requerida en DDRR Tarija y cómo acceder al crédito de vivienda social.',
    'Comprar una casa o departamento en Tarija es un paso fundamental para consolidar tu patrimonio. En este artículo desglosamos la importancia de auditar el Folio Real en Derechos Reales de Tarija, verificar la ausencia de gravámenes e hipotecas ocultas y realizar la transferencia con plena seguridad jurídica.',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
),
(
    '99999999-9999-9999-9999-999999999992',
    'Zonas con mayor plusvalía y rentabilidad inmobiliaria en Tarija',
    'zonas-con-mayor-plusvalia-y-rentabilidad-inmobiliaria-en-tarija',
    'Conoce los barrios con mayor proyección de crecimiento y rentabilidad en Tarija: Miraflores, Aranjuez, San Mateo y San Jerónimo.',
    'Análisis de la plusvalía en la ciudad de Tarija, zonas con mayor rentabilidad para inversión en alquiler tradicional o temporario y el impacto de los nuevos proyectos de urbanización y costaneras.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
);

-- 5. Métricas y Datos Relevantes KAIZEN
INSERT INTO public.metricas_empresa (
    id,
    propiedades_transaccionadas,
    propiedades_transaccionadas_label,
    propiedades_transaccionadas_sub,
    hectareas_gestionadas,
    hectareas_gestionadas_label,
    hectareas_gestionadas_sub,
    dias_promedio_colocacion,
    dias_promedio_colocacion_label,
    dias_promedio_colocacion_sub,
    seguridad_juridica_porcentaje,
    seguridad_juridica_label,
    seguridad_juridica_sub
) VALUES (
    '88888888-8888-8888-8888-888888888888',
    180,
    'Propiedades Transaccionadas',
    'Casas, departamentos y lotes cerrados con éxito en Tarija',
    60,
    'Terrenos y Lotes Gestionados',
    'Fuerte presencia en áreas de expansión urbana y campo',
    35,
    'Tiempo Promedio de Colocación',
    'Eficiencia y agilidad para quien busca vender o alquilar',
    100,
    'Seguridad Jurídica y Respaldo',
    'Tranquilidad en trámites legales y Derechos Reales'
);
