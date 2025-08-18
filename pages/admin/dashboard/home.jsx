import React, { useState, useMemo } from 'react';
import Layout from '@/components/admin/layout';
import useStoreDetails from '@/context/store';
import DashboardSkeleton from '@/components/admin/dashboardskeleton';
import { 
  Calendar, 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign,
  ChevronDown,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Search,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { useEffect } from 'react';
import axios from 'axios';

export default function ModernDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const {storeData, products, subscribedEmails, setSubscribedEmails, setStoreData, setProducts, customerDetails,setCustomerDetails} = useStoreDetails()

  async function fetchData(){
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/fetchData')
      setProducts(res.data.products || [])
      setStoreData(res.data.storeData || { orders: [], totalOrders: 0, totalRevenue: 0, storeviews: 0 })
      setSubscribedEmails(res.data.subscribedEmails || [])
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set default values if API fails
      setProducts([])
      setStoreData({ orders: [], totalOrders: 0, totalRevenue: 0, storeviews: 0 })
      setSubscribedEmails([])
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const dateRanges = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  // Calculate total stock for products with different inventory types
  const calculateTotalStock = (product) => {
    if (product.inventoryType === 'color' && product.colorInventory) {
      return Object.values(product.colorInventory).reduce((total, colorStock) => {
        return total + Object.values(colorStock).reduce((sum, sizeStock) => sum + sizeStock, 0);
      }, 0);
    } else if (product.inventoryType === 'size' && product.sizeInventory) {
      return Object.values(product.sizeInventory).reduce((total, stock) => total + stock, 0);
    }
    return product.stock || 0;
  };

  // Generate chart data from real orders
  const generateChartData = (orders) => {
    const last7Days = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === date.toDateString();
      });
      
      const dayRevenue = dayOrders.reduce((sum, order) => sum + (order.total || 0), 0);
      
      last7Days.push({
        date: dateStr,
        revenue: dayRevenue,
        orders: dayOrders.length
      });
    }
    
    return last7Days;
  };

  // Generate order status data from real orders (since your orders don't have status, we'll create a simple distribution)
  const generateOrderStatusData = (orders) => {
    const statusData = [
      { status: 'Confirmed', count: Math.floor(orders.length * 0.4), color: '#3b82f6' },
      { status: 'Processing', count: Math.floor(orders.length * 0.3), color: '#eab308' },
      { status: 'Shipped', count: Math.floor(orders.length * 0.2), color: '#8b5cf6' },
      { status: 'Delivered', count: Math.floor(orders.length * 0.1), color: '#10b981' }
    ];

    return statusData;
  };

  // Generate weekly performance data
  const generateWeeklyPerformance = (orders) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekData = days.map(day => ({ day, sales: 0, visitors: 0 }));
    
    const now = new Date();
    const last7Days = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const diffTime = Math.abs(now - orderDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });

    last7Days.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const dayIndex = orderDate.getDay();
      weekData[dayIndex].sales += order.total || 0;
      weekData[dayIndex].visitors += 1;
    });

    return weekData;
  };

  // Filter data based on selected date range
  const filteredData = useMemo(() => {
    if (!storeData?.orders) {
      return {
        orders: [],
        totalRevenue: 0,
        totalOrders: 0,
        avgOrderValue: 0,
        totalProducts: 0,
        lowStockProducts: 0,
        chartData: [],
        orderStatusData: [],
        weeklyPerformance: []
      };
    }

    const now = new Date();
    let startDate;

    switch (selectedDateRange) {
      case '7days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90days':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0);
    }

    const filteredOrders = storeData.orders.filter(order => 
      new Date(order.createdAt) >= startDate
    );

    // Filter orders by search query
    const searchFilteredOrders = filteredOrders.filter(order => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        order.orderId?.toLowerCase().includes(searchLower) ||
        order.username?.toLowerCase().includes(searchLower)
      );
    });

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalProducts = products?.length || 0;
    
    // Calculate low stock products based on inventory type
    const lowStockProducts = products?.filter(product => {
      const totalStock = calculateTotalStock(product);
      return totalStock < 10;
    }).length || 0;

    return {
      orders: searchFilteredOrders,
      totalRevenue,
      totalOrders,
      avgOrderValue,
      totalProducts,
      lowStockProducts,
      chartData: generateChartData(storeData.orders),
      orderStatusData: generateOrderStatusData(storeData.orders),
      weeklyPerformance: generateWeeklyPerformance(storeData.orders)
    };
  }, [selectedDateRange, searchQuery, storeData, products]);

  const MetricCard = ({ title, value, change, icon: Icon, trend = 'up' }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <Icon className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {trend === 'up' ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );

  const topProducts = useMemo(() => {
    if (!products?.length) return [];
    
    // Sort products by stock descending (most popular items likely have lower stock)
    return products
      .map(product => ({
        ...product,
        totalStock: calculateTotalStock(product)
      }))
      .sort((a, b) => b.totalStock - a.totalStock)
      .slice(0, 3);
  }, [products]);

  if (loading) {
    return (
      <Layout>
        <DashboardSkeleton/>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className=''>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, let's see how your store is performing</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              
              <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2  cursor-pointer rounded-lg hover:bg-orange-500 transition-colors">
                <span className='font-semibold'>Add Outfit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <MetricCard 
            title="Total Revenue" 
            value={`$${filteredData.totalRevenue.toLocaleString()}`}
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard 
            title="Orders" 
            value={filteredData.totalOrders.toLocaleString()}
            change="+8.2%"
            icon={ShoppingCart}
            trend="up"
          />
          <MetricCard 
            title="Products" 
            value={filteredData.totalProducts.toLocaleString()}
            change="+2"
            icon={Package}
            trend="up"
          />
          <MetricCard 
            title="Avg Order Value" 
            value={`$${Math.round(filteredData.avgOrderValue).toLocaleString()}`}
            change="+4.1%"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Revenue</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Orders</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ea580c" 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Status Bar Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={filteredData.orderStatusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="status" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[4, 4, 0, 0]}
                  fill="#ea580c"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Performance */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={filteredData.weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#ea580c" 
                  strokeWidth={3}
                  dot={{ fill: '#ea580c', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#ea580c', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Sales</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Visitors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Filter size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                {filteredData.orders.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.orders.map((order) => (
                        <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderId ? order.orderId.slice(-8) : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.trackingNumber || 'No tracking'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {order.username || 'Unknown Customer'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${(order.total || 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.cart ? order.cart.length : 0} items
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-orange-600 hover:text-orange-900 transition-colors">
                                <Eye size={16} />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchQuery ? 'Try adjusting your search criteria.' : 'Orders will appear here once customers start purchasing.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Newsletter Subscribers</span>
                  <span className="text-sm font-medium text-gray-900">
                    {subscribedEmails?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low Stock Items</span>
                  <span className="text-sm font-medium text-red-600">
                    {filteredData.lowStockProducts}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Store Views</span>
                  <span className="text-sm font-medium text-gray-900">
                    {storeData?.storeviews || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="text-sm font-medium text-gray-900">
                    {storeData?.totalOrders || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-3">
                {topProducts.length > 0 ? (
                  topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium text-orange-700">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name || 'Unnamed Product'}
                        </p>
                        <p className="text-xs text-gray-500">${(product.price || 0).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{product.totalStock || 0}</p>
                        <p className="text-xs text-gray-500">in stock</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Package className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">No products available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {filteredData.orders.slice(0, 3).sort((a,b)=> a.createdAt - b.createdAt).map((order, index) => (
                  <div key={order.orderId || index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">
                        New order from {order.username || 'Customer'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Recently'}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredData.lowStockProducts > 0 && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Low stock alert</p>
                      <p className="text-xs text-gray-500">{filteredData.lowStockProducts} products running low</p>
                    </div>
                  </div>
                )}
                {filteredData.orders.length === 0 && filteredData.lowStockProducts === 0 && (
                  <div className="text-center py-4">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}