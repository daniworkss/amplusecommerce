/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/card" 
import { useState, useEffect } from "react"
import useStoreDetails from '@/context/store'
import { BarLoader } from "react-spinners"
import axios from "axios"
import { useRouter } from "next/router"
import Layout from "@/components/admin/layout"
import Image from "next/image"
import { ToastContainer,toast } from "react-toastify"
import { 
  ArrowLeft,
  Package,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit3
} from "lucide-react"

export default function OrderDetails() {
  const router = useRouter()
  const { id } = router.query // Fixed: removed :id syntax
  const { storeData, setStoreData } = useStoreDetails()
  
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [error, setError] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [statusDescription, setStatusDescription] = useState('')
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  // Status options for updating
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'amber' },
    { value: 'processing', label: 'Processing', color: 'blue' },
    { value: 'shipped', label: 'Shipped', color: 'purple' },
    // { value: 'delivered', label: 'Delivered', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ]

  // Separate effect for checking login state
  useEffect(() => {
    const checkstate = localStorage.getItem('loggedIn')
    if (!checkstate) {
      router.push('/admin')
      return
    }
  }, [router])

  // Main effect for fetching order details
  useEffect(() => {
    // Only proceed if we have id and router is ready
    if (!router.isReady || !id) {
      console.log('Router not ready or no id:', router.query,{ isReady: router.isReady, id })
      return
    }

    fetchOrderDetails()
  }, [id, router.isReady])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      setError(false)
      console.log('Fetching order details for id:', id)
      console.log('Store data:', storeData)
      
      // Try to find in existing orders - check both id and orderId properties
      const existingOrder = storeData?.orders?.find(order => 
        order.id === id || order.orderId === id
      )
      console.log('Existing order found:', existingOrder)
      
      if (existingOrder) {
        console.log('Using existing order from context')
        setOrderData(existingOrder)
        setTrackingNumber(existingOrder.trackingNumber || id)
        setLoading(false)
        return 
      }

      console.log('Fetching fresh data from API')
      // If not in context, fetch fresh data from API
      const res = await axios.get('/api/admin/fetchData')
      console.log('API response:', res.data)
      
      if (res.data && res.data.storeData) {
        const orders = res.data.storeData?.orders || []
        console.log('Orders from API:', orders)
        
        // Check both id and orderId properties when searching
        const order = orders.find(order => 
          order.id === id || order.orderId === id
        )
        console.log('Found order:', order)
        
        if (order) {
          setOrderData(order)
          setTrackingNumber(order.trackingNumber || id)
          
          // Update store context with fresh data
          setStoreData(res.data.storeData || { orders: [], totalOrders: 0, totalRevenue: 0, storeviews: 0 })
        } else {
          console.log('Order not found in API response')
          setError(true)
        }
      } else {
        console.log('Invalid API response structure')
        setError(true)
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (e) => {
    e.preventDefault()
    if (!newStatus || !statusDescription) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setUpdating(true)
      
      const response = await axios.post('/api/admin/update-tracking', {
        orderId: id, // Send as orderId to maintain API compatibility
        trackingNumber,
        status: newStatus,
        description: statusDescription,
        location: ''
      })

      if (response.data.success) {
        // Update local state
        const updatedOrder = {
          ...orderData,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          trackingHistory: [
            ...(orderData.trackingHistory || []),
            {
              status: newStatus,
              description: statusDescription,
              timestamp: new Date().toISOString()
            }
          ]
        }
        
        setOrderData(updatedOrder)
        
        // Update store context - check both id properties
        if (storeData?.orders) {
          const updatedOrders = storeData.orders.map(order => 
            (order.id === id || order.orderId === id) ? updatedOrder : order
          )
          setStoreData({
            ...storeData,
            orders: updatedOrders
          })
        }
        
        setShowUpdateForm(false)
        setNewStatus('')
        setStatusDescription('')
        
        toast.success('Order status updated successfully!')
      } else {
        toast.error('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Error updating order status')
    } finally {
      setUpdating(false)
    }
  }

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'amber',
      processing: 'blue',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red',
      completed: 'green'
    }
    return statusColors[status] || 'gray'
  }

  const StatusBadge = ({ status }) => {
    const color = getStatusColor(status)
    const colorClasses = {
      amber: "bg-amber-100 text-amber-800",
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      green: "bg-green-100 text-green-800",
      red: "bg-red-100 text-red-800",
      gray: "bg-gray-100 text-gray-800"
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
      </span>
    )
  }

  // Show loading while router is not ready or while fetching data
  if (!router.isReady || loading) {
    return (
      <Layout>
        <div className="flex justify-center min-h-screen pt-[6rem] lg:items-center">
          <BarLoader color="#ea580c"/>
        </div>
      </Layout>
    )
  }

  if (error || !orderData) {
    return (
      <Layout>
        <div className="w-full h-screen flex flex-col justify-center items-center pt-[20rem] text-[14px] text-gray-600">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Not Found</h3>
          <p className="text-gray-600 mb-4">The order you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.</p>
          <button 
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </Layout>
    )
  }

  return (
   <>
    <ToastContainer/>
    <Layout>
      <div className="p-6 lg:p-8 space-y-8 pt-20 lg:pt-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
              <p className="text-gray-500 mt-1">Order #{orderData.orderId || orderData.id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <StatusBadge status={orderData.status || 'pending'} />
            <button 
              onClick={() => setShowUpdateForm(!showUpdateForm)}
              className=" cursor-pointer bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              <span>Update Status</span>
            </button>
          </div>
        </div>

        {/* Update Status Form */}
        {showUpdateForm && (
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-800">Update Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStatusUpdate} className="space-y-4 bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    >
                      <option value="">Select status</option>
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="Enter tracking number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Description
                  </label>
                  <textarea
                    value={statusDescription}
                    onChange={(e) => setStatusDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 "
                    rows="3"
                    placeholder="Enter status description (e.g., 'Package has been shipped and is on its way')"
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-black hover:bg-black/70 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Update Status'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUpdateForm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Order Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <Card className='bg-white'>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span>Customer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="font-semibold capitalize">{orderData.username || 'Unknown Customer'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 truncate">Email</label>
                <p className="font-medium">{orderData.email || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p className="font-medium">{orderData.phone || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <Card className='bg-white'>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span>Order Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div>
                <label className="text-sm text-gray-500">Order Date</label>
                <p className="font-semibold">
                  {orderData.createdAt ? new Date(orderData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  }) : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Items</label>
                <p className="font-semibold">
                  {orderData.cart ? orderData.cart.length : (orderData.quantity || 0)} item{((orderData.cart?.length || orderData.quantity) !== 1) ? 's' : ''}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Amount</label>
                <p className="font-semibold text-lg">
                  ${(orderData.total || orderData.orderTotal || 0).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className='bg-white'>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span>Delivery Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div>
                <label className="text-sm text-gray-500">Delivery Address</label>
                <p className="font-medium">{orderData.deliveryAddress || orderData.address || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Tracking Number</label>
                <p className="font-semibold text-gray-600">{trackingNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Updated</label>
                <p className="font-medium">
                  {orderData.updatedAt ? 
                    new Date(orderData.updatedAt).toLocaleString() : 
                    (orderData.createdAt ? new Date(orderData.createdAt).toLocaleString() : 'N/A')
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 ">
              {orderData.cart && orderData.cart.length > 0 ? (
                orderData.cart.map((item, index) => (
                  <div key={index} className="flex bg-white items-center space-x-4 p-4 px-6 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.images ? (
                        <Image 
                        width={80}
                        height={80}
                        priority
                        quality={100}
                        src={item.images[0]} 
                        alt={item.name} 
                          className="w-full h-full object-cover rounded-lg object-top"
                        />
                      ) : (
                        <Package className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name || 'Product Name'}</h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity || 1} × ${(item.price || 0).toLocaleString()}
                      </p>
                      {item.selectedColor && (
                        <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                      )}
                      {item.selectedSize && (
                        <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No items found for this order</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tracking History */}
        {orderData.trackingHistory && orderData.trackingHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-gray-600" />
                <span>Tracking History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 bg-white">
                {orderData.trackingHistory
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((track, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border-l-4 border-gray-500 bg-gray-50 rounded-r-lg">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <StatusBadge status={track.status} />
                          <span className="text-sm text-gray-500">
                            {new Date(track.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">{track.description}</p>
                        {track.location && (
                          <p className="text-sm text-gray-500 mt-1">📍 {track.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
   </>
  )
}