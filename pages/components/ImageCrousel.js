import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Shimmer from './Shimmer';

const ImageCrousel = ({ images }) => {
  const enableLoop = images?.length > 1; 

  return (
    <div className="h-[50vh] md:h-[30vh] lg:h-[70vh] cursor-pointer relative">
      {images?.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          loop={enableLoop}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full hidden md:flex h-full items-center justify-center relative">
                <Image
                  src={image?.imageUrl}
                  alt={`Carousel Image ${index}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                  priority={index === 0}
                />
              </div>
              <div className="md:hidden relative h-full w-full">
                <Image
                  src={image?.mobileImageUrl}
                  alt={`Carousel Image ${index}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                  priority={index === 0} 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Shimmer type="carousel" />
        </div>
      )}
    </div>
  );
};

export default ImageCrousel;
