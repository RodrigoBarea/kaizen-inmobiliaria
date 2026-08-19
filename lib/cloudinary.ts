/**
 * Helper para subir imágenes a Cloudinary
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // 1. Si está configurado el preset de subida directa en el cliente:
  if (cloudName && uploadPreset && uploadPreset !== 'demo_preset') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'kaizen-inmobiliaria');

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.secure_url;
    }
  }

  // 2. Si no hay preset directo o falla, usar la ruta API interna de Next.js
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || 'Error al subir la imagen a Cloudinary');
  }

  const data = await res.json();
  return data.url;
}
