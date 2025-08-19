import SecondHeader from "@/components/user/second-header";
import Footer from "@/components/user/footer";
import { 
  Star, 
  Shield, 
  Truck, 
  Heart, 
  Users, 
  Award,
  Mail,
  Phone,
  MapPin 
} from "lucide-react";
import CountUp from 'react-countup'
import Slideup from "@/components/animation/slide-up";
import Slidein from "@/components/animation/slide-in";
import Link from "next/link";
export default function AboutUs() {
  return (
  <>
    <SecondHeader/>

    <div className="min-h-screen ">
            
            {/* Hero Section */}
            <section className=" pt-[6rem] lg:pt-[8rem] pb-16 bg-gradient-to-br from-gray-50 to-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                    About AmPlus
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Curating premium fashion and lifestyle experiences for the modern individual who values quality, style, and exceptional service.
                  </p>
                </div>
              </div>
            </section>
      
            {/* Our Story Section */}
            <section className="py-14">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <Slideup delay={0.2} percent={20}>
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                      Our Story
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        AmPlus was born from a simple yet powerful vision: to create a curated shopping experience that goes beyond ordinary retail. We believe that fashion and lifestyle products should not only look exceptional but also reflect the values and aspirations of those who choose them.
                      </p>
                      <p>
                        Founded on the principles of quality, authenticity, and customer-centricity, we've built our brand around the idea that every purchase should be an investment in your personal style and lifestyle. From our carefully selected product range to our personalized customer service, everything we do is designed to exceed expectations.
                      </p>
                      <p>
                        Today, AmPlus stands as a testament to what happens when passion meets purpose. We're not just a store; we're your partner in discovering and expressing your unique style.
                      </p>
                    </div>
                  </Slideup>
                  {/* slide up for mobile */}
                  <Slideup delay={0.2} percent={10} className=" lg:hidden bg-black rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black text-2xl font-bold">A+</span>
                      </div>
                      <p className="text-lg">Premium Quality</p>
                      <p className="text-sm text-gray-300">Since Day One</p>
                    </div>
                  </Slideup>

                {/* slidein for desktop */}
                  <Slidein delay={0.2} direction={'10%'} className=" hidden lg:flex bg-black rounded-lg h-96 items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black text-2xl font-bold">A+</span>
                      </div>
                      <p className="text-lg">Premium Quality</p>
                      <p className="text-sm text-gray-300">Since Day One</p>
                    </div>
                  </Slidein>



                </div>
              </div>
            </section>
      
            {/* Our Mission Section */}
            <section className="py-14 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Slideup percent={10} delay={0.1} className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    Our Mission
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    To empower individuals to express their unique style through carefully curated, premium fashion and lifestyle products, while delivering an unparalleled shopping experience.
                  </p>
                </Slideup>
      
                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Slidein direction={'-10%'} delay={0.1} className="text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-3">Quality First</h3>
                    <p className="text-gray-600">
                      Every product in our collection is carefully selected and vetted to meet our high standards of quality and craftsmanship.
                    </p>
                  </Slidein>
                  <Slidein direction={'-10%'} delay={0.3} className="text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-3">Customer Obsessed</h3>
                    <p className="text-gray-600">
                      Your satisfaction is our priority. We go above and beyond to ensure every interaction with AmPlus exceeds your expectations.
                    </p>
                  </Slidein>
                  <Slidein direction={'-10%'} delay={0.4} className="text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-3">Style Innovation</h3>
                    <p className="text-gray-600">
                      We stay ahead of trends while honoring timeless style, bringing you the perfect blend of contemporary and classic.
                    </p>
                  </Slidein>

                </div>
              </div>
            </section>
      
            {/* Why Choose AmPlus */}
            <section className="py-14 lg:py-16">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Slideup percent={10} delay={0.1} className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    Why Choose AmPlus?
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We're committed to providing you with more than just products – we deliver experiences, build relationships, and create lasting value.
                  </p>
                </Slideup>
      
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Slidein direction={'-20%'} delay={0.3} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <Shield className="text-black mb-4" size={32} />
                    <h3 className="text-xl font-semibold text-black mb-3">Secure & Trusted</h3>
                    <p className="text-gray-600">
                      Your privacy and security are paramount. We use industry-leading encryption and security measures to protect your information.
                    </p>
                  </Slidein>
                  
                  <Slidein direction={'-20%'} delay={0.6} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <Truck className="text-black mb-4" size={32} />
                    <h3 className="text-xl font-semibold text-black mb-3">Fast & Reliable</h3>
                    <p className="text-gray-600">
                      Enjoy fast, reliable shipping with real-time tracking. We ensure your orders reach you safely and on time.
                    </p>
                  </Slidein>
                  
                  <Slidein direction={'-20%'} delay={0.9} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <Users className="text-black mb-4" size={32} />
                    <h3 className="text-xl font-semibold text-black mb-3">24/7 Support</h3>
                    <p className="text-gray-600">
                      Our dedicated customer support team is always ready to assist you with any questions or concerns you may have.
                    </p>
                  </Slidein>
                </div>
              </div>
            </section>
      
            {/* Stats Section */}
            <section className="py-14 lg:py-16 bg-black text-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* for mobile */}
                <div className="grid lg:hidden grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <Slideup percent={'10%'} delay={0.2}>
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp start={0} end={100} duration={3} enableScrollSpy={true}   // only start when in view
scrollSpyDelay={100}  />
                      +
                    </div>
                    <div className="text-gray-300">Happy Customers</div>
                  </Slideup>
                
                  <Slideup percent={'10%'} delay={0.4}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp start={0} end={98} duration={5} delay={0.5} enableScrollSpy={true} scrollSpyDelay={100} />%
                    </div>
                    <div className="text-gray-300">Satisfaction Rate</div>
                  </Slideup>
                  <Slideup percent={'10%'} delay={0.6}>
                    <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                    <div className="text-gray-300">Customer Support</div>
                  </Slideup>
                </div>


                {/* for laptop */}
                <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <Slidein direction={'10%'} delay={0.2}>
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp start={0} end={100} duration={5} delay={0.5} enableScrollSpy={true} scrollSpyDelay={100}   />
                      +
                    </div>
                    <div className="text-gray-300">Happy Customers</div>
                  </Slidein>
                  
                  <Slidein direction={'10%'} delay={0.4}>
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp start={0} end={98} duration={5} delay={0.5} enableScrollSpy={true} scrollSpyDelay={100} />%
                    </div>

                    <div className="text-gray-300">Satisfaction Rate</div>
                  </Slidein>
                  
                  <Slidein direction={'10%'} delay={0.4}>
                    <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                    <div className="text-gray-300">Customer Support</div>
                  </Slidein>
                </div>
              </div>
            </section>
      
            {/* Our Promise */}
            <section className="py-14 lg:py-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Slideup percent={10} delay={0.2}>
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                      Our Promise to You
                    </h2>
                  </Slideup>
                <Slideup percent={10} delay={0.4} className="bg-gray-50 p-8 rounded-lg">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    "We promise to continue pushing the boundaries of what exceptional retail means. From our carefully curated collections to our personalized service, we're committed to being your trusted partner in style and lifestyle."
                  </p>
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-black font-semibold">
                      <span>— The AmPlus Team</span>
                    </div>
                  </div>
                </Slideup>
              </div>
            </section>
      
            {/* Contact CTA */}
            <section className="py-14 lg:py-16 bg-gradient-to-r from-gray-900 to-black text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Slideup percent={10} delay={0.2}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Let's Connect
                    </h2>
                </Slideup>
                  <Slideup percent={10} delay={0.2}>
                      <p className="text-xl mb-8 text-gray-300">
                        Have questions about our products or services? We'd love to hear from you.
                      </p>
                  </Slideup>
                <div className="grid grid-cols-1  mb-8">
                  <Slideup percent={10} delay={0.4} className="flex items-center justify-center space-x-3">
                    <Mail className="text-gray-300" size={20} />
                    <span>amplus@amplusfashion.com</span>
                  </Slideup>
                  {/* <Slideup percent={10} delay={0.6} className="flex items-center justify-center space-x-3">
                    <Phone className="text-gray-300" size={20} />
                    <span>+1 (555) 123-4567</span>
                  </Slideup> */}
                  {/* <Slideup percent={10} delay={0.8} className="flex items-center justify-center space-x-3">
                    <MapPin className="text-gray-300" size={20} />
                    <span>Upper Marlboro, MD</span>
                  </Slideup> */}
                </div>
                <Slideup percent={10} delay={1}>
                    <Link href={'/contact'} className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200">
                      Contact Us Today
                    </Link>
                </Slideup>
                
              </div>
            </section>
      
          </div>
          
    <Footer/>
  </>
  );
}