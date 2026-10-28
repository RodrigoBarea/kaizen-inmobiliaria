export default function PropertyCardSkeleton() {
  return (
    <div className="bg-surface-stone rounded-[2px] border border-border-hairline overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[16/9] w-full skeleton-shimmer bg-surface-warm">
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="w-20 h-5 rounded-[2px] bg-surface-canvas" />
          <div className="w-16 h-5 rounded-[2px] bg-surface-canvas" />
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="w-32 h-7 bg-surface-warm rounded-[2px] skeleton-shimmer" />
            <div className="w-16 h-4 bg-surface-warm rounded-[2px]" />
          </div>
          <div className="w-3/4 h-5 bg-surface-warm rounded-[2px] mb-2 skeleton-shimmer" />
          <div className="w-1/2 h-3.5 bg-surface-warm rounded-[2px] mb-4" />
          <div className="space-y-1.5">
            <div className="w-full h-3 bg-surface-warm rounded-[2px]" />
            <div className="w-4/5 h-3 bg-surface-warm rounded-[2px]" />
          </div>
        </div>

        {/* Specs Footer */}
        <div className="border-t border-border-hairline pt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-4 bg-surface-warm rounded-[2px]" />
            <div className="w-12 h-4 bg-surface-warm rounded-[2px]" />
            <div className="w-12 h-4 bg-surface-warm rounded-[2px]" />
          </div>
          <div className="w-16 h-4 bg-emerald-subtle rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}
