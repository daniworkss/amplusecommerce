import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function ProductCardError({ onRetry }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
        <button 
          onClick={onRetry}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <RefreshCw size={24} />
        </button>
      </div>

      {/* Product Info */}
      <div className="py-5 px-2 space-y-2">
        <div className="h-3 w-12 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="w-full h-12 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}