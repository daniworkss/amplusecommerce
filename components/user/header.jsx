import { ShoppingBag, X, Menu, ShoppingCart, ChevronRight, Search, User, Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import { lock,unlock } from "tua-body-scroll-lock";
import { useEffect } from "react";
import Image from "next/image"
import { useCartStore } from "@/context/cart";
import ScrollToTopButton from "./scrolltotop";
export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [iconSize, setIconSize] = useState(24);
    const {count} = useCartStore()

    useEffect(() => {
        const handleResize = () => {
            setIconSize(window.innerWidth < 768 ? 24 : window.innerWidth < 1024 ? 26 : 32);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMenu = () => {
        setOpenMenu(!openMenu);
        if (!openMenu) {
            lock();
        } else {
           unlock();
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <>
              <div
            className={`${openMenu || scrollY > 300
                ? "bg-gray-50 shadow-sm"
                : "bg-transparent"
                } w-full h-[60px] md:h-[80px] lg:h-[80px]  top-0 flex justify-between items-center px-[16px] lg:px-[40px] z-50 transition duration-200 fixed`}
        >
            {/* Logo */}
            <Link href={'/'}>
                <Image
                    priority
                    width={130}
                    height={130}
                    className="transition-all duration-200 hover:scale-105 z-50 md:w-[180px] md:h-[180px]  object-contain"
                    src={`${openMenu || scrollY > 300
                        ? 'https://res.cloudinary.com/dccph2plo/image/upload/v1755460493/amp_logo_1_ak7qrs.png'
                        : 'https://res.cloudinary.com/dccph2plo/image/upload/v1755040238/amp_logo_2_2_x3n7g3.png'
                        }`}
                    alt="Logo"
                />
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12 absolute left-1/2 transform -translate-x-1/2">
                <Link 
                    href={'/products'} 
                    className={`${openMenu || scrollY > 300 ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'} 
                    text-[14px]  font-medium transition-colors duration-200 relative group`}
                >
                    Collections
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                    href={'/about-us'} 
                    className={`${openMenu || scrollY > 300 ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'} 
                    text-[14px]  font-medium transition-colors duration-200 relative group`}
                >
                    About Us
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                    href={'/tracking'} 
                    className={`${openMenu || scrollY > 300 ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'} 
                    text-[14px]  font-medium transition-colors duration-200 relative group`}
                >
                    Track Order
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                    href={'/contact'} 
                    className={`${openMenu || scrollY > 300 ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'} 
                    text-[14px]  font-medium transition-colors duration-200 relative group`}
                >
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-[10px] lg:space-x-4">
                {/* Wishlist - Desktop only */}
                <button className="hidden">
                    <Heart
                        className={`${openMenu || scrollY > 300 ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'} 
                        cursor-pointer transition-colors duration-200`}
                        size={24}
                    />
                </button>

                {/* Shopping Bag */}
                <div className="flex items-center z-10">
                    <Link
                        href={'/cart'}
                        onClick={()=> unlock()}
                        className="cursor-pointer relative lg:mr-0 text-[30px] md:text-[42px]"
                    >
                        {
                            count > 0 && (
                                <div
                                className={`${openMenu || scrollY > 300 ? 'bg-black' : 'bg-white'
                                } w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full absolute -right-1 z-10 -top-1 flex justify-center items-center`}
                                >
                                        <p
                                        className={`${openMenu || scrollY > 300 ? 'text-white' : 'text-black'
                                            } text-[6px] md:text-[10px]  font-bold`}
                                        >
                                        {count }
                                        </p>
                                </div>
                            )
                        }

                        <ShoppingBag
                            className={`${openMenu || scrollY > 300 ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'
                                } lg:hidden cursor-pointer transition-colors duration-200`}
                            size={iconSize}
                        />

                            <ShoppingBag
                            className={`${openMenu || scrollY > 300 ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'
                                } hidden lg:block cursor-pointer transition-colors duration-200`}
                            size={26}
                        />  
                    </Link>
                </div>

                {/* Mobile/Tablet Menu Button */}
                <div className="flex justify-center transition-colors ease-in duration-150 rounded-md h-[30px] w-[30px] z-10 lg:hidden">
                    <button
                        onClick={handleMenu}
                        className={`${openMenu || scrollY > 300 ? 'text-black' : 'text-white'
                            } cursor-pointer`}
                    >
                        {openMenu ? <X size={iconSize} /> : <Menu size={iconSize} />}
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Menu Overlay */}
            <div className={`w-full top-[3.5rem] absolute overflow-hidden  lg:hidden ${openMenu ? 'h-[400px]  pt-[1rem]' : 'h-0 pt-0'} transition-all ease duration-150 left-0 bg-gray-100`}>
                <nav className={`${openMenu ? 'py-[20px] px-[16px] pb-4' : 'hidden'}`}>
                    <ul className="flex flex-col space-y-5 divide-y-[0.1px] divide-gray-200"> 
                      
                       <Link onClick={()=> unlock()} href={'/products'} className="text-[16px] md:text-[20px] hover:text-black flex justify-between items-center pt-4 first:pt-0">
                            Collections
                            <ChevronRight className="inline-block ml-1 text-black" size={16} />
                        </Link>

                        <Link  onClick={()=> unlock()}  href={'/about-us'} className="text-[16px] md:text-[20px] hover:text-black flex justify-between items-center pt-4">
                            About Us
                            <ChevronRight className="inline-block ml-1 text-black" size={16} />
                        </Link>

                        <Link  onClick={()=> unlock()}  href={'/tracking'} className="text-[16px] md:text-[20px] hover:text-black flex justify-between items-center pt-4">
                            Track Order
                            <ChevronRight className="inline-block ml-1 text-black" size={16} />
                        </Link>

                        <Link  onClick={()=> unlock()} href={'/contact'} className="text-[16px] md:text-[20px] hover:text-black flex justify-between items-center pt-4">
                            Contact Us
                            <ChevronRight className="inline-block ml-1 text-black" size={16} />
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>

        <ScrollToTopButton />
      </>
    )
}