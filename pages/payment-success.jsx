import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useCartStore } from '@/context/cart';
import axios from 'axios';
import { CheckCircle, Package, Truck, Clock, Copy, Check } from 'lucide-react';

// Function to generate unique tracking number
const generateTrackingNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TRK${timestamp}${randomStr}`;
};

// Function to generate order ID
const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD${timestamp}${random}`;
};

export default function PaymentSuccess() {
    const router = useRouter();
    const { clearCart } = useCartStore();
    const [isLoading, setIsLoading] = useState(true);
    const [orderInfo, setOrderInfo] = useState(null);
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const emailSentRef = useRef(false);

    // Copy tracking number to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simulate progress bar
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);
            return () => clearInterval(interval);
        } else {
            setProgress(100);
        }
    }, [isLoading]);

    useEffect(() => {
        let timeoutId;

        async function handleSuccess() {
            if (emailSentRef.current) {
                return;
            }

            try {
                const orderDataString = localStorage.getItem('orderData');
                if (!orderDataString) {
                    console.error('No order data found');
                    setIsLoading(false);
                    return;
                }

                const orderData = JSON.parse(orderDataString);
                
                // DEBUG: Log the order data structure
                console.log('Order data from localStorage:', JSON.stringify(orderData, null, 2));
                
                // Generate tracking info
                const trackingNumber = generateTrackingNumber();
                const orderId = generateOrderId();
                
                const formdata = {
                    address: orderData?.address,
                    city: orderData?.city,
                    email: orderData?.email,
                    firstName: orderData?.firstName,
                    lastName: orderData?.lastName,
                    phone: orderData?.phone,
                    postalCode: orderData.postalCode,
                    state: orderData.state
                };
                
                const cart = orderData?.orderDetails?.cart;
                const total = orderData?.orderDetails?.total;
                
                // DEBUG: Log cart structure before sending
                console.log('Cart data being sent to API:', JSON.stringify(cart, null, 2));
                console.log('Cart length:', cart?.length);
                
                if (cart && Array.isArray(cart)) {
                    cart.forEach((item, index) => {
                        console.log(`Cart item ${index} structure:`, {
                            availableKeys: Object.keys(item),
                            productId: item.productId,
                            id: item.id,
                            quantity: item.quantity,
                            name: item.name,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                            fullItem: item
                        });
                    });
                }
                
                // Set order info for display
                setOrderInfo({
                    orderId,
                    trackingNumber,
                    customerName: `${formdata.firstName} ${formdata.lastName}`,
                    email: formdata.email,
                    total,
                    itemCount: cart?.length || 0
                });

                try {
                    emailSentRef.current = true;
                    
                    console.log('About to send order summary email with:', {
                        formdata,
                        cart,
                        total,
                        trackingNumber,
                        orderId
                    });

                     // Update stock from db 
                   const updatestock = await axios.post('/api/update-stock', { cart });
                    const updateStoreData = await axios.post('/api/update-store', {cart, total, orderId,trackingNumber,formdata})
                    // Send order summary with tracking info
                     const response = await axios.post("/api/sendordersummary", {
                        formdata,
                        cart,
                        total,
                        trackingNumber,
                        orderId
                     });

                    // Send order received to admin
                     const response2 = await axios.post("/api/sendpurchaseemail", {
                        formdata,
                        cart,
                        total,
                        trackingNumber,
                        orderId
                     });

                    // DEBUG: Log cart data before stock update
                    
                   
                    // Send tracking info to database
                     const trackingResponse = await axios.post('/api/create-tracking', {
                        trackingNumber,
                        orderId,
                        customerInfo: formdata,
                        orderDetails: {
                            cart,
                            total,
                            status: 'confirmed',
                            createdAt: new Date().toISOString()
                        }
                    });

                   

                    // Clear all data after successful processing
                     clearCart();
                     localStorage.removeItem('orderData');
                     localStorage.removeItem('cart');
                     localStorage.removeItem('total');
                     localStorage.removeItem('count');

                    // // Set timeout for redirect
                    //  timeoutId = setTimeout(() => {
                    //      router.push('/');
                    //  }, 8000);
                } catch (error) {
                    console.error("Error processing order:", error);
                    console.error("Error details:", error.response?.data);
                    emailSentRef.current = false;
                }
            } catch (error) {
                console.error('Error in success handling:', error);
            } finally {
                setIsLoading(false);
            }
        }

        handleSuccess();
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [router, clearCart]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md w-full mx-4 border border-gray-200">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-gray-600 animate-pulse" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Processing Your Order</h2>
                        <p className="text-gray-600 text-sm">Please wait while we confirm your payment...</p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                            className="bg-black h-2 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500">{progress}% Complete</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                        <CheckCircle className="w-12 h-12 text-gray-600" />
                    </div>
                    <h1 className="text-3xl font-medium text-gray-900 mb-2">
                        Order Confirmed
                    </h1>
                    <p className="text-gray-600">Thank you for your purchase. Your order is being processed.</p>
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Order Info */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <Package className="w-5 h-5 mr-2 text-gray-600" />
                                Order Details
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Order ID</span>
                                    <span className="font-medium text-gray-900">{orderInfo?.orderId}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Customer</span>
                                    <span className="font-medium text-gray-900">{orderInfo?.customerName}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Items</span>
                                    <span className="font-medium text-gray-900">{orderInfo?.itemCount} item(s)</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Total</span>
                                    <span className="font-medium text-gray-900">${orderInfo?.total?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Info */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <Truck className="w-5 h-5 mr-2 text-gray-600" />
                                Tracking Information
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-600">Tracking Number</span>
                                    <button
                                        onClick={() => copyToClipboard(orderInfo?.trackingNumber)}
                                        className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors text-sm"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        <span>{copied ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>
                                <div className="font-mono text-base font-medium text-gray-900 bg-white rounded p-3 border border-gray-200">
                                    {orderInfo?.trackingNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-600" />
                        Order Status
                    </h3>
                    <div className="relative">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xs text-center text-green-600 font-medium">Payment<br/>Confirmed</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                                <div className="h-full bg-gray-900 w-1/4 rounded"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center mb-2">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xs text-center text-gray-900 font-medium">Processing<br/>Order</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                                    <Truck className="w-6 h-6 text-gray-400" />
                                </div>
                                <span className="text-xs text-center text-gray-400 font-medium">Shipped</span>
                            </div>
                            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle className="w-6 h-6 text-gray-400" />
                                </div>
                                <span className="text-xs text-center text-gray-400 font-medium">Delivered</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <button
                        onClick={() => router.push(`/tracking?tracking=${orderInfo?.trackingNumber}`)}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                        Track Your Order
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Continue Shopping
                    </button>
                </div>

                {/* Footer Info */}
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-600 mb-2">A confirmation email has been sent to <span className="font-medium text-gray-900">{orderInfo?.email}</span></p>
                    <p className="text-gray-500 text-sm">You will be redirected to the homepage shortly</p>
                </div>
            </div>
        </div>
    );
}