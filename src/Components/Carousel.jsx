import React, { useEffect } from "react";
import { getData } from "../context/DataContext";
import { Navigation, Pagination, Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Catagory from "./Catagory";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <div className="relative">
        <div className="custom-prev absolute left-5 top-[35vh]  z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer">
          <FaArrowLeft />
        </div>

        <div className="custom-next absolute right-5 top-[35vh]  z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer">
          <FaArrowRight />
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Mousewheel]}
        loop={true}
        loopAddBlankSlides={false}
        loopPreventsSliding={false}
        cssMode={false}
        nested={true}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        mousewheel={false}
        slidesPerView={1}
      >
        {data?.slice(99, 107)?.map((item, indx) => {
          return (
            <SwiperSlide
              key={indx}
              className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
            >
              <div className="flex flex-col md:flex-row gap-10 justify-center md:h-135 items-center px-4 my-20 md:my-0 h-145">
                <div className="md:space-y-6 space-y-3">
                  <h3 className="text-red-500 font-semibold font-sans text-sm">
                    Powering Your World With the Best in Electronics
                  </h3>
                  <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-125 text-white">
                    {item.title}
                  </h1>
                  <p className="md:w-125 line-clamp-3 text-gray-400 pr-7">
                    {item.description}
                  </p>
                  <button
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="bg-linear-to-r from-red-500 via-pink-500 to-purple-500 text-white px-5 py-3 rounded-md font-semibold transition-all duration-300 cursor-pointer hover:from-red-600 hover:via-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-2xl shadow-purple-950 flex items-center gap-2 mx-auto md:mx-0"
                  >
                    Shop Now
                    <FaArrowRight />
                  </button>
                </div>
                <div>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="rounded-full w-125 hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-400 bg-cyan-50"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Catagory />
    </>
  );
};

export default Carousel;
