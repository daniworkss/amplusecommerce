import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-skeleton";
import { useEffect, useState } from "react";
import ProductCardError from "./productloaderror";
import axios from "axios";
import Link from "next/link"
import Slideup from "../animation/slide-up";
export default function ProductGrid  () {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.post("/api/fetchproducts");
            setProducts(response.data.products);
            console.log(response.data.products,'products fetched successfully');
            setLoading(false);
            
        } catch (error) {
            console.log(error.message,'error loading products')
            setLoading(false);
            setError(true);
           
        }
    }

    useEffect(() =>{
        fetchProducts()
    },[])




if (loading) {
    return (
      <div className="  px-[10px] py-[40px] lg:py-[40px] pt-6">
        <div className="max-w-[1800px] mx-auto ">
          <Slideup delay={0.1} percent={20} className="flex items-center w-full mb-10 mt-6">
          <div className="flex-1 h-[3px] bg-black"></div>
          <h1 className="mx-4 text-black text-2xl lg:text-4xl font-bold">Top Sellers</h1>
          <div className="flex-1 h-[3px] bg-black"></div>
          </Slideup>

              <Slideup percent={20} delay={0.2} className="max-w-6xl mx-auto grid grid-cols-2  lg:grid-cols-4 gap-3 mt-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                  ))}
            </Slideup>
          </div>
      </div>
   
    );
  }

if (error) {
    return (
      <div className="  px-[10px] py-[40px] lg:py-[40px] pt-6">
      <div className="max-w-[1800px] mx-auto ">
       <Slideup delay={0.1} percent={20} className="flex items-center w-full mb-10 mt-6">
        <div className="flex-1 h-[3px] bg-black"></div>
        <h1 className="mx-4 text-black text-2xl lg:text-4xl font-bold">Top Sellers</h1>
        <div className="flex-1 h-[3px] bg-black"></div>
        </Slideup>

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Slideup key={index}>
                  <ProductCardError onRetry={fetchProducts}  />
              </Slideup>
            ))}
       </div>
      </div>
      </div>
    );
  }

  return (
    <div className=" px-[10px] py-[40px] lg:py-[40px] pt-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div  className="flex items-center w-full mb-10 mt-6">
        <div className="flex-1 h-[3px] bg-black"></div>
        <h1 className="mx-4 text-black text-2xl lg:text-4xl font-bold">Top Sellers</h1>
        <div className="flex-1 h-[3px] bg-black"></div>
        </div>


        {/* Product Grid */}
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-3">
          {products.map((product) => (
            < div key={product.id}>
               <ProductCard  product={product} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
            <Link href={'/products'} className=" uppercase text-[14px] bg-black px-8 py-4 md:px-12  lg:px-12 lg:py-4 lg:text-[14px]  font-medium text-white w-[25%]">
                View More
            </Link>
        </div>

      </div>
    </div>
  );
};

