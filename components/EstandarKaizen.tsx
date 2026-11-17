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
    <section className="w-full bg-[#F6F5F2] py-16 sm:py-24 border-b border-[#181816]/15" id="estandar">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#181816]/15">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A65D47] block mb-2 font-medium">
              Criterio de Curaduría Notarial
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181816] tracking-tight">
              El Estándar <span className="italic font-normal text-[#A65D47]">Kaizen</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#181816]/75 max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            Solo admitimos inmuebles que superan nuestra triple auditoría. Cuidamos el patrimonio de familias e inversores en Tarija con rigor técnico.
          </p>
        </div>

        {/* 3 Pillars Grid with Visible Architectural Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pilares.map((pilar, index) => (
            <div
              key={index}
              className="bg-[#EFECE6] border border-[#181816]/15 p-6 sm:p-8 flex flex-col justify-between hover:border-[#181816] transition-colors duration-200"
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-editorial italic text-4xl sm:text-5xl font-semibold text-[#A65D47]">
                    {pilar.romano}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#181816]/60 bg-[#F6F5F2] px-2 py-0.5 border border-[#181816]/10">
                    Pilar 0{index + 1}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-semibold text-[#181816] mb-3 leading-tight">
                  {pilar.titulo}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#181816]/75 leading-relaxed mb-6 font-normal">
                  {pilar.descripcion}
                </p>
              </div>

              <div className="pt-4 border-t border-[#181816]/15 font-mono text-[10px] text-[#181816]/80 flex flex-col gap-1">
                <span className="text-[#A65D47] font-semibold tracking-wider uppercase">
                  {pilar.tag}
                </span>
                <span className="text-[#181816]/65">
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
