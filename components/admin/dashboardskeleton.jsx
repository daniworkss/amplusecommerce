import React from 'react';
import { 
  Calendar, 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign,
  ChevronDown,
  Filter,
  Search,
  Eye,
  MoreHorizontal
} from 'lucide-react';

// Skeleton component for shimmer effect
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  )
}

// Skeleton for metric cards
const MetricCardSkeleton = ({ icon: Icon }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gray-100 rounded-xl">
          <Icon className="h-6 w-6 text-gray-300" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-7 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-12 rounded-full" />
    </div>
  </div>
);

// Chart skeleton component
const ChartSkeleton = ({ height = 300 }) => (
  <div className={`w-full h-[${height}px] bg-gray-100 rounded-lg flex items-center justify-center`}>
    <div className="space-y-2">
      <div className="flex space-x-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-8 bg-gray-200 rounded-t" style={{ height: `${Math.random() * 100 + 50}px` }}></div>
        ))}
      </div>
      <Skeleton className="h-4 w-48 mx-auto" />
    </div>
  </div>
);

// Bar chart skeleton
const BarChartSkeleton = () => (
  <div className="w-full h-[250px] bg-gray-100 rounded-lg flex items-end justify-center space-x-4 p-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex flex-col items-center space-y-2">
        <div className="w-12 bg-gray-200 rounded-t" style={{ height: `${Math.random() * 120 + 50}px` }}></div>
        <Skeleton className="h-3 w-12" />
      </div>
    ))}
  </div>
);

// Line chart skeleton
const LineChartSkeleton = () => (
  <div className="w-full h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="relative w-full h-full p-4">
      <svg className="w-full h-full">
        <polyline
          fill="none"
          stroke="#d1d5db"
          strokeWidth="2"
          points="20,180 80,120 140,140 200,80 260,100 320,60"
        />
        <polyline
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
          points="20,160 80,140 140,120 200,100 260,80 320,90"
        />
      </svg>
    </div>
  </div>
);

export default function DashboardSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-4 w-64" />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 flex items-center space-x-2">
                  <Skeleton className="h-4 w-20" />
                  <ChevronDown size={16} className="text-gray-300" />
                </div>
              </div>
              
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <MetricCardSkeleton icon={DollarSign} />
          <MetricCardSkeleton icon={ShoppingCart} />
          <MetricCardSkeleton icon={Package} />
          <MetricCardSkeleton icon={TrendingUp} />
        </div>

        {/* Main Chart Section Skeleton */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-32" />
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
            <ChartSkeleton height={300} />
          </div>
        </div>

        {/* Additional Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Status Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <Skeleton className="h-6 w-40 mb-6" />
            <BarChartSkeleton />
          </div>

          {/* Weekly Performance Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <Skeleton className="h-6 w-32 mb-6" />
            <LineChartSkeleton />
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Table Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24" />
                  <div className="flex items-center space-x-3">
                    <div className="relative flex items-center">
                      <Search size={16} className="absolute left-3 text-gray-300" />
                      <Skeleton className="h-9 w-40 rounded-lg pl-9" />
                    </div>
                    <div className="p-2">
                      <Filter size={16} className="text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-3 w-12" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-3 w-16" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-3 w-8" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-3 w-12" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-3 w-10" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-3 w-12" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...Array(6)].map((_, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-16 mb-1" />
                          <Skeleton className="h-3 w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-16" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-12" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-14" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Eye size={16} className="text-gray-300" />
                            <MoreHorizontal size={16} className="text-gray-300" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Stats Skeleton */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <Skeleton className="h-6 w-20 mb-4" />
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-4 w-8 mb-1" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <Skeleton className="h-6 w-28 mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Alternative: Simpler dashboard skeleton for faster loading
export function SimpleDashboardSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Skeleton className="h-6 w-32" />
            <div className="flex space-x-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
          <Skeleton className="h-6 w-32 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-48 w-full" />
            </div>
          ))}
        </div>

        {/* Table and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <Skeleton className="h-6 w-24 mb-6" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <Skeleton className="h-6 w-20 mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-8 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}