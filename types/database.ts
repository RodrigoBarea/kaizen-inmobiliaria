export interface Categoria {
  id: string;
  nombre_categoria: string;
  slug: string;
  created_at?: string | null;
}

export interface Agente {
  id: string;
  agent_name: string;
  slug: string;
  cargo?: string | null;
  telefono: string;
  correo?: string | null;
  foto_principal?: string | null;
  created_at?: string | null;
}

export type TipoInmueble = 'Casa' | 'Departamento' | 'Terreno' | 'Lote' | 'Tienda Comercial' | 'Edificio' | 'Oficina';

export type CiudadBolivia = 'Tarija' | 'Santa Cruz' | 'La Paz' | 'Cochabamba' | 'Bermejo' | 'Yacuiba' | 'Sucre' | 'Potosi' | 'Oruro' | 'Beni' | 'Pando';

export interface Inmueble {
  id: string;
  inmueble_name: string;
  slug: string;
  direccion: string;
  ciudad: CiudadBolivia | string;
  tipo: TipoInmueble | string;
  precio: number;
  dormitorios: number;
  banos: number;
  terreno: number;
  construccion?: number | null;
  estacionamientos?: number | null;
  frente?: number | null;
  descripcion?: string | null;
  lat: number;
  lng: number;
  is_featured: boolean;
  active: boolean;
  categoria_id?: string | null;
  agente_id?: string | null;
  categoria?: Categoria | null;
  agente?: Agente | null;
  imagenes: string[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Blog {
  id: string;
  titulo: string;
  slug: string;
  contenido: string;
  portada?: string | null;
  active: boolean;
  agente_id?: string | null;
  agente?: Agente | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface LeadVender {
  id: string;
  nombre: string;
  telefono: string;
  email?: string | null;
  tipo_inmueble: string;
  ubicacion: string;
  precio_estimado?: number | null;
  detalles?: string | null;
  atendido?: boolean | null;
  created_at?: string | null;
}
