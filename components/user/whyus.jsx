import { Shield, Truck, Award } from "lucide-react";
import { useEffect, useState } from "react";
import Slideup from "../animation/slide-up";
import Slidein from "../animation/slide-in";
export default function WhyChooseUs() {
  const [iconSize, setIconSize] = useState(24);

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth < 1200 ? 24 : 42);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      icon: <Shield size={iconSize} />,
      title: "Secure Payment",
      description: "Your transactions are protected with bank-level security"
    },
    {
      icon: <Truck size={iconSize} />,
      title: "Fast Shipping",
      description: "Fast delivery once order is processed"
    },
    {
      icon: <Award size={iconSize} />,
      title: "Premium Quality",
      description: "Curated products that meet our high standards"
    }
  ];

  return (
    <section className="py-16 lg:py-12  bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slideup percent={20}  className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
            Why Choose AmPlus?
          </h2>
          <p className="text-white/70 text-sm md:text-lg max-w-2xl lg:text-lg mx-auto ">
            Experience the difference with our commitment to quality, service, and your satisfaction
          </p>
        </Slideup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 lg:w-[80%] mx-auto">
          {features.map((feature, index) => (
            <Slidein  direction={'-20%'} delay={0.5}  key={index} className="text-center group cursor-pointer">
              <div className="w-16 h-16 lg:w-[100px] lg:h-[100px] bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 ease-out">
                {feature.icon}
              </div>
              <h3 className="text-xl lg:text-xl font-bold text-white  mb-1 lg:mb-3 group-hover:text-white/80 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-200">
                {feature.description}
              </p>
            </Slidein>
          ))}
        </div>
      </div>
    </section>
  );
}