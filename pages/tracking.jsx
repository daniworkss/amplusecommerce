import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Package, Truck, CheckCircle, Clock, MapPin, Search, Mail, Phone, Calendar } from 'lucide-react';
import SecondHeader from '@/components/user/second-header';
import Footer from '@/components/user/footer';

const TrackingPage = () => {
  const router = useRouter();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('tracking'); // 'tracking' or 'order'
  const [emailInput, setEmailInput] = useState('');

  // Get tracking number from URL params
  useEffect(() => {
    const { tracking } = router.query;
    if (tracking) {
      setSearchQuery(tracking);
      searchOrder(tracking, 'tracking');
    }
  }, [router.query]);

  const searchOrder = async (query, type) => {
    if (!query.trim()) {
      setError('Please enter a tracking number or order ID');
      return;
    }

    if (type === 'order' && !emailInput.trim()) {
      setError('Email address is required when searching by Order ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let url = `/api/fetch-tracking?`;
      
      if (type === 'tracking') {
        url += `trackingNumber=${encodeURIComponent(query)}`;
      } else {
        url += `orderId=${encodeURIComponent(query)}&email=${encodeURIComponent(emailInput)}`;
      }

      const response = await fetch(url);
      const result = await response.json();
      console.log(result.data,'this is the result of the search')

      if (!response.ok) {
        throw new Error(result.message || result.error);
      }

      setTrackingData(result.data);
    } catch (err) {
      setError(err.message || 'Unable to find order. Please check your details and try again.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError('Please enter a tracking number or order ID');
      return;
    }

    if (searchType === 'order' && !emailInput.trim()) {
      setError('Email address is required when searching by Order ID');
      return;
    }

    searchOrder(searchQuery, searchType);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-gray-900" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-gray-900" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-50 text-green-800 border border-green-200';
      case 'processing':
        return 'bg-gray-50 text-gray-800 border border-gray-200';
      case 'shipped':
        return 'bg-gray-50 text-gray-800 border border-gray-200';
      case 'delivered':
        return 'bg-green-50 text-green-800 border border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
    <SecondHeader/>
    <div className="max-w-4xl mx-auto px-4 pt-[7rem] pb-[2rem]">
     
      <div className="text-center mb-8">
        <h1 className="text-3xl font-medium text-gray-900 mb-2">Track Your Order</h1>
        <p className="text-gray-600">Enter your tracking number or order details to see the latest updates</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="space-y-4">
          {/* Search Type Toggle */}
          <div className="flex gap-6 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="tracking"
                checked={searchType === 'tracking'}
                onChange={(e) => setSearchType(e.target.value)}
                className="mr-3 w-4 h-4 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm font-medium text-gray-900">Tracking Number</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="order"
                checked={searchType === 'order'}
                onChange={(e) => setSearchType(e.target.value)}
                className="mr-3 w-4 h-4 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm font-medium text-gray-900">Order ID + Email</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'tracking' ? 'Tracking Number' : 'Order ID'}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'tracking' ? 'TRK...' : 'ORD...'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                required
              />
            </div>
            
            {searchType === 'order' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required={searchType === 'order'}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors font-medium"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(trackingData.status)}`}>
                {trackingData.status.charAt(0).toUpperCase() + trackingData.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-b border-gray-100 pb-4 lg:border-b-0 lg:pb-0">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order ID</h3>
                <p className="text-sm font-mono text-gray-900">{trackingData.orderId}</p>
              </div>
              <div className="border-b border-gray-100 pb-4 lg:border-b-0 lg:pb-0">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tracking Number</h3>
                <p className="text-sm font-mono text-gray-900">{trackingData.trackingNumber}</p>
              </div>
              <div className="border-b border-gray-100 pb-4 lg:border-b-0 lg:pb-0">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total</h3>
                <p className="text-lg font-medium text-gray-900">${trackingData.order.total.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Items</h3>
                <p className="text-sm text-gray-900">{trackingData.order.itemCount} item(s)</p>
              </div>
            </div>

            {/* Estimated Delivery */}
            {trackingData.tracking.estimatedDelivery && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Estimated Delivery: {formatDate(trackingData.tracking.estimatedDelivery)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Customer</span>
                </div>
                <p className="text-sm text-gray-900">{trackingData.customer.name}</p>
                <p className="text-sm text-gray-600">{trackingData.customer.email}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Delivery Address</span>
                </div>
                <p className="text-sm text-gray-900">
                  {trackingData.shipping.address}<br />
                  {trackingData.shipping.city}, {trackingData.shipping.state} {trackingData.shipping.postalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Tracking History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Tracking History</h2>
            <div className="space-y-4">
              {trackingData.tracking.history.map((event, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 capitalize">
                        {event.status.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(event.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    {event.location && (
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          {trackingData.order.items && trackingData.order.items.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {trackingData.order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      {item.images && item.images[0] ? (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Package className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedColor && item.selectedSize && <span> • </span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium text-gray-900">${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    <Footer/>
  </div>
);
};

export default TrackingPage;