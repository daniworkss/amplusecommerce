import { Users,Award,Star,TrendingUp } from "lucide-react";

export default function BrandStats() {
    const stats = [
      { number: "500+", label: "Happy Customers", icon: <Users size={24} /> },
      { number: "98%", label: "Satisfaction Rate", icon: <Star size={24} /> },
    ];
  
    return (
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white text-black bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-200">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }