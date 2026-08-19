# Kaizen Bienes Raíces - Portal Inmobiliario con Supabase & Cloudinary

Proyecto inmobiliario moderno desarrollado con **Next.js (App Router)**, **Supabase** (PostgreSQL Database & Auth) y **Cloudinary** (Almacenamiento y optimización de imágenes).

---

## 🚀 Características Principales

1. **Gestor de Información / CMS Integrado (`/admin`)**:
   - **Inmuebles**: Publicación, edición, eliminación, marcado de destacados y subida múltiple de fotos a Cloudinary con drag-and-drop.
   - **Categorías**: Gestión de tipos de operaciones (Venta, Alquiler, Anticrético).
   - **Agentes**: Asignación de asesores con foto en Cloudinary y botón dinámico de WhatsApp.
   - **Blog**: Publicación de noticias y artículos con fotos de portada.
   - **Leads**: Visualización de solicitudes de propietarios que desean vender.

2. **Portal Web Público**:
   - **Portada**: Banner con buscador rápido, propiedades destacadas, asesoramiento y guías.
   - **Buscador con Mapa (`/busqueda`)**: Filtros por ciudad, tipo de propiedad, precio, dormitorios y baños en tiempo real con mapa interactivo y pines de precio.
   - **Ficha de Propiedad (`/inmueble/[slug]`)**: Galería con Lightbox en alta definición, ficha técnica, descripción completa, mapa y botón directo de WhatsApp con información del inmueble prellenada.
   - **Catálogos Paginados**: `/compra`, `/alquiler`, `/anticretico`, `/destacados`.
   - **Captación de Inmuebles (`/vender`)**: Formulario para propietarios.
   - **Guías y Blog**: `/guia-comprador`, `/guia-vendedor`, `/sobre-nosotros`, `/blog`.

---

## 🛠️ Configuración Rápida

### 1. Base de Datos en Supabase
1. Ingresa a tu proyecto en [Supabase](https://supabase.com/).
2. Ve a la pestaña **SQL Editor**.
3. Abre el archivo [`supabase_schema.sql`](./supabase_schema.sql) y pega su contenido.
4. Presiona **Run**. Se crearán automáticamente las tablas (`inmuebles`, `categorias`, `agentes`, `blogs`, `leads_vender`), políticas de seguridad (RLS) y datos iniciales de prueba.

### 2. Variables de Entorno (`.env.local`)
Copia el archivo `.env.local.example` a `.env.local` y completa tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Mapbox (Opcional - si no se coloca se usa OpenStreetMap automáticamente)
NEXT_PUBLIC_MAPBOX_TOKEN=

# WhatsApp de Contacto
NEXT_PUBLIC_WHATSAPP_NUMBER=59170000000
```

### 3. Ejecutar Localmente
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
Para acceder al panel de administración: [http://localhost:3000/admin](http://localhost:3000/admin).
