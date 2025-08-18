// You Might Like Component
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import ProductCard from './product-card';
import ProductCardSkeleton from './product-skeleton';
import Image from 'next/image';
export default function YouMightLike({currentProductId}) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const fetchRelatedProducts = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/fetchproducts");
          
          // Filter out current product from the response
          const filteredProducts = response.data.products.filter(product => 
            product.id !== currentProductId && 
            product.id !== parseInt(currentProductId) && 
            product.id.toString() !== currentProductId.toString()
          );
          
          console.log('Current Product ID:', currentProductId, typeof currentProductId);
          console.log('All Products:', response.data.products);
          console.log('Filtered Products:', filteredProducts);
          
          setRelatedProducts(filteredProducts);
        } catch (error) {
          console.error('Failed to fetch related products:', error.message);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => {
    if (currentProductId) {
        fetchRelatedProducts();
    }
    }, []);
  
    if (loading) {
      return (
        <div>
          <h2 className="text-2xl md:text-[32px] font-semibold text-black mb-8">You Might Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      );
    }
  
    if (error || !relatedProducts || relatedProducts.length === 0) {
      return null; // Don't show section if no products or error
    }
  
    return (
      <div>
        <h2 className="text-2xl font-semibold text-black mb-8">You Might Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts
          .slice(0, 4)
          .map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
                <ProductCard 
                    product={product} 
                    className="transition-transform transform hover:scale-105"
                />
            </Link>
          ))}
        </div>
  
        {/* View All Button */}
        {relatedProducts.length > 3 && (
          <div className="text-center mt-8">
            <Link 
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-all duration-200 rounded-md font-medium"
            >
              View More
            </Link>
          </div>
        )}
      </div>
    );
  }