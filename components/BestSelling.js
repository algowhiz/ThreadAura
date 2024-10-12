import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BestSelling = ({ category ,gender}) => {
  const categories = [
    {
      title: 'T-SHIRTS',
      image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/BEST_OF_TSHIRTS_2.jpg?format=webp&w=480&dpr=1.0',
      link: 't-shirts',
    },
    {
      title: 'SHIRTS',
      image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/BEST_OF_SHIRTS_4.jpg?format=webp&w=480&dpr=1.0',
      link: 'shirts',
    },
    {
      title: 'POLOS',
      image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/BEST_OF_POLOS_5.jpg?format=webp&w=480&dpr=1.0',
      link: 'polos',
    },
    {
      title: 'BOTTOM-WEAR',
      image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/BEST_OF_BOTTOMS_4.jpg?format=webp&w=480&dpr=1.0',
      link: 'bottom-wear',
    },
    {
      title: 'SNEAKERS',
      image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/BEST_OF_SNEAKERS_4.jpg?format=webp&w=480&dpr=1.0',
      link: 'sneakers',
    },
  ];

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
