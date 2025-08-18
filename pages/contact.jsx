import ContactComponent from "@/components/user/contact"
import SecondHeader from "@/components/user/second-header"
import Footer from "@/components/user/footer"
export default function Contact(){
  return (
   <>
   <SecondHeader/>
         <div className="w-full min-h-screen flex justify-center">
    <div className=" w-full tablet:w-[80%] max-w-[800px] min-h-screen  px-4  lg:pt-[3rem]">
    

      {/* Form Section */}
     <ContactComponent/>
    </div>

  </div>

    <Footer/>
   </>
  )
};
