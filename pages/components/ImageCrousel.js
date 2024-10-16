import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Shimmer from './Shimmer';

const ImageCrousel = ({ images }) => {
  return (
    <div className="h-[50vh] md:h-[30vh] lg:h-[70vh] cursor-pointer relative">
      {images?.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              {/* Desktop View */}
              <div className="w-full hidden md:flex h-full items-center justify-center">
                <Image
                  src={image?.imageUrl}
                  alt={`Carousel Image ${index}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
              </div>
              {/* Mobile View */}
              <div className="md:hidden object-cover h-fit w-fit">
                <Image
                  src={image?.mobileImageUrl}
                  alt={`Carousel Image ${index}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Shimmer type="carousel" /> {/* Fallback loading shimmer */}
        </div>
      )}
    </div>
  );
};

export default ImageCrousel;
