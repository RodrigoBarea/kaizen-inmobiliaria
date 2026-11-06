export function formatOperacion(categoriaNombre?: string | null): string {
  const cat = (categoriaNombre || 'Venta').toLowerCase().trim();
  if (cat.includes('alquiler')) return 'En Alquiler';
  if (cat.includes('anticret') || cat.includes('anticr')) return 'En Anticrético';
  return 'En Venta';
}
