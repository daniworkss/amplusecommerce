import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/user/product-card';
import ProductCardSkeleton from '@/components/user/product-skeleton';
import Image from 'next/image';
import Header from '@/components/user/header';
import axios from 'axios';
import Footer from '@/components/user/footer';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post("/api/fetchproducts");
      setProducts(response.data.products || []);
      console.log(response.data.products, 'products fetched successfully');
    } catch (error) {
      console.log(error.message, 'error loading products');
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { value: 'all', label: 'All Products' },
    // Add more categories as needed based on your product data
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    let filtered = products.filter(product => {
      if (!product) return false;
      
      const matchesCategory = selectedCategory === 'all' || 
        (product.category && product.category === selectedCategory);
      
      const productName = product.name || '';
      const productBrand = product.brand || '';
      
      const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           productBrand.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'newest':
        // Assuming products have a createdAt field or are already sorted by newest
        // If you have a date field, sort by it:
        // filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex items-center justify-center gap-2 mt-16">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded-md hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={`min-w-[40px] h-10 px-3 rounded-md transition-colors ${
              page === currentPage
                ? 'bg-black text-white'
                : page === '...'
                ? 'cursor-default text-gray-400'
                : 'border border-gray-300 hover:border-black text-black'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded-md hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  const handleRetry = () => {
    fetchProducts();
  };

  return (
    <>
      <Header />
      <div className="">
        {/* Hero Section */}
        <div
        className="w-full bg-black h-[300px] md:h-[500px] bg-center bg-cover flex flex-col items-center justify-center"
        style={{
            backgroundImage: "url('https://res.cloudinary.com/dccph2plo/image/upload/v1754990083/DSC04454_bnz1o3.jpg')"
        }}  
        >
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            Street Culture. <span className="font-light">Elevated.</span>
        </h1>
        <p className="text-white text-[12px] italic md:text-xl mt-4 text-center">
        &quot;Style That Speaks for You&quot;
        </p>
    </div>





        <div className="max-w-7xl mx-auto px-4 py-16">
          
          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 pb-8 border-b border-gray-200 md:flex-row-reverse">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div className="flex gap-2  overflow-x-hidden ">
              {/* Category Filter */}
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 md:px-6 py-3 md:pr-12 pr-8 font-medium focus:outline-none transition-all cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 md:px-6 py-3 md:pr-12 pr-8 font-medium focus:outline-none  transition-all cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            </>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-gray-500 mb-6">
                  We couldn't load the products. Please try again.
                </p>
                <button 
                  onClick={handleRetry}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Content State */}
          {!loading && !error && (
            <>
              {/* Results Info */}
              {filteredAndSortedProducts.length > 0 && (
                <div className="flex justify-between items-center mb-8">
                  <p className="text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
                  </p>
                  {totalPages > 1 && (
                    <p className="text-sm text-gray-500">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>
              )}

              {/* Products Grid */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id || product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {products.length === 0 ? 'No products available' : 'No products found'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {products.length === 0 
                        ? 'Products will appear here once they are added to your store.'
                        : 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                      }
                    </p>
                    {products.length > 0 && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSortBy('newest');
                        }}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Pagination */}
              <Pagination />
            </>
          )}
        </div>
      </div>

      <Footer/>
    </>
  );
}