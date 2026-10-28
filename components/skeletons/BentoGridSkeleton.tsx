export default function BentoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
      {/* Large 7-col Card Skeleton */}
      <div className="lg:col-span-7 bg-surface-stone border border-border-hairline flex flex-col rounded-[2px] overflow-hidden">
        <div className="aspect-[16/10] w-full skeleton-shimmer bg-surface-warm relative" />
        <div className="p-8 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="w-28 h-4 bg-surface-warm rounded skeleton-shimmer" />
              <div className="w-20 h-4 bg-emerald-subtle rounded" />
            </div>
            <div className="w-2/3 h-8 bg-surface-warm rounded mb-3 skeleton-shimmer" />
            <div className="w-full h-4 bg-surface-warm rounded mb-2" />
            <div className="w-4/5 h-4 bg-surface-warm rounded" />
          </div>

          <div className="grid grid-cols-4 border-t border-b border-border-hairline py-4 gap-2">
            <div className="h-8 bg-surface-warm rounded skeleton-shimmer" />
            <div className="h-8 bg-surface-warm rounded skeleton-shimmer" />
            <div className="h-8 bg-surface-warm rounded skeleton-shimmer" />
            <div className="h-8 bg-surface-warm rounded skeleton-shimmer" />
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="w-36 h-8 bg-surface-warm rounded skeleton-shimmer" />
            <div className="flex gap-3">
              <div className="w-28 h-10 bg-surface-warm rounded" />
              <div className="w-32 h-10 bg-surface-warm rounded skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* 5-col Stacked Dual Skeletons */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        {[1, 2].map((idx) => (
          <div
            key={idx}
            className="bg-surface-stone border border-border-hairline flex flex-col rounded-[2px] overflow-hidden flex-1"
          >
            <div className="aspect-[16/9] w-full skeleton-shimmer bg-surface-warm" />
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-24 h-3 bg-surface-warm rounded mb-2" />
                <div className="w-3/4 h-6 bg-surface-warm rounded mb-2 skeleton-shimmer" />
                <div className="w-1/2 h-3.5 bg-surface-warm rounded" />
              </div>
              <div className="pt-4 border-t border-border-hairline flex justify-between items-center">
                <div className="w-28 h-6 bg-surface-warm rounded skeleton-shimmer" />
                <div className="w-24 h-4 bg-surface-warm rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
