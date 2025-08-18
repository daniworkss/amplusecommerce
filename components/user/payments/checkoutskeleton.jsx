import React from 'react';

const SkeletonLoader = ({ className = "", height = "h-4", width = "w-full" }) => (
  <div className={`${height} ${width} bg-gray-200 rounded animate-pulse ${className}`}></div>
);

export default function CheckoutSkeleton (){
  return (
    <div className="px-[10px] py-[40px] lg:py-[40px] pt-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center w-full mb-10 mt-6">
          <div className="flex-1 h-[3px] bg-gray-200 animate-pulse"></div>
          <div className="mx-4">
            <SkeletonLoader height="h-8" width="w-32" />
          </div>
          <div className="flex-1 h-[3px] bg-gray-200 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Billing Information and Payment */}
          <div className="space-y-8">
            {/* Billing Information Skeleton */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <SkeletonLoader height="h-6" width="w-40" className="mb-6" />
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SkeletonLoader height="h-10" />
                  <SkeletonLoader height="h-10" />
                </div>
                <SkeletonLoader height="h-10" />
                <SkeletonLoader height="h-10" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SkeletonLoader height="h-10" />
                  <SkeletonLoader height="h-10" />
                  <SkeletonLoader height="h-10" />
                </div>
                <SkeletonLoader height="h-10" />
              </div>
            </div>

            {/* Payment Section Skeleton */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <SkeletonLoader height="h-6" width="w-48" className="mb-6" />
              <div className="space-y-4">
                <SkeletonLoader height="h-10" />
                <div className="grid grid-cols-2 gap-4">
                  <SkeletonLoader height="h-10" />
                  <SkeletonLoader height="h-10" />
                </div>
                <SkeletonLoader height="h-12" />
              </div>
            </div>
          </div>

          {/* Right column: Order Summary Skeleton */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <SkeletonLoader height="h-6" width="w-32" className="mb-6" />
              
              {/* Cart Items Skeleton */}
              <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-16 h-16 flex-shrink-0">
                      <SkeletonLoader height="h-16" width="w-16" className="rounded-md" />
                    </div>
                    <div className="flex-grow">
                      <SkeletonLoader height="h-4" width="w-3/4" className="mb-2" />
                      <SkeletonLoader height="h-3" width="w-1/2" className="mb-2" />
                      <div className="flex justify-between items-center mt-2">
                        <SkeletonLoader height="h-3" width="w-12" />
                        <SkeletonLoader height="h-4" width="w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals Skeleton */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <SkeletonLoader height="h-4" width="w-32" />
                  <SkeletonLoader height="h-4" width="w-16" />
                </div>
                <div className="flex justify-between">
                  <SkeletonLoader height="h-4" width="w-20" />
                  <SkeletonLoader height="h-4" width="w-12" />
                </div>
                <div className="flex justify-between">
                  <SkeletonLoader height="h-4" width="w-16" />
                  <SkeletonLoader height="h-4" width="w-32" />
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <SkeletonLoader height="h-5" width="w-16" />
                    <SkeletonLoader height="h-5" width="w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
