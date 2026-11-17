'use client';

export default function EstandarKaizen() {
  const pilares = [
    {
      romano: 'I.',
      titulo: 'Auditoría Constructiva & Estructural',
      tag: 'INSPECCIÓN TÉCNICA IN SITU',
      descripcion:
        'Inspección técnica minuciosa de calidad estructural, losas, cimentación, instalaciones hidrosanitarias y peritaje preventivo de vicios ocultos antes de la publicación.',
      criterio: 'Descartamos propiedades con patologías estructurales no declaradas.',
    },
    {
      romano: 'II.',
      titulo: 'Saneamiento Legal en Derechos Reales',
      tag: 'TRADICIÓN NOTARIAL TREINTAÑAL',
      descripcion:
        'Verificación exhaustiva de títulos de propiedad, folio real matriculado, certificado alodial libre de gravámenes, sin litigios sucesorios ni anotaciones preventivas.',
      criterio: 'Garantía notarial de compraventa con aptitud crediticia inmediata.',
    },
    {
      romano: 'III.',
      titulo: 'Negociación Basada en Datos Reales',
      tag: 'VALOR M² TRANSACCIONAL AUDITADO',
      descripcion:
        'Tasación comparativa respaldada por operaciones notariales cerradas en Tarija y Valle Central. Eliminamos el sobreprecio especulativo de portales genéricos.',
      criterio: 'Tu capital protegido pagando el valor real del suelo y edificación.',
    },
  ];

  return (
    <section className="w-full bg-surface-canvas py-16 sm:py-24 border-b border-border-hairline" id="estandar">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-border-hairline">
          <div className="max-w-2xl">
            <span className="text-legal-badge font-legal-badge uppercase tracking-[0.14em] text-text-muted block mb-2 font-semibold">
              Criterio de Curaduría Notarial
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-headline-lg font-headline-lg font-semibold text-primary tracking-tight">
              El Estándar <span className="italic font-normal text-kaizen-red">Kaizen</span>
            </h2>
          </div>
          <p className="font-body-md text-xs sm:text-sm text-text-muted max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            Solo admitimos inmuebles que superan nuestra triple auditoría. Cuidamos el patrimonio de familias e inversores en Tarija con total respaldo.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pilares.map((pilar, index) => (
            <div
              key={index}
              className="bg-surface-stone border border-border-hairline rounded-[2px] p-6 sm:p-8 flex flex-col justify-between hover:border-primary/80 transition-colors duration-200 apple-shadow-card"
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-kaizen-red font-display-xl">
                    {pilar.romano}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-text-muted bg-surface-warm px-2 py-0.5 rounded-[2px]">
                    Pilar 0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-headline-sm font-semibold text-primary mb-3 leading-tight">
                  {pilar.titulo}
                </h3>

                <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-normal">
                  {pilar.descripcion}
                </p>
              </div>

              <div className="pt-4 border-t border-border-hairline text-[11px] text-text-muted flex flex-col gap-1">
                <span className="text-kaizen-red font-semibold tracking-wider uppercase text-[10px]">
                  {pilar.tag}
                </span>
                <span className="text-text-muted">
                  {pilar.criterio}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
