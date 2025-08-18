'use-client'
import React, { useState } from 'react';
import { Heart, Star, Eye , ShoppingCart, ShoppingBasket,ShoppingBag} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Slideup from '../animation/slide-up';
export default function ProductCard({ product }){
    const [likedItems, setLikedItems] = useState(new Set());
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const colorMap = {
        white: 'bg-white border-gray-300',
        black: 'bg-black',
        gray: 'bg-gray-400',
        blue: 'bg-blue-600',
        brown: 'bg-amber-700',
        cream: 'bg-amber-50 border-gray-300'
      };

    const toggleLike = (id) => {
        setLikedItems((prev) => {
            const newLikedItems = new Set(prev);
            if (newLikedItems.has(id)) {
                newLikedItems.delete(id);
            } else {
                newLikedItems.add(id);
            }
            return newLikedItems;
        });
    };
    
return (
    <div 
    className=" bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200"
    onMouseEnter={() => setHoveredProduct(product.id)}
    onMouseLeave={() => setHoveredProduct(null)}
  >
    {/* Image Container */}
    <div className="relative aspect-square overflow-hidden bg-gray-50 transition-all duration-500">
      <Image
        src={hoveredProduct === product.id ? product.images[0] : product.images[1]}
        alt={product.name}
        width={500}
        height={500}
        quality={100}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 object-top"
      />
      
      {/* Wishlist Button */}
      <button
        onClick={() => toggleLike(product.id)}
        className="absolute top-3 right-2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 shadow-sm"
      >
        <Heart
          size={16}
          className={`transition-all duration-200 ${
            likedItems.has(product.id)
              ? 'fill-black stroke-black'
              : 'stroke-black hover:fill-gray-200'
          }`}
        />
      </button>
    </div>

    {/* Product Info */}
    <div className="py-5 px-2 space-y-2">
      {/* Brand */}
      <div className="text-black/60 text-xs font-medium tracking-wider uppercase">
        <p className='text-gray-500 font-light -mb-1 text-[8px] md:text-[12px] lg:text-[10px]'>AMPLUS</p>
      </div>

      {/* Product Name */}
      <h3 className="text-black text-base mb-3 font-medium leading-tight md:text-xl lg:text-[18px]">
        {product.name}
      </h3>

      

      {/* Colors */}
      <div className="flex gap-2">
        {product.colors.map((color) => (
          <div
            key={color}
            className={`w-5 h-5 md:w-8 md:h-8 rounded-full border ${colorMap[color]} ${
              color === 'white' ? 'border-gray-300' : 'border-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-black text-lg md:text-[26px] lg:text-[24px] font-semibold">${product.price} USD</span>
            {
                product.prevprice && (
                    <span className="text-gray-500 line-through text-sm">
                    ${product.prevprice} USD
                    </span>
                )
            }
      </div>

      {/* product page button */} 
      <Link
  href={`products/${product.id}`}
  className="py-3 w-full flex justify-center items-center gap-1 bg-black text-white font-medium  transition-all duration-200 hover:bg-black/90 active:scale-95"
>
  <ShoppingBag size={window.innerWidth >= 768 ? 20 :16} />
</Link>

    </div>
  </div>
)
}