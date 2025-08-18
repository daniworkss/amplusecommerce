import React from 'react';

export default function ProductPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      <div className="grid  lg:grid-cols-2 gap-8">
        
        {/* Images Section Skeleton */}
    
        <div className="space-y-4">
          {/* Main Image Skeleton */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          
          {/* Thumbnails Skeleton */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6">
          
          {/* Header Skeleton */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
          </div>

          {/* Colors Skeleton */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-12 mb-3 animate-pulse" />
            <div className="flex gap-2">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                />
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse" />
          </div>

          {/* Sizes Skeleton */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-8 mb-3 animate-pulse" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-12 bg-gray-200 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Quantity Skeleton */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-3 animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          </div>

          {/* Add to Cart Skeleton */}
          <div className="flex gap-3">
            <div className="flex-1 h-14 bg-gray-200 rounded-md animate-pulse" />
            <div className="w-14 h-14 bg-gray-200 rounded-md animate-pulse" />
          </div>

          {/* Specifications Skeleton */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
            <div className="space-y-3">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                  <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse" style={{
                    width: `${Math.random() * 40 + 60}%`
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Skeleton */}
          <div className="border-t border-gray-200 pt-6">
            <div className="h-3 bg-gray-200 rounded w-48 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}