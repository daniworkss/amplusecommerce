import { CheckCircle } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import Slideup from "../animation/slide-up";
import Slidein from "../animation/slide-in";
export default function NewsletterSignup() {
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
      <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-black text-white lg:py-[80px] lg:h-[450px] ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Slideup percent={20} delay={0.1} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 lg:text-5xl">
              Stay in Style
            </h2>
            <p className=" md:text-lg text-sm lg:text-sm text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, style tips, and first access to new arrivals
            </p>
          </Slideup>
  
          <div className="max-w-md mx-auto mb-8">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 lg:w-[280px] lg:py-3 bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-400 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <button onClick={HandleSubscrioption} className="cursor-pointer bg-white text-black px-6 py-3 rounded-r-md font-medium hover:bg-gray-100 transition-colors duration-200">
                {buttonText}
              </button>
            </div>
          </div>
  
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <Slidein delay={0.2} direction={'-20%'} className="flex items-center">
              <CheckCircle size={16} className="mr-2" />
              <span>Exclusive Offers</span>
            </Slidein>
            <Slidein delay={0.4} direction={'-20%'} className="flex items-center">
              <CheckCircle size={16} className="mr-2" />
              <span className="text-[14px]">New Outfits</span>
            </Slidein>
            <Slidein delay={0.6} direction={'-20%'} className="flex items-center">
              <CheckCircle size={16} className="mr-2" />
              <span>No Spam</span>
            </Slidein>
          </div>
        </div>
      </section>
    );
  }