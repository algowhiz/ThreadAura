import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const ImageCrousel = ({images}) => {
  return (
    <div  className="h-[70vh]  cursor-pointer relative">
         {images.length > 0 ? (
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
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={image.imageUrl}
                    alt={`Carousel Image ${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Loading carousel images...</p>
          </div>
        )}
    </div>
  )
}

export default ImageCrousel