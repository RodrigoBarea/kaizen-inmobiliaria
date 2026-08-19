-- ==============================================================================
-- SCHEMA SUPABASE: PORTAL INMOBILIARIO KAIZEN
-- ==============================================================================
-- Ejecuta este script en el SQL Editor de tu proyecto de Supabase.

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA: CATEGORIAS (Venta, Alquiler, Anticrético, etc.)
CREATE TABLE IF NOT EXISTS public.categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_categoria TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA: AGENTES
CREATE TABLE IF NOT EXISTS public.agentes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    cargo TEXT DEFAULT 'Asesor Inmobiliario',
    telefono TEXT NOT NULL,
    correo TEXT,
    foto_principal TEXT, -- URL Cloudinary
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA: INMUEBLES
CREATE TABLE IF NOT EXISTS public.inmuebles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inmueble_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    direccion TEXT NOT NULL,
    ciudad TEXT NOT NULL CHECK (ciudad IN ('Tarija', 'Santa Cruz', 'La Paz', 'Cochabamba', 'Bermejo', 'Yacuiba', 'Sucre', 'Potosi', 'Oruro', 'Beni', 'Pando')),
    tipo TEXT NOT NULL CHECK (tipo IN ('Casa', 'Departamento', 'Terreno', 'Lote', 'Tienda Comercial', 'Edificio', 'Oficina')),
    precio NUMERIC(14,2) NOT NULL,
    dormitorios INT DEFAULT 0,
    banos INT DEFAULT 0,
    terreno NUMERIC(10,2) DEFAULT 0,
    construccion NUMERIC(10,2) DEFAULT 0,
    estacionamientos INT DEFAULT 0,
    frente NUMERIC(10,2) DEFAULT 0,
    descripcion TEXT,
    lat DOUBLE PRECISION DEFAULT -21.5355,
    lng DOUBLE PRECISION DEFAULT -64.7296,
    is_featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
    agente_id UUID REFERENCES public.agentes(id) ON DELETE SET NULL,
    imagenes JSONB DEFAULT '[]'::jsonb, -- Array de strings con URLs de Cloudinary
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLA: BLOGS
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    contenido TEXT NOT NULL,
    portada TEXT, -- URL Cloudinary
    active BOOLEAN DEFAULT true,
    agente_id UUID REFERENCES public.agentes(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABLA: LEADS / CONTACTOS PARA VENDER
CREATE TABLE IF NOT EXISTS public.leads_vender (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT,
    tipo_inmueble TEXT NOT NULL,
    ubicacion TEXT NOT NULL,
    precio_estimado NUMERIC(14,2),
    detalles TEXT,
    atendido BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ÍNDICES DE RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_inmuebles_slug ON public.inmuebles(slug);
CREATE INDEX IF NOT EXISTS idx_inmuebles_active ON public.inmuebles(active);
CREATE INDEX IF NOT EXISTS idx_inmuebles_featured ON public.inmuebles(is_featured);
CREATE INDEX IF NOT EXISTS idx_inmuebles_categoria ON public.inmuebles(categoria_id);
CREATE INDEX IF NOT EXISTS idx_inmuebles_ciudad ON public.inmuebles(ciudad);
CREATE INDEX IF NOT EXISTS idx_inmuebles_precio ON public.inmuebles(precio);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);

-- 8. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY)
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inmuebles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads_vender ENABLE ROW LEVEL SECURITY;

-- Políticas de Lectura Pública (Cualquier visitante puede ver inmuebles activos, categorías, agentes y blogs)
CREATE POLICY "Lectura pública de categorías" ON public.categorias FOR SELECT USING (true);
CREATE POLICY "Lectura pública de agentes" ON public.agentes FOR SELECT USING (true);
CREATE POLICY "Lectura pública de inmuebles" ON public.inmuebles FOR SELECT USING (active = true OR auth.role() = 'authenticated');
CREATE POLICY "Lectura pública de blogs" ON public.blogs FOR SELECT USING (active = true OR auth.role() = 'authenticated');

-- Permitir a visitantes enviar formulario de vender
CREATE POLICY "Envio de formulario vender anonimo" ON public.leads_vender FOR INSERT WITH CHECK (true);

-- Políticas de Administración (CRUD total para usuarios autenticados o con clave)
CREATE POLICY "Admin CRUD categorias" ON public.categorias FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD agentes" ON public.agentes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD inmuebles" ON public.inmuebles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD blogs" ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD leads_vender" ON public.leads_vender FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- (Opcional) Política permisiva para inserción si se opera con API anon durante desarrollo inicial:
CREATE POLICY "Anon insercion inmuebles dev" ON public.inmuebles FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon actualizacion inmuebles dev" ON public.inmuebles FOR UPDATE TO anon USING (true);
CREATE POLICY "Anon eliminacion inmuebles dev" ON public.inmuebles FOR DELETE TO anon USING (true);
CREATE POLICY "Anon CRUD categorias dev" ON public.categorias FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon CRUD agentes dev" ON public.agentes FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon CRUD blogs dev" ON public.blogs FOR ALL TO anon USING (true) WITH CHECK (true);

-- 9. DATOS SEMILLA (SEED DATA)
INSERT INTO public.categorias (id, nombre_categoria, slug) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Venta', 'venta'),
  ('22222222-2222-2222-2222-222222222222', 'Alquiler', 'alquiler'),
  ('33333333-3333-3333-3333-333333333333', 'Anticrético', 'anticretico')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.agentes (id, agent_name, slug, cargo, telefono, correo, foto_principal) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Carlos Mendoza', 'carlos-mendoza', 'Director Comercial & Broker', '+591 70000000', 'carlos@inmobiliariakaizen.com', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Valeria Rios', 'valeria-rios', 'Asesora Senior de Inversiones', '+591 70000000', 'valeria@inmobiliariakaizen.com', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.inmuebles (
    id, inmueble_name, slug, direccion, ciudad, tipo, precio, dormitorios, banos, terreno, construccion, estacionamientos, frente, descripcion, lat, lng, is_featured, active, categoria_id, agente_id, imagenes
) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Hermosa Casa Moderna en Barrio Miraflores',
    'hermosa-casa-moderna-en-barrio-miraflores',
    'Av. Las Palmeras #450, Barrio Miraflores',
    'Tarija',
    'Casa',
    185000,
    4,
    3,
    350,
    280,
    2,
    14,
    'Espectacular residencia moderna de 2 plantas con finos acabados, amplio jardín con churrasquera techada, suite principal con vestidor y balcón panorámico. Cocina equipada con isla de cuarzo y muebles empotrados de primera calidad.',
    -21.5355,
    -64.7296,
    true,
    true,
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Departamento de Lujo en Equipetrol',
    'departamento-de-lujo-en-equipetrol',
    'Calle 8 Este, Barrio Equipetrol',
    'Santa Cruz',
    'Departamento',
    145000,
    3,
    2,
    140,
    140,
    1,
    0,
    'Exclusivo departamento en piso alto con vista panorámica. Edificio inteligente con piscina infinita, gimnasio equipado, salón de eventos y seguridad 24/7. Acabados importados y domótica integrada.',
    -17.7712,
    -63.1950,
    true,
    true,
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Casa en Alquiler Zona San Gerónimo',
    'casa-en-alquiler-zona-san-geronimo',
    'Zona San Gerónimo, Pasaje Los Sauces',
    'Tarija',
    'Casa',
    750,
    3,
    2,
    260,
    190,
    2,
    10,
    'Acogedora casa en alquiler en zona tranquila y residencial. Cuenta con living comedor luminoso, cocina cerrada, patio trasero con parrillero y garaje para 2 vehículos.',
    -21.5420,
    -64.7150,
    true,
    true,
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Departamento en Anticrético Calacoto',
    'departamento-en-anticretico-calacoto',
    'Calle 15 de Calacoto',
    'La Paz',
    'Departamento',
    45000,
    2,
    2,
    95,
    95,
    1,
    0,
    'Hermoso departamento soleado en anticrético ubicado en el corazón de la zona sur. Calefacción central, cocina con mesones de granito y terraza privada.',
    -16.5385,
    -68.0845,
    true,
    true,
    '33333333-3333-3333-3333-333333333333',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Residencia Minimalista en Las Palmas',
    'residencia-minimalista-en-las-palmas',
    'Av. Las Palmas, Condominio El Roble',
    'Santa Cruz',
    'Casa',
    320000,
    4,
    4,
    420,
    360,
    3,
    16,
    'Lujosa casa minimalista en condominio exclusivo. Piscina privada con deck de madera, galería con asador gourmet, cocina integrada y suite máster con jacuzzi.',
    -17.8015,
    -63.2050,
    true,
    true,
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Casa Estilo Colonial en Aranjuez',
    'casa-estilo-colonial-en-aranjuez',
    'Calle Los Pinos, Barrio Aranjuez',
    'Tarija',
    'Casa',
    210000,
    4,
    3,
    380,
    290,
    2,
    15,
    'Hermosa propiedad de diseño cálido colonial con detalles en madera tallada, amplios corredores con teja española, jardín consolidado y pozo de agua propio.',
    -21.5280,
    -64.7390,
    true,
    true,
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'Terreno Urbano en Zona Norte',
    'terreno-urbano-en-zona-norte',
    'Av. Circunvalación Norte',
    'Cochabamba',
    'Terreno',
    98000,
    0,
    0,
    500,
    0,
    0,
    20,
    'Excelente lote totalmente plano con todos los servicios básicos instalados (agua, luz, alcantarillado, gas natural). Ideal para proyecto residencial o comercial.',
    -17.3750,
    -66.1510,
    false,
    true,
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    'Penthouse Corporativo Norte en Alquiler',
    'penthouse-corporativo-norte-en-alquiler',
    '4to Anillo, Zona Norte',
    'Santa Cruz',
    'Departamento',
    1200,
    3,
    3,
    180,
    180,
    2,
    0,
    'Espectacular departamento amoblado de lujo con vista panorámica. Cortinas automatizadas, aire acondicionado central, terraza privada y áreas sociales de primer nivel.',
    -17.7620,
    -63.1780,
    true,
    true,
    '22222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1200&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000009',
    'Oficina en Torre Empresarial Centro',
    'oficina-en-torre-empresarial-centro',
    'Paseo El Prado, Centro Financiero',
    'La Paz',
    'Oficina Comercial',
    850,
    2,
    2,
    110,
    110,
    1,
    0,
    'Oficina ejecutiva con divisiones en vidrio templado, recepción, sala de juntas y kitchenette. Cableado estructurado y seguridad las 24 horas.',
    -16.5010,
    -68.1320,
    false,
    true,
    '22222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    'Departamento Amoblado en Barrio Senac',
    'departamento-amoblado-en-barrio-senac',
    'Barrio Senac, Calle Las Palmeras',
    'Tarija',
    'Departamento',
    500,
    2,
    1,
    75,
    75,
    1,
    0,
    'Cómodo y moderno departamento completamente amoblado y equipado. Incluye wifi, agua y expensas. Excelente ubicación cercana a universidades y centros comerciales.',
    -21.5450,
    -64.7380,
    false,
    true,
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    'Casa Amplia en Anticrético San Martín',
    'casa-amplia-en-anticretico-san-martin',
    'Barrio San Martín, Calle Los Ceibos',
    'Tarija',
    'Casa',
    38000,
    3,
    2,
    220,
    160,
    2,
    10,
    'Casa independiente en anticrético por 2 años forzosos. 3 dormitorios amplios, patio privado, cocina con cajonería alta y baja, garaje techado.',
    -21.5310,
    -64.7210,
    true,
    true,
    '33333333-3333-3333-3333-333333333333',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000012',
    'Departamento Soleado en Cala Cala',
    'departamento-soleado-en-cala-cala',
    'Av. Libertador Bolívar, Cala Cala',
    'Cochabamba',
    'Departamento',
    35000,
    3,
    2,
    120,
    120,
    1,
    0,
    'Espacioso departamento en anticrético en piso intermedio. Muy luminoso y cálido, roperos empotrados, suite con vestidor, edificio con ascensor y seguridad.',
    -17.3690,
    -66.1600,
    false,
    true,
    '33333333-3333-3333-3333-333333333333',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80"]'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blogs (titulo, slug, contenido, portada, active, agente_id) VALUES
  (
    'Guía definitiva para comprar tu primera vivienda en Bolivia',
    'guia-definitiva-para-comprar-tu-primera-vivienda-en-bolivia',
    'Comprar una propiedad es uno de los pasos financieros más importantes. En esta guía te explicamos los requisitos bancarios para créditos de vivienda social, revisión de títulos de propiedad en Derechos Reales y aspectos clave para tomar la mejor decisión.',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    true,
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  ),
  (
    'Tendencias del mercado inmobiliario en 2026',
    'tendencias-del-mercado-inmobiliario-en-2026',
    'Análisis de la plusvalía en las principales ciudades de Bolivia, zonas con mayor rentabilidad para inversión en alquiler y el impacto de los nuevos proyectos de urbanización sustentable.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    true,
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
  )
ON CONFLICT (slug) DO NOTHING;
