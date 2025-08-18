import { ShoppingBag, X, Menu, ShoppingCart, ChevronRight, Search, User, Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
import { useEffect } from "react";
import Image from "next/image"
import { lock,unlock } from "tua-body-scroll-lock";
import { useCartStore } from "@/context/cart";
import ScrollToTopButton from "./scrolltotop";
export default function SecondHeader() {
    const [openMenu, setOpenMenu] = useState(false);
    const [iconSize, setIconSize] = useState(24);
    const {count } = useCartStore()

    useEffect(() => {
        const handleResize = () => {
            setIconSize(window.innerWidth < 768 ? 24 : 32);
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

    return (
        <>
            <div className="w-full h-[60px] md:h-[80px] lg:h-[80px] fixed top-0 flex justify-between items-center px-[16px] lg:px-[40px] z-50 bg-white shadow-sm border-b border-gray-100 ">
            {/* Logo */}
            <Link href={'/'} className="">
                <Image
                    priority
                    width={130}
                    height={130}
                    className="transition-all duration-200 hover:scale-105 z-50 md:w-[180px] md:h-[180px] lg:w-[180px] lg:h-[80px] object-contain"
                    src="https://res.cloudinary.com/dccph2plo/image/upload/v1755460493/amp_logo_1_ak7qrs.png"
                    alt="Logo"
                />
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12 absolute left-1/2 transform -translate-x-1/2">
                <Link 
                    href={'/products'} 
                    className="text-gray-800 hover:text-black text-[14px] font-medium transition-colors duration-200 relative group"
                >
                    Collections
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                    href={'/about-us'} 
                    className="text-gray-800 hover:text-black text-[14px] font-medium transition-colors duration-200 relative group"
                >
                    About Us
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                    href={'/tracking'} 
                    className="text-gray-800 hover:text-black text-[14px] font-medium transition-colors duration-200 relative group"
                >
                    Track Order
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                    href={'/contact'} 
                    className="text-gray-800 hover:text-black text-[14px] font-medium transition-colors duration-200 relative group"
                >
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-[10px] lg:space-x-4">
                {/* Wishlist - Desktop only */}
                <button className="hidden ">
                    <Heart
                        className="text-gray-700 hover:text-black cursor-pointer transition-colors duration-200"
                        size={24}
                    />
                </button>

                {/* Shopping Bag */}
                <div className="flex items-center z-10">
                    <Link
                    onClick={()=> unlock()}
                        href={'/cart'}
                        className="cursor-pointer relative lg:mr-0 text-[30px] md:text-[42px]"
                    >
                       {
                            count > 0 && (
                                <div
                                className={`${ 'bg-black'
                                } w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full absolute -right-1 z-10 -top-1 flex justify-center items-center`}
                                >
                                        <p
                                        className={`${ 'text-white'
                                            } text-[6px] md:text-[10px]  font-bold`}
                                        >
                                        {count }
                                        </p>
                                </div>
                            )
                        }


                        <ShoppingBag
                            className="lg:hidden text-gray-700 hover:text-black cursor-pointer transition-colors duration-200"
                            size={iconSize}
                        />
                         <ShoppingBag
                            className=" hidden lg:block text-gray-700 hover:text-black cursor-pointer transition-colors duration-200"
                            size={26}
                        />
                    </Link>
                </div>

                {/* Mobile/Tablet Menu Button */}
                <div className="flex justify-center transition-colors ease-in duration-150 rounded-md h-[30px] w-[30px] z-10 lg:hidden">
                    <button
                        onClick={handleMenu}
                        className="text-gray-700 hover:text-black cursor-pointer"
                    >
                        {openMenu ? <X size={iconSize} /> : <Menu size={iconSize} />}
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Menu Overlay */}
            <div className={`w-full top-[3.5rem] absolute overflow-hidden lg:hidden ${openMenu ? 'h-[400px] pt-[1rem]' : 'h-0 pt-0'} transition-all ease duration-150 left-0 bg-white border-b border-gray-100 shadow-lg`}>
                <nav className={`${openMenu ? 'py-[20px] px-[16px] pb-4' : 'hidden'}`}>
                    <ul className="flex flex-col space-y-5 divide-y-[0.1px] divide-gray-200">

                        <Link  onClick={()=> unlock()} href={'/products'} className="text-[16px] md:text-[20px] text-gray-800 hover:text-black flex justify-between items-center pt-4 transition-colors duration-200 first:pt-0">
                            Collections
                            <ChevronRight className="inline-block ml-1 text-gray-700" size={16} />
                        </Link>

                        <Link  onClick={()=> unlock()} href={'/about-us'} className="text-[16px] md:text-[20px] text-gray-800 hover:text-black flex justify-between items-center pt-4 transition-colors duration-200">
                            About Us
                            <ChevronRight className="inline-block ml-1 text-gray-700" size={16} />
                        </Link>

                        <Link  onClick={()=> unlock()} href={'/tracking'} className="text-[16px] md:text-[20px] text-gray-800 hover:text-black flex justify-between items-center pt-4 transition-colors duration-200">
                            Track Order
                            <ChevronRight className="inline-block ml-1 text-gray-700" size={16} />
                        </Link>

                        <Link  onClick={()=> unlock()} href={'/contact'} className="text-[16px] md:text-[20px] text-gray-800 hover:text-black flex justify-between items-center pt-4 transition-colors duration-200">
                            Contact Us
                            <ChevronRight className="inline-block ml-1 text-gray-700" size={16} />
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>

        <ScrollToTopButton />
        </>
    )
}