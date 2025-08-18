import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/card"
import { 
  Filter,
  Search,
  ShoppingCart, 
  Clock,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Eye,
  ExternalLink
} from "lucide-react"

// Skeleton component for shimmer effect
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  )
}

// Skeleton for stat cards
const StatCardSkeleton = ({ icon }) => (
  <Card className="bg-white">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="text-gray-300">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
)

// Skeleton for status badge
const StatusBadgeSkeleton = () => (
  <Skeleton className="h-6 w-16 rounded-full" />
)

export default function OrdersPageSkeleton() {
  return (
    <div className="p-6 lg:p-8 space-y-8 pt-20 lg:pt-6 max-w-7xl mx-auto">
      {/* Page Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-100">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      
      {/* Order Stats Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatCardSkeleton icon={<ShoppingCart className="h-6 w-6" />} />
        <StatCardSkeleton icon={<DollarSign className="h-6 w-6" />} />
      </div>
      
      {/* Orders Table Section */}
      <div className="mt-8">
        {/* Filters and Search Skeleton */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex items-center w-full md:w-auto bg-white border lg:w-[30%] border-gray-300 rounded-lg px-3 py-2">
            <Search className="h-5 w-5 text-gray-300 mr-2" />
            <Skeleton className="flex-1 h-4" />
          </div>
          
          <div className="flex items-center w-full md:w-auto bg-white border border-gray-300 rounded-lg px-3 py-2">
            <Filter className="h-5 w-5 text-gray-300 mr-2" />
            <Skeleton className="flex-1 h-4 w-24" />
          </div>
        </div>
        
        {/* Orders Table Skeleton */}
        <Card className="rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="text-gray-300 text-left divide-x divide-y divide-gray-200">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium hidden md:table-cell">Date</th>
                  <th className="p-4 font-medium hidden lg:table-cell">Items</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Generate 8-10 skeleton rows */}
                {[...Array(8)].map((_, index) => (
                  <tr key={index} className="bg-white">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-20" />
                        <ExternalLink className="h-3 w-3 text-gray-200" />
                      </div>
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-gray-200" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="p-4">
                      <StatusBadgeSkeleton />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center space-x-1 ml-auto w-fit">
                        <Eye className="h-4 w-4 text-gray-200" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Skeleton */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <Skeleton className="h-4 w-48" />
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <div className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white">
                    <ChevronLeft className="h-5 w-5 text-gray-200" />
                  </div>
                  
                  {/* Page number skeletons */}
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white h-9 w-10" />
                  ))}
                  
                  <div className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white">
                    <ChevronRight className="h-5 w-5 text-gray-200" />
                  </div>
                </nav>
              </div>
            </div>
            
            {/* Mobile pagination skeleton */}
            <div className="flex sm:hidden w-full justify-between items-center">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-16 rounded-md" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
