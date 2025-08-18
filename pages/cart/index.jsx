import { useState, useEffect } from 'react';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import SecondHeader from '@/components/user/second-header';
import { useCartStore } from '@/context/cart';
import Footer from '@/components/user/footer';
import Link from 'next/link';
export default function CartPage() {
  const { 
    cart, 
    total, 
    count,
    updateQuantity, 
    removeFromCart, 
    getCartSummary,
    isInitialized,
    initialize
  } = useCartStore();

  const [loading, setLoading] = useState(false);

  // Initialize cart store on component mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Get cart summary data
  const cartSummary = getCartSummary();
  const { items: cartItems, totalItems } = cartSummary;

  if (cartItems.length === 0) {
    return (
      <>
        <SecondHeader />
        <div className="px-[10px] py-[40px] lg:py-[40px] pt-[60px] lg:pt-[5rem] ">
          <div className="max-w-[1800px] mx-auto ">
            {/* Header */}
            <div className="flex items-center w-full mb-10 mt-6">
              <div className="flex-1 h-[3px] bg-black"></div>
              <h1 className="mx-4 text-black text-2xl lg:text-4xl font-bold">Shopping Cart</h1>
              <div className="flex-1 h-[3px] bg-black"></div>
            </div>

            {/* Empty Cart */}
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add some items to get started</p>
              <Link href={'/'} className="uppercase text-[14px] bg-black px-8 py-4 md:px-12 lg:px-12 lg:py-4 lg:text-[14px] font-medium text-white">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SecondHeader />
      <div className="px-[10px] py-[40px] lg:py-[40px] lg:pt-[5rem] pt-[70px]">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="flex items-center w-full mb-10 mt-6 ">
            <div className="flex-1 h-[3px] bg-black"></div>
            <h1 className="mx-4 text-black text-2xl lg:text-4xl font-bold">Shopping Cart</h1>
            <div className="flex-1 h-[3px] bg-black"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img 
                          src={item.images && item.images[0] ? item.images[0] : '/placeholder-image.jpg'} 
                          alt={item.name}
                          className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 text-sm lg:text-base">{item.name}</h3>
                            <div className="text-xs lg:text-sm text-gray-600 mt-1">
                              {item.selectedColor && (
                                <span className="capitalize">Color: {item.selectedColor}</span>
                              )}
                              {item.selectedColor && item.selectedSize && <span className="mx-2">•</span>}
                              {item.selectedSize && (
                                <span>Size: {item.selectedSize}</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex justify-between items-end mt-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">${item.price}</span>
                            {item.prevprice && (
                              <span className="text-sm text-gray-500 line-through">${item.prevprice}</span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                              className="p-1 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right mt-2">
                          <span className="text-sm font-medium text-gray-900">
                            ${item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">Free</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-medium text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

              <div className='flex flex-col items-center text-center'>
              <Link href="/cart/checkout" className="w-full mt-6 uppercase text-[14px] bg-black px-4 py-4 font-medium text-white hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </Link>

                <Link href={'/'} className="w-full mt-3 uppercase text-[14px] border border-gray-300 px-4 py-4 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </Link>
              </div>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="mt-12">
            <div className="flex items-center w-full mb-6">
              <div className="flex-1 h-[2px] bg-gray-300"></div>
              <h2 className="mx-4 text-gray-700 text-lg lg:text-xl font-medium">Item Details</h2>
              <div className="flex-1 h-[2px] bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cartItems.map((item) => (
                <div key={`specs-${item.cartItemId}`} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">{item.name}</h3>
                  <ul className="space-y-1">
                    {item.specifications && item.specifications.map((spec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}