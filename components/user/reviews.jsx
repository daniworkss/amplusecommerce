import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import Slideup from "../animation/slide-up";
export default function CustomerReviews() {
  const reviews = [
    {
      name: "David",
      rating: 5,
      text: "Absolutely love my purchases from AmPlus! The quality is exceptional and shipping was incredibly fast. Will definitely be shopping here again.",
    },
    {
      name: "Femi",
      rating: 4,
      text: "Outstanding customer service and premium products. The attention to detail in packaging and presentation really sets AmPlus apart.",
    },
    {
      name: "Daisy",
      rating: 5,
      text: "I've been a customer for over a year now. The curated selection and quality never disappoint. Highly recommend!",
    },
    {
      name: "Michael",
      rating: 5,
      text: "The fit and fabric quality exceeded my expectations. Every piece I've ordered has become a staple in my wardrobe. Worth every penny!",
    },
    {
      name: "Sarah",
      rating: 4,
      text: "Amazing trendy pieces that get me compliments everywhere I go. The styling tips from their team are also incredibly helpful!",
    },
    {
      name: "James",
      rating: 5,
      text: "Fast delivery, great packaging, and the clothes look exactly like the photos. AmPlus has become my go-to for all fashion needs.",
    }
  ];



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 pb-20 pt-10 lg:py-[80px]">
      <div className="max-w-7xl mx-auto px-8 lg:px-8">
        <Slideup delay={0.2} percent={10} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  lg:text-5xl font-bold text-black mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-sm md:text-lg lg:text-xl">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </Slideup>

        {/* Desktop: Grid layout, Mobile/Tablet: Carousel */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border">
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <div className="mb-4">
                <Quote className="text-gray-300 mb-2" size={24} />
                <p className="text-gray-700 italic">"{review.text}"</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-black">{review.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: Carousel */}
        <div className="lg:hidden relative">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index}>
                <div className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-gray-300 shadow-sm md:w-[80%] md:mx-auto">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <div className="mb-4">
                    <Quote className="text-gray-300 mb-2" size={24} />
                    <p className="text-gray-700 italic">"{review.text}"</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-black">{review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* <div className="text-center mt-8">
          <Link href="#" className="inline-flex items-center text-black font-medium hover:underline">
            Read More Reviews
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div> */}
      </div>

      <style jsx global>{`
        .slick-dots {
          bottom: -50px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #9CA3AF;
        }
        .slick-dots li.slick-active button:before {
          color: #000;
        }
      `}</style>
    </section>
  );
}