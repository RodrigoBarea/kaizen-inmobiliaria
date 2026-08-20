export type TipoInmueble = 'Casa' | 'Departamento' | 'Terreno' | 'Oficina Comercial';

export type CategoriaSlug = 'venta' | 'alquiler' | 'anticretico' | 'destacados' | 'area-rural';

export interface Categoria {
  id: string;
  nombre_categoria: string;
  slug: CategoriaSlug | string;
  descripcion?: string | null;
  created_at?: string;
}

export interface Agente {
  id: string;
  agent_name: string;
  slug: string;
  cargo?: string | null;
  telefono: string;
  correo?: string | null;
  foto_principal?: string | null;
  created_at?: string;
}

export type CiudadTarija = 'Tarija' | 'San Lorenzo' | 'Uriondo' | 'Bermejo' | 'Yacuiba' | 'Villa Montes';

export interface Inmueble {
  id: string;
  inmueble_name: string;
  slug: string;
  precio: number;
  moneda: string;
  tipo: TipoInmueble | string;
  ciudad: CiudadTarija | string;
  direccion: string;
  dormitorios: number;
  banos: number;
  estacionamientos?: number | null;
  construccion?: number | null;
  terreno: number;
  frente?: number | null;
  descripcion: string;
  lat: number;
  lng: number;
  categoria_id?: string | null;
  categoria?: Categoria | null;
  agente_id?: string | null;
  agente?: Agente | null;
  imagenes: string[];
  is_featured: boolean;
  is_rural?: boolean;
  active?: boolean;
  created_at?: string;
}

export interface Blog {
  id: string;
  titulo: string;
  slug: string;
  resumen?: string | null;
  contenido: string;
  foto_principal?: string | null;
  portada?: string | null;
  autor_id?: string | null;
  autor?: Agente | null;
  agente?: Agente | null;
  created_at?: string;
}

export interface LeadVender {
  id?: string;
  nombre: string;
  telefono: string;
  email?: string | null;
  tipo_inmueble: string;
  ubicacion: string;
  precio_estimado?: number | null;
  detalles?: string | null;
  atendido?: boolean;
  created_at?: string;
}

export interface MetricasEmpresa {
  id?: string;
  propiedades_transaccionadas: number;
  propiedades_transaccionadas_label: string;
  propiedades_transaccionadas_sub: string;
  
  hectareas_gestionadas: number;
  hectareas_gestionadas_label: string;
  hectareas_gestionadas_sub: string;
  
  dias_promedio_colocacion: number;
  dias_promedio_colocacion_label: string;
  dias_promedio_colocacion_sub: string;
  
  seguridad_juridica_porcentaje: number;
  seguridad_juridica_label: string;
  seguridad_juridica_sub: string;
  
  updated_at?: string;
}

