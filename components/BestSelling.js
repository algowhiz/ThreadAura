import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BestSelling = ({ category ,gender}) => {
  return (
    <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{ delay: 3000 }}
    pagination={{ clickable: true }}
    spaceBetween={30}
    slidesPerView={1}
    loop={true}
    breakpoints={{
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }}
    className="h-full"
  >
    {category.items.map((item, itemIdx) => (
      <SwiperSlide key={itemIdx}>
        <div className="w-full h-full flex items-center justify-center">
          <Link href={`/category?slug=${item.link}&category=${gender}`}>
            <div className="group transition-transform transform hover:scale-105 cursor-pointer">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </Link>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  );
};

export default BestSelling;
