import { useState, useEffect } from "react";
import { useCartStore } from "@/context/cart";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BeatLoader } from "react-spinners";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutSkeleton from "@/components/user/payments/checkoutskeleton";
import SecondHeader from "@/components/user/second-header";
import Footer from "@/components/user/footer";
// Dynamically import PaymentFormWrapper with no SSR
const PaymentFormWrapper = dynamic(
  () => import('@/components/user/payments/paymentform'),
  { ssr: false }
);

// Initialize Stripe outside the component to prevent unnecessary re-initialization
const stripePromise = loadStripe('pk_test_51PgEgUAKkXYBxheYgeiVKvrWVVOO3kwuiQIHqDQ1XYYwdvwJSLH1h3PiCgbLGXL1t75rQkT2fS2RRNC41ZGG7gzi00HVgDasZj');

// US states array for the dropdown
const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function Checkout() {
  // State management using context and local state
  const { cart, total, clientSecret, setClientSecret, getCartSummary } = useCartStore();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Add state for client-side mounting
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Form data state with shipping information
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  // Get cart summary
  const cartSummary = getCartSummary();

  // Effect to create payment intent when component mounts
  useEffect(() => {
    if (total > 0) {
      createPaymentIntent();
    }
    console.log(cart, cartSummary,'this is summarry')
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [total]);

  async function createPaymentIntent() {
    // Safety check to ensure we're not sending NaN
    if (isNaN(total) || total <= 0) {
      console.error('Invalid amount:', total);
      setMessage("Invalid order total. Please try again.");
      setError(true);
      return;
    }

    try {
      console.log('Creating payment intent with amount:', total);
      
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Payment creation failed');
      }

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error('Received empty clientSecret');
      }
    } catch (error) {
      console.error('Payment intent creation error:', error);
      setMessage("Failed to initialize payment. Please try again.");
      setError(true);
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Loading state display
  if (loading) {
    return (
      <>
        <SecondHeader />
        <div className="px-[10px] py-[40px] lg:py-[40px] pt-16">
          <div className="max-w-[1800px] mx-auto">
          <CheckoutSkeleton />
          </div>
      </div>
        <Footer/>
      </>
    );
  }

  // Error state display
  if (error) {
    return (
      <>
        <SecondHeader/>
            <div className="px-[10px] py-[40px] lg:py-[40px] pt-16">
                <div className="max-w-[1800px] mx-auto">
                  <div className="flex justify-center pt-[12rem] text-gray-600 w-full min-h-screen">
                    <div className="text-center">
                      <h2 className="text-xl font-medium mb-2">Something went wrong</h2>
                      <p className="text-gray-500">Please refresh the page and try again</p>
                    </div>
                  </div>
                </div>
            </div>
        <Footer/>
      
      </>
    );
  }

  // Main checkout page layout
  return (
   <>
      <SecondHeader/>
      <div className="px-[10px] py-[40px] lg:py-[40px] pt-16">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center w-full mb-10 mt-6">
          <div className="flex-1 h-[3px] bg-black"></div>
          <h1 className="mx-4 text-black text-2xl lg:text-4xl font-bold">Checkout</h1>
          <div className="flex-1 h-[3px] bg-black"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Billing Information and Payment */}
          <div className="space-y-8">
            {/* Billing Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Billing Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                    required
                  >
                    <option value="" disabled>
                      State
                    </option>
                    {US_STATES.map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="ZIP Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Information</h2>
              {clientSecret && isMounted && (
                <PaymentFormWrapper
                  formData={formData}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                  setMessage={setMessage}
                  cart={cart}
                  total={total}
                  promise={stripePromise}
                  secret={clientSecret}
                />
              )}
              {message && (
                <div className="text-red-600 mt-4 p-3 bg-red-50 rounded-md border border-red-200">
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Right column: Order Summary */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                {cartSummary.items.map(item => (
                  <div key={item.cartItemId} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.images && item.images[0] ? item.images[0] : '/placeholder-image.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.selectedColor && (
                          <span className="capitalize">Color: {item.selectedColor}</span>
                        )}
                        {item.selectedColor && item.selectedSize && <span className="mx-1">•</span>}
                        {item.selectedSize && (
                          <span>Size: {item.selectedSize}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium text-gray-900">${item.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartSummary.totalItems} items)</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">Calculated at checkout</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
   </>
  );
}