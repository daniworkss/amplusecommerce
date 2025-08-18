import React from 'react';
import Slideup from '../animation/slide-up';
export default function ProductCardSkeleton() {
  return (
    <Slideup percent={20} delay={0.2} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
      {/* Image Container Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
        
        {/* Wishlist Button Skeleton */}
        <div className="absolute top-3 right-2 w-9 h-9 bg-gray-200 animate-pulse rounded-full" />
      </div>

      {/* Product Info Skeleton */}
      <div className="py-5 px-2 space-y-2">
        {/* Brand Skeleton */}
        <div className="h-3 w-12 bg-gray-200 animate-pulse rounded" />
        
        {/* Product Name Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
        </div>
        
        {/* Colors Skeleton */}
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
        </div>
        
        {/* Price Skeleton */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
        </div>
        
        {/* Add to Cart Button Skeleton */}
        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg mt-3" />
      </div>
    </Slideup>
  );
}