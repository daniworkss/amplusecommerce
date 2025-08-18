import React, { useState, useEffect } from 'react';
import { Heart, Plus, Minus } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/router';
import axios from 'axios'; // Added missing axios import
import Image from 'next/image';
import SecondHeader from '@/components/user/second-header'; // Fixed duplicate import
import Link from 'next/link';
import ProductPageSkeleton from '@/components/user/productpageskeleton';
import YouMightLike from '@/components/user/relatedProducts';
import Footer from '@/components/user/footer';
import { useCartStore } from '@/context/cart';
export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');  
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [sliderRef, setSliderRef] = useState(null);
  const { addToCart } = useCartStore(); 
  const [buttonText, setbuttonText] = useState("Add to Cart");
  
  const fetchProduct = async (id) => {
    try {
      const res = await axios.get(`/api/product-page/${id}`);
      setProduct(res.data);
      console.log("Product fetched successfully:", res.data, id);
      // Set initial selections with proper fallbacks
      if (res.data.sizes && res.data.sizes.length > 0) {
        setSelectedSize(res.data.sizes[0]);
      }
      if (res.data.colors && res.data.colors.length > 0) {
        setSelectedColor(res.data.colors[0]);
      }
      
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch product", error.message); 
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const selectedVariants= {
    selectedSize,selectedColor
  }
  const handleAddToCart = () => {
    setError(false);
    const updatedProduct = {
      ...product,
      id // Ensure product has an id field
    }
    addToCart(updatedProduct, quantity, selectedVariants, id);
    setbuttonText("Add More");
    setQuantity(1);
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  // Reset quantity when size/color changes
  useEffect(() => {
    if (product) { // Added product check
      const maxStock = getAvailableStock();
      if (quantity > maxStock && maxStock > 0) {
        setQuantity(Math.min(quantity, maxStock));
      } else if (maxStock === 0) {
        setQuantity(1); // Reset to 1 if no stock
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize, selectedColor, product]); // Added product as dependency

  const getAvailableStock = () => {
    if (!product) return 0;
    
    if (product.inventoryType === 'size') {
      return selectedSize ? (product.sizeInventory?.[selectedSize] || 0) : 0;
    } else if (product.inventoryType === 'color') {
      return selectedSize && selectedColor 
        ? (product.colorInventory?.[selectedColor]?.[selectedSize] || 0) 
        : 0;
    }
    return product.stock || 0;
  };

  const isOutOfStock = () => {
    if (!product) return true;
    
    if (product.inventoryType === 'size') {
      return !selectedSize || (product.sizeInventory?.[selectedSize] || 0) === 0;
    } else if (product.inventoryType === 'color') {
      return !selectedSize || !selectedColor || 
        (product.colorInventory?.[selectedColor]?.[selectedSize] || 0) === 0;
    }
    return (product.stock || 0) === 0;
  };

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: product?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentImage(next)
  };

  const colorMap = {
    white: 'bg-white border-gray-300',
    black: 'bg-black',
    gray: 'bg-gray-400',
    blue: 'bg-blue-600',
    brown: 'bg-amber-700',
    cream: 'bg-amber-50 border-gray-300'
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <SecondHeader />
        <div className='pt-32'>
          <ProductPageSkeleton />
        </div>
      </div>
    );
  }

  // Error or no product state
  if (!product || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <SecondHeader />
        <div className="flex justify-center items-center min-h-screen pt-32">
          <div className="text-center bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
            <p className="text-gray-500">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/" className="inline-flex items-center mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div>
      <SecondHeader />
      <div className="max-w-6xl mx-auto p-4 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Slider {...sliderSettings} ref={setSliderRef}>
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <Image 
                      priority
                      width={500}
                      height={500}
                      quality={100}
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full aspect-square object-cover md:object-top"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImage(index);
                      sliderRef?.slickGoTo(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 md:w-30 md:h-30 rounded-md overflow-hidden border-2 ${
                      currentImage === index ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <Image
                    width={100}
                    height={100}

                      priority
                      quality={100}
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            
            {/* Product Header */}
            <div>
              <p className="text-gray-500 text-sm md:text-lg font-light mb-1">AMPLUS</p>
              <h1 className="text-2xl md:text-4xl font-medium text-black mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-4xl font-semibold text-black">${product.price} USD</span>
                {product.prevprice && (
                  <span className="text-lg text-gray-400 line-through">${product.prevprice}</span>
                )}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <p className="text-sm font-medium md:text-[16px] text-black mb-3">Color</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${colorMap[color] || 'bg-gray-300'} ${
                        selectedColor === color ? 'border-black' : 'border-gray-300'
                      } ${color === 'white' || color === 'cream' ? 'border-gray-400' : ''}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 capitalize md:text-[16px]">{selectedColor}</p>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-sm font-medium text-black mb-3 md:text-[16px]">Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => {
                    const sizeStock = product.inventoryType === 'size' 
                      ? (product.sizeInventory?.[size] || 0)
                      : (product.colorInventory?.[selectedColor]?.[size] || 0);
                    const isUnavailable = sizeStock === 0;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => !isUnavailable && setSelectedSize(size)}
                        disabled={isUnavailable}
                        className={`py-3 px-4 border rounded-md text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : isUnavailable
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'border-gray-300 text-black hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-medium text-black mb-3 md:text-[16px]
              ">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus size={window.innerWidth >=768 ?20:16} />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      const maxStock = getAvailableStock();
                      if (quantity < maxStock) {
                        setQuantity(quantity + 1);
                      }
                    }}
                    disabled={quantity >= getAvailableStock() || getAvailableStock() === 0}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {getAvailableStock() > 0 ? `${getAvailableStock()} available` : 'Select size to see availability'}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <button
                disabled={isOutOfStock()}
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-md font-medium transition-all md:text-[20px] ${
                  isOutOfStock()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {isOutOfStock() ? 'Out of Stock' : buttonText}
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-4 border border-gray-300 rounded-md hover:border-gray-400"
              >
                <Heart 
                  size={20} 
                  className={isLiked ? 'fill-black stroke-black' : 'stroke-black'} 
                />
              </button>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <p className="text-sm font-medium text-black mb-4 md:text-[18px]">Outfit Details</p>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-black rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700 leading-relaxed md:text-[16px]">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-xs text-gray-500 italic md:text-[14px]">
                All sales are final. No refunds or exchanges.
              </p>
            </div>
          </div>
        </div>

        {/* You Might Like Section */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <YouMightLike currentProductId={id} />
        </div>
      </div>

        {/* Footer */}
        <Footer/>
    </div>
  );
}

