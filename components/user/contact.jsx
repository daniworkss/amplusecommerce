import { useState } from "react"
import { ToastContainer, toast ,Bounce,Zoom} from 'react-toastify';
import axios from "axios"
import { BeatLoader } from "react-spinners"
export default function ContactComponent() {
const [firstName,setFirstName] = useState()
const [email,setEmail] = useState()
const [phone,setPhone] = useState()
const [message,setMessage] = useState()
const [loading,setLoading] = useState(false)
const options ={
  firstName,email,phone,message
}
  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    try {
      // const res = await axios.post('https://api2-ufpjcakxcq-uc.a.run.app/sendmail',options)
      // console.log("this is what happend", res.data)
      setFirstName('')
      setEmail('')
      setPhone('')
      setMessage('')
      toast.success('Message sent successfully',{style:{fontSize:14}})
    } catch (error) {
      console.log(error.message)
      toast.error( 'Something went wrong. Please try again.', {
        style: { fontSize: 14 },
      });
    }finally{
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }

  }
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 pt-[5rem] tablet:px-20 lg::px-6">
        <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
       
    />
        <h1 className="text-4xl mb-8 font-optima text-center ">Contact Us</h1>
        
         {/* Form Section */}
         <form onSubmit={handleSubmit} className="mt-4 space-y-6">
         <div className="flex flex-col lg::flex-row gap-6">
                {/* First Name */}
                <div className="relative lg::w-full">
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="peer  w-full rounded-md border  border-gray-300 shadow-sm px-3 h-[60px] text-sm placeholder-transparent focus:border-Pink focus:outline-none focus:ring-1 focus:ring-Pink flex items-center bg-red-white  pt-3"
                    placeholder="First Name"
                    required
                />
                <label
                    htmlFor="firstName"
                    className="absolute left-3 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-Pink"
                >
                    Name
                </label>
                </div>

            {/* email */}
                <div className="relative lg::w-full">
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                   className="peer  w-full rounded-md border  border-gray-300 shadow-sm px-3 h-[60px] text-sm placeholder-transparent focus:border-Pink focus:outline-none focus:ring-1 focus:ring-Pink flex items-center bg-red-white  pt-3"
                    placeholder="Last Name"
                    required
                />
                <label
                    htmlFor="email"
                    className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-Pink"
                >
                    Email
                </label>
                </div>
         </div>

            {/* phone */}
            <div className="relative">
              <input
                type="phone"
                id="phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="peer  w-full rounded-md border  border-gray-300 shadow-sm px-3 h-[60px] text-sm placeholder-transparent focus:border-Pink focus:outline-none focus:ring-1 focus:ring-Pink flex items-center bg-red-white  pt-3"
                placeholder="Email"
                required
              />
              <label
                htmlFor="phone number"
                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-Pink"
              >
                Phone Number 
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="peer  block w-full rounded-md border border-gray-300 bg-white shadow-sm px-3 pt-8 pb-2 text-sm placeholder-transparent focus:border-Pink focus:outline-none focus:ring-1 focus:ring-Pink resize-none"
                placeholder="Message"
                rows="4"
                required
              />
              <label
                htmlFor="message"
                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-Pink"
              >
                Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full lg:w-[20%] flex items-center justify-center text-center lg::py-4 lg::text-[16px] rounded-full font-optima bg-black py-2 text-white font-serif text-sm hover:bg-opacity-90"
            >
              {
                loading === true ? <BeatLoader
                color="#ffffff"
                size={9}
              />: <p className="text-center w-full">Send</p>
              }
            </button>
          </form>
      </div>
    )
  }