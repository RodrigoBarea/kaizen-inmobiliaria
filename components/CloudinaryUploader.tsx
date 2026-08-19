'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, Plus, Image as ImageIcon } from 'lucide-react';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  label?: string;
}

export default function CloudinaryUploader({
  images = [],
  onChange,
  multiple = true,
  label = 'Imágenes de la propiedad (Cloudinary)',
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      const fileArray = Array.from(files);
      for (const file of fileArray) {
        if (!file.type.startsWith('image/')) continue;
        const url = await uploadImageToCloudinary(file);
        if (url) newUrls.push(url);
      }

      if (multiple) {
        onChange([...images, ...newUrls]);
      } else {
        onChange(newUrls.slice(0, 1));
      }
    } catch (err: any) {
      alert(err.message || 'Error al subir imágenes');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#E60000]" />
          {label}
        </label>
        <span className="text-xs text-gray-500">
          {images.length} {images.length === 1 ? 'imagen' : 'imágenes'} subidas
        </span>
      </div>

      {/* Zona de Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-[#E60000] bg-red-50/50'
            : 'border-gray-300 hover:border-[#E60000] bg-gray-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <Loader2 className="w-8 h-8 text-[#E60000] animate-spin" />
            <p className="text-sm font-medium text-[#E60000]">Subiendo a Cloudinary...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#E60000]">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Haz clic o arrastra fotos aquí
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Formatos PNG, JPG, WEBP optimizados automáticamente en Cloudinary
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Previsualización en Cuadrícula */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shadow-sm"
            >
              <Image
                src={url}
                alt={`Foto ${idx + 1}`}
                fill
                className="object-cover transition duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(idx);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow transition transform hover:scale-110"
                  title="Eliminar foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {idx === 0 && multiple && (
                <span className="absolute bottom-1 left-1 bg-[#1A1A1A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Principal
                </span>
              )}
            </div>
          ))}

          {multiple && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-[#E60000] hover:bg-red-50/30 flex flex-col items-center justify-center text-gray-500 hover:text-[#E60000] transition"
            >
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Agregar más</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
