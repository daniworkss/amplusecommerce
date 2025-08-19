import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';

// Skeleton component for reusable shimmer effect
const Skeleton = ({ className = '', ...props }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${className}`} 
      {...props}
    />
  );
};

// Product stat card skeleton
const ProductStatCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-row items-center justify-between space-y-0 pb-0 pt-5 px-5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <div className="px-5 pb-5">
        <Skeleton className="h-8 w-12 mt-2" />
      </div>
    </div>
  );
};

// Product card skeleton
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Price */}
        <Skeleton className="h-4 w-1/3" />
        
        {/* Stock info */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Main skeleton component
export default function  ProductDashboardSkeleton (){
  return (
    <div className="p-6 lg:p-8 space-y-8 pt-20 lg:pt-6 max-w-7xl mx-auto">
      {/* Page Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:pb-6 border-b border-gray-100">
        <div>
          <Skeleton className="h-9 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="bg-gray-800 w-[60%] lg:w-[100%] cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center font-poppins-medium space-x-2 transition-colors duration-100">
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </div>
        </div>
      </div>
      
      {/* Product Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <ProductStatCardSkeleton key={i} />
        ))}
      </div>
      
      {/* Alert Skeleton (optional - shows sometimes) */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Skeleton className="h-5 w-5 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
        </div>
      </div>
      
      {/* Filters and Search Skeleton */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center w-full md:w-auto bg-white border border-gray-300 rounded-lg px-3 py-2">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-3 py-2">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
      
      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
          <Skeleton className="h-8 w-12 rounded-md" />
        </nav>
      </div>
    </div>
  );
};
