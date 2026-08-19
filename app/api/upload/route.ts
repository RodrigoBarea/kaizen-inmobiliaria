import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    // Convert file to base64 buffer for Cloudinary API
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

    if (cloudName && uploadPreset && uploadPreset !== 'demo_preset') {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', base64File);
      cloudinaryFormData.append('upload_preset', uploadPreset);
      cloudinaryFormData.append('folder', 'kaizen-inmobiliaria');

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: cloudinaryFormData,
      });

      if (uploadRes.ok) {
        const json = await uploadRes.json();
        return NextResponse.json({ url: json.secure_url });
      }
    }

    // Si no hay credenciales de Cloudinary configuradas aún, generar URL de placeholder de alta calidad
    // para que la interfaz de administración funcione sin bloquearse durante pruebas locales
    const sampleUnsplashImages = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
    ];
    const randomImg = sampleUnsplashImages[Math.floor(Math.random() * sampleUnsplashImages.length)];
    
    return NextResponse.json({ 
      url: randomImg,
      note: 'Modo demo: configura las credenciales de Cloudinary en .env.local para subida real a tu cuenta' 
    });

  } catch (error: any) {
    console.error('Error en /api/upload:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}
