import Header from "@/components/user/header"
import Herosection from "@/components/user/hero-section"
import ProductsSection from "@/components/user/products-section"
import Footer from "@/components/user/footer"
import  WhyChooseUs  from "@/components/user/whyus"
import CustomerReviews from "@/components/user/reviews"
import NewsletterSignup from "@/components/user/newslettersignup"
import ScrollToTopButton from "@/components/user/scrolltotop"
import InstagramFeed from "@/components/user/instagram-feed"
export default function Index(){
  return (
    <div>
      <Header/>
      <Herosection/>
      <ProductsSection/>
      <WhyChooseUs/>
      <CustomerReviews/>
      <NewsletterSignup/>
      <InstagramFeed/>
      <ScrollToTopButton/>
     <Footer/>
      
    </div>
  )
};
