import { useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
export default function HeroSection() {
    const images = [
      'https://res.cloudinary.com/dccph2plo/image/upload/v1754860859/DSC04429_1_tsacro.jpg',
      'https://res.cloudinary.com/dccph2plo/image/upload/v1754860857/IMG_8810_uxtszs.jpg',
      'https://res.cloudinary.com/dccph2plo/image/upload/v1754860859/DSC04456_jpxnln.jpg',
      'https://res.cloudinary.com/dccph2plo/image/upload/v1754860860/DSC04403_fnh3cj.jpg'
    ];

    const settings = {
      dots: false,
      infinite: true,
      fade: true,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };
  
    return (
     <>
       {/* mobile view */}
         <div className="lg:hidden relative h-[550px] bg-black md:h-[650px] lg:min-h-screen">
        <Slider {...settings} >
          {images.map((src, i) => (
            <div key={i} className="relative h-[550px] md:h-[650px]  lg:min-h-screen">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center md:bg-top lg:bg-top "
                style={{
                  backgroundImage: `url(${src})`
                }}
              />
              <div className="relative z-30 flex flex-col items-center justify-center h-full text-white text-center">
                <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg text-white">
                  STYLE THAT SPEAKS 
                </h1>
                <p className="text-xl opacity-90 drop-shadow-md md:text-3xl">
                  AmPlus Lifestyle
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-block px-8 py-3 bg-white text-black font-regular rounded-sm shadow-lg hover:bg-gray-200 transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </Slider>
          </div>

{/* for laptop view */}
      <div className=" hidden lg:block relative h-[550px] bg-black md:h-[650px] lg:min-h-screen  bg-cover bg-no-repeat bg-center"style={{
                  backgroundImage: `url(${'https://res.cloudinary.com/dccph2plo/image/upload/v1754990083/DSC04454_bnz1o3.jpg'})`,
                 
                }}>
       <div className="relative z-30 flex flex-col items-center justify-center h-full text-white text-center">
                <h1 className="text-5xl  font-bold mb-4 drop-shadow-lg text-white">
                  STYLE THAT SPEAKS
                </h1>
                <p className="text-2xl opacity-90 drop-shadow-md ">
                  AmPlus Lifestyle
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-block px-10 py-4 bg-white text-black text-[14px] font-regular rounded-sm shadow-lg hover:bg-gray-200 transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
          </div>

{/* for hero images */}
<div className="mt-0 grid grid-cols-1 gap-0 lg:grid-cols-2 mx-auto ">
  <div className="w-full h-[180px] md:h-[300px]  lg:h-[250px] bg-gray-100 rounded-lg relative">
    <Image
      src="https://res.cloudinary.com/dccph2plo/image/upload/v1754866122/New_Project_83_hig00t.jpg"
      alt="Hero Image 1"
      fill
      priority
    //style={{ objectFit: "contain" }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
  
  <div className="w-full h-[180px] md:h-[300px] lg:h-[250px] bg-gray-100 rounded-lg relative">
    <Image
    priority
      src="https://res.cloudinary.com/dccph2plo/image/upload/v1754866120/New_Project_84_gqwrmb.jpg"
      alt="Hero Image 2"
      fill
    //   style={{ objectFit: "contain" }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
</div>
     </>
    );
  }
