import PropertyCardSkeleton from '@/components/skeletons/PropertyCardSkeleton';

export default function BusquedaLoading() {
  return (
    <div className="min-h-screen bg-surface-stone text-primary pt-24 pb-20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="border-b border-border-hairline pb-6 space-y-3">
          <div className="w-32 h-4 bg-surface-warm rounded skeleton-shimmer" />
          <div className="w-64 h-8 bg-surface-warm rounded skeleton-shimmer" />
          <div className="w-48 h-4 bg-surface-warm rounded" />
        </div>

        {/* Filter bar Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-surface-canvas border border-border-hairline rounded-[2px]">
          <div className="h-10 bg-surface-warm rounded" />
          <div className="h-10 bg-surface-warm rounded" />
          <div className="h-10 bg-surface-warm rounded" />
          <div className="h-10 bg-surface-warm rounded" />
        </div>

        {/* Grid of Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
