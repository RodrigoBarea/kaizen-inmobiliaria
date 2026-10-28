import BentoGridSkeleton from '@/components/skeletons/BentoGridSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-stone text-primary pt-24 pb-20">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 space-y-16 animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 pb-12 border-b border-border-hairline">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="w-48 h-6 bg-surface-warm rounded-full skeleton-shimmer" />
            <div className="space-y-3">
              <div className="w-4/5 h-12 bg-surface-warm rounded-[2px] skeleton-shimmer" />
              <div className="w-3/5 h-12 bg-surface-warm rounded-[2px] skeleton-shimmer" />
              <div className="w-2/5 h-12 bg-surface-warm rounded-[2px]" />
            </div>
            <div className="space-y-2 max-w-lg">
              <div className="w-full h-4 bg-surface-warm rounded" />
              <div className="w-5/6 h-4 bg-surface-warm rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-border-hairline pt-6 max-w-lg">
              <div className="h-10 bg-surface-warm rounded" />
              <div className="h-10 bg-surface-warm rounded" />
              <div className="h-10 bg-surface-warm rounded" />
            </div>
          </div>

          {/* Right Column Frame */}
          <div className="lg:col-span-6">
            <div className="aspect-[16/11] w-full border border-border-hairline bg-surface-warm rounded-[2px] skeleton-shimmer" />
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="w-full bg-surface-stone border border-border-hairline p-6 md:p-8 space-y-6 rounded-[2px]">
          <div className="flex gap-3">
            <div className="w-32 h-9 bg-surface-warm rounded-[2px]" />
            <div className="w-32 h-9 bg-surface-warm rounded-[2px]" />
            <div className="w-32 h-9 bg-surface-warm rounded-[2px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-12 bg-surface-warm rounded-[2px]" />
            <div className="h-12 bg-surface-warm rounded-[2px]" />
            <div className="h-12 bg-surface-warm rounded-[2px]" />
            <div className="h-12 bg-kaizen-red/40 rounded-[2px] skeleton-shimmer" />
          </div>
        </div>

        {/* Featured Properties Skeleton */}
        <div className="space-y-8 pt-8">
          <div className="flex justify-between items-end border-b border-border-hairline pb-4">
            <div className="space-y-2">
              <div className="w-36 h-4 bg-surface-warm rounded" />
              <div className="w-64 h-8 bg-surface-warm rounded skeleton-shimmer" />
            </div>
            <div className="w-36 h-5 bg-surface-warm rounded" />
          </div>

          <BentoGridSkeleton />
        </div>
      </div>
    </div>
  );
}
