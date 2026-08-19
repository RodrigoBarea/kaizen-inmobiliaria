'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getInmuebleById, updateInmueble, getCategorias, getAgentes } from '@/lib/supabase';
import { Categoria, Agente } from '@/types/database';
import CloudinaryUploader from '@/components/CloudinaryUploader';
import MapaPicker from '@/components/MapaPicker';

export default function EditarInmueblePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [agentes, setAgentes] = useState<Agente[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [inmuebleName, setInmuebleName] = useState('');
  const [slug, setSlug] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('Tarija');
  const [tipo, setTipo] = useState('Departamento');
  const [precio, setPrecio] = useState('');
  const [dormitorios, setDormitorios] = useState('3');
  const [banos, setBanos] = useState('2');
  const [terreno, setTerreno] = useState('');
  const [construccion, setConstruccion] = useState('');
  const [estacionamientos, setEstacionamientos] = useState('1');
  const [frente, setFrente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lat, setLat] = useState<number>(-21.5355);
  const [lng, setLng] = useState<number>(-64.7296);
  const [categoriaId, setCategoriaId] = useState('');
  const [agenteId, setAgenteId] = useState('');
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      setLoading(true);
      try {
        const [inmueble, cats, ags] = await Promise.all([
          getInmuebleById(id),
          getCategorias(),
          getAgentes(),
        ]);

        setCategorias(cats);
        setAgentes(ags);

        if (inmueble) {
          setInmuebleName(inmueble.inmueble_name);
          setSlug(inmueble.slug);
          setDireccion(inmueble.direccion);
          setCiudad(inmueble.ciudad);
          setTipo(inmueble.tipo);
          setPrecio(String(inmueble.precio));
          setDormitorios(String(inmueble.dormitorios));
          setBanos(String(inmueble.banos));
          setTerreno(String(inmueble.terreno || ''));
          setConstruccion(String(inmueble.construccion || ''));
          setEstacionamientos(String(inmueble.estacionamientos || ''));
          setFrente(String(inmueble.frente || ''));
          setDescripcion(inmueble.descripcion || '');
          setLat(inmueble.lat || -21.5355);
          setLng(inmueble.lng || -64.7296);
          setCategoriaId(inmueble.categoria_id || (cats[0]?.id ?? ''));
          setAgenteId(inmueble.agente_id || (ags[0]?.id ?? ''));
          setImagenes(inmueble.imagenes || []);
          setIsFeatured(Boolean(inmueble.is_featured));
          setActive(Boolean(inmueble.active !== false));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inmuebleName || !precio || !direccion) {
      alert('Por favor completa el título, precio y dirección.');
      return;
    }

    setSaving(true);
    try {
      const result = await updateInmueble(id, {
        inmueble_name: inmuebleName,
        slug,
        direccion,
        ciudad,
        tipo,
        precio: Number(precio),
        dormitorios: Number(dormitorios) || 0,
        banos: Number(banos) || 0,
        terreno: Number(terreno) || 0,
        construccion: Number(construccion) || 0,
        estacionamientos: Number(estacionamientos) || 0,
        frente: Number(frente) || 0,
        descripcion,
        lat,
        lng,
        categoria_id: categoriaId || null,
        agente_id: agenteId || null,
        imagenes,
        is_featured: isFeatured,
        active,
      });

      if (result) {
        router.push('/admin/inmuebles');
      } else {
        alert('Hubo un error al actualizar el inmueble.');
      }
    } catch (err) {
      console.error(err);
      alert('Error al guardar en base de datos.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-secondary">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-variant">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
            Editar Inmueble
          </h1>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Editando "{inmuebleName}" • ID: {id}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/inmuebles"
            className="px-6 h-12 rounded border border-on-surface text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center"
          >
            Volver
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 h-12 rounded bg-primary text-white font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-sm">save</span>
            )}
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Left 8 cols */}
        <div className="lg:col-span-8 space-y-gutter">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-6 lg:p-8 space-y-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-surface-variant pb-4 font-bold">
              Información Principal
            </h3>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                Título del Inmueble *
              </label>
              <input
                type="text"
                required
                value={inmuebleName}
                onChange={(e) => setInmuebleName(e.target.value)}
                className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Tipo de Operación
                </label>
                <select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                >
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre_categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Tipo de Inmueble
                </label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                >
                  <option value="Departamento">Departamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Lote">Lote</option>
                  <option value="Oficina Comercial">Oficina Comercial</option>
                  <option value="Tienda Comercial">Tienda Comercial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Ciudad
                </label>
                <select
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                >
                  <option value="Tarija">Tarija (Cercado)</option>
                  <option value="San Lorenzo">San Lorenzo / Tomatitas</option>
                  <option value="Uriondo">Uriondo / El Valle</option>
                  <option value="Bermejo">Bermejo</option>
                  <option value="Yacuiba">Yacuiba</option>
                  <option value="Villa Montes">Villa Montes</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Asesor Asignado
                </label>
                <select
                  value={agenteId}
                  onChange={(e) => setAgenteId(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                >
                  {agentes.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.agent_name} ({a.cargo || 'Asesor'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                Descripción
              </label>
              <textarea
                rows={5}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface resize-none"
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-6 lg:p-8 space-y-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-surface-variant pb-4 font-bold">
              Precio y Características
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Precio (USD) *
                </label>
                <div className="flex relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-headline-md text-secondary font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Garajes
                </label>
                <input
                  type="number"
                  value={estacionamientos}
                  onChange={(e) => setEstacionamientos(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">square_foot</span> Sup. Terreno (m²)
                </label>
                <input
                  type="number"
                  value={terreno}
                  onChange={(e) => setTerreno(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bed</span> Dormitorios
                </label>
                <input
                  type="number"
                  value={dormitorios}
                  onChange={(e) => setDormitorios(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">shower</span> Baños
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={banos}
                  onChange={(e) => setBanos(e.target.value)}
                  className="w-full h-12 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                />
              </div>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-surface-variant">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-surface-variant focus:ring-primary"
                />
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Destacar en la Portada
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-surface-variant focus:ring-primary"
                />
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Propiedad Activa / Visible
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right 4 cols */}
        <div className="lg:col-span-4 space-y-gutter">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-6">
            <div className="flex items-center justify-between mb-4 border-b border-surface-variant pb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Multimedia
              </h3>
              <span className="bg-surface-container text-on-surface font-caption text-caption px-2 py-1 rounded">
                Cloudinary Sync
              </span>
            </div>

            <CloudinaryUploader
              images={imagenes}
              onChange={(newImages) => setImagenes(newImages)}
            />
          </div>

          <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 border-b border-surface-variant pb-4 font-bold">
              Ubicación
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Dirección Escrita *
                </label>
                <input
                  type="text"
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full h-10 px-4 rounded border border-surface-variant focus:border-on-surface focus:ring-0 bg-surface-bright font-body-md text-on-surface"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Selecciona la ubicación en el mapa
                </label>
                <div className="h-56 rounded border border-surface-variant overflow-hidden">
                  <MapaPicker
                    lat={lat}
                    lng={lng}
                    onChange={(coords) => {
                      setLat(coords.lat);
                      setLng(coords.lng);
                    }}
                    ciudad={ciudad}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
