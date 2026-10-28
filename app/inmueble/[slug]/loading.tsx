export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-surface-stone text-primary pt-28 pb-20 animate-pulse">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="flex justify-between items-center">
          <div className="w-32 h-5 bg-surface-warm rounded skeleton-shimmer" />
          <div className="w-24 h-8 bg-surface-warm rounded" />
        </div>

        {/* Gallery Asymmetric Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 aspect-[16/10] md:h-[480px] bg-surface-warm rounded-[2px] skeleton-shimmer" />
          <div className="hidden md:flex flex-col gap-3 h-[480px]">
            <div className="h-1/2 bg-surface-warm rounded-[2px] skeleton-shimmer" />
            <div className="h-1/2 bg-surface-warm rounded-[2px] skeleton-shimmer" />
          </div>
        </div>

        {/* Details skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="w-36 h-5 bg-surface-warm rounded" />
              <div className="w-3/4 h-9 bg-surface-warm rounded skeleton-shimmer" />
              <div className="w-1/2 h-5 bg-surface-warm rounded" />
            </div>

            <div className="grid grid-cols-4 border-t border-b border-border-hairline py-4 gap-2">
              <div className="h-10 bg-surface-warm rounded" />
              <div className="h-10 bg-surface-warm rounded" />
              <div className="h-10 bg-surface-warm rounded" />
              <div className="h-10 bg-surface-warm rounded" />
            </div>

            <div className="space-y-3">
              <div className="w-full h-4 bg-surface-warm rounded" />
              <div className="w-full h-4 bg-surface-warm rounded" />
              <div className="w-2/3 h-4 bg-surface-warm rounded" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border-hairline p-6 bg-surface-canvas rounded-[2px] space-y-4">
              <div className="w-1/2 h-8 bg-surface-warm rounded skeleton-shimmer" />
              <div className="w-full h-12 bg-kaizen-red/40 rounded skeleton-shimmer" />
              <div className="w-full h-10 bg-surface-warm rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
