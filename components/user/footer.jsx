import { 
    Mail, 
    Phone, 
    MapPin,
    ChevronRight,
    Shield,
    Truck
  } from "lucide-react";
  import Link from "next/link";
  import Image from "next/image";
  import { useEffect,useState } from "react";

import axios from "axios";
  
  export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [iconSize, setIconSize] = useState(20); // default size for SSR

    useEffect(() => {
      const handleResize = () => {
        setIconSize(window.innerWidth < 768 ? 130 : 180);
      };
  
      handleResize();
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const quickLinks = [
      {
        name: "New Arrivals",
        link: '/'
      },
      {
        name: "About Us",
        link: '/about-us'
      },
      {
        name: "Outfits",
        link: '/products'
      }
    ]

    const customerServiceLinks = [
      {
        name: "Contact Us",
        link:'/contact'
      },
      {
        name: "Track Order",
        link:'/track-order'
      },
      {
        name: "FAQ",
        link:'/'
      }
    ]

    const [email,setEmail] = useState('')
  const [buttonText,setButtonText] = useState('Subscribe')

  async function HandleSubscrioption(){
    setButtonText("Subscribing..")
    try {
      const sendrequest = await axios.post('/api/newsletter',{email})
      console.log(sendrequest.data)
      setTimeout(() => {
        setButtonText('Subscribed!!')
      }, 2000);
      setEmail('')

    } catch (error) {
      console.log(error.message, 'something went wrong')
      setButtonText('Failed')
    }
  }
    
    return (
      <footer className="bg-black text-white">
        {/* Main Footer Content */}
        <div className="max-w-[1800px] mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-3 ">
                <Image
                  width={iconSize}
                  height={iconSize}
                  quality={100}
                  className="transition-all duration-200 hover:scale-105"
                  src="https://res.cloudinary.com/dccph2plo/image/upload/v1755040238/amp_logo_2_2_x3n7g3.png"
                  alt="Logo"
                />
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Discover premium fashion and lifestyle products curated for the modern individual. Quality, style, and exceptional service.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <Link 
                  href="http://instagram.com/therealamplus" 
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="text-[18px] text-white mt-1">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </div>
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="text-[18px] text-white mt-1">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </div>
                </Link>
                <Link 
                  href="https://tiktok.com/@therealamplus" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="text-white text-[18px] mt-1">
                    <ion-icon name="logo-tiktok"></ion-icon>
                  </div>
                </Link>
                {/* <Link 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <Youtube size={18} />
                </Link> */}
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item}>
                    <Link 
                      href={item.link} 
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      {item.name}
                      <ChevronRight 
                        size={14} 
                        className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Customer Service */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Customer Service
              </h3>
              <ul className="space-y-3">
                {customerServiceLinks.map((item) => (
                  <li key={item}>
                    <Link 
                      href={item.link} 
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center group"
                    >
                      {item.name}
                      <ChevronRight 
                        size={14} 
                        className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">amplus@amplusfashion.com</p>
                    <p className="text-gray-400 text-xs">24/7 Support</p>
                  </div>
                </div>
                
                {/* <div className="flex items-start space-x-3">
                  <Phone size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <a className="text-gray-300 text-sm" href="tel:+15551234567">+1 (555) 123-4567</a>
                    <p className="text-gray-400 text-xs">Mon-Fri 9AM-6PM</p>
                  </div>
                </div> */}
{/*                 
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">12809 Whiteholm Drive,  </p>
                    <p className="text-gray-400 text-xs">Upper Marlboro, MD, 20774, US</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
  
          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-gray-800 ">
            <div className="max-w-md">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to get exclusive offers and latest updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-600 transition-colors duration-200"
                />
                <button onClick={HandleSubscrioption} className=" cursor-pointer px-6 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Trust Badges */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield size={16} />
                <span className="text-xs">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Truck size={16} />
                <span className="text-xs">Free Shipping</span>
              </div>
              
              
              {/* Payment Methods */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-400 mr-2">We Accept:</span>
                <div className="flex space-x-2">
                  {["Visa", "MC", "PayPal", "Apple Pay"].map((method) => (
                    <div 
                      key={method}
                      className="w-8 h-5 bg-gray-700 rounded text-[8px] flex items-center justify-center text-gray-300"
                    >
                      {method === "MC" ? "MC" : method.slice(0, 2)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
              <p>© {currentYear} Amplus. All rights reserved.</p>
              <div className="flex space-x-6 mt-2 md:mt-0">
                <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
                {/* <Link href="#" className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }