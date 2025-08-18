import { Users, Instagram, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Slideup from "../animation/slide-up";
export default function InstagramFeed() {
  const posts = [
    {
      id: 1,
      likes: 324,
      image: "https://res.cloudinary.com/dccph2plo/image/upload/v1755206592/Cream_Signature_Men_s_Set._Drop_-_Wednesday_7-19_via_www.amplusfashion.com_mx93dk.jpg",
      alt: "Fashion outfit post"
    },
    {
      id: 2,
      likes: 567,
      image: "https://res.cloudinary.com/dccph2plo/image/upload/v1755206781/5_%EF%B8%8F_1_ppvn6v.jpg",
      alt: "Style inspiration post"
    },
    {
      id: 3,
      likes: 892,
      image: "https://res.cloudinary.com/dccph2plo/image/upload/v1755206596/Are_you_guys_ready_for_our_new_collectionCheck_out_our_new_Create_the_Future_oversized_tee_clo_wfh5be.jpg",
      alt: "Lifestyle fashion post"
    },
    {
      id: 4,
      likes: 445,
      image: "https://res.cloudinary.com/dccph2plo/image/upload/v1755206596/5_%EF%B8%8F_loddoa.jpg",
      alt: "Accessories showcase"
    },
    {
      id: 5,
      likes: 678,
      image: "https://res.cloudinary.com/dccph2plo/image/upload/v1755206629/Cream_Signature_Men_s_Set._Drop_-_Wednesday_7-19_via_www.amplusfashion.com_1_tb6vei.jpg",
      alt: "Fashion collection post"
    },
    {
      id: 6,
      likes: 234,
      image: "https://res.cloudinary.com/dccph2plo/image/upload/v1755206594/I_block_small_stress_I_go_chop_life_etz9h0.jpg",
      alt: "Style guide post"
    }
  ];


  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Slideup percent={20} delay={0.1} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="mr-3" size={32} />
            <h2 className="text-2xl md:text-4xl font-bold text-black">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-gray-600 text-[14px] md:text-lg max-w-2xl mx-auto">
            Get inspired by our community and see how others style our pieces
          </p>
        </Slideup>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {posts.map((post) => (
            <Slideup percent={20} delay={0.3} key={post.id} className="group cursor-pointer relative">
              <img 
                src={post.image} 
                alt={post.alt}
                className="w-full h-full object-cover object-top rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-lg">
                <div className="opacity-0 group-hover:opacity-100 text-white flex items-center transition-opacity duration-300">
                  <Heart size={20} className="mr-2" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
              </div>
            </Slideup>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="https://www.instagram.com/therealamplus"
            target="_blank"
            className="inline-flex items-center bg-black text-white px-6 py-3  lg:px-12 lg:py-4 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            <Instagram className="mr-2" size={20} />
            Follow @therealamplus
          </Link>
        </div>
      </div>
    </section>
  );
}