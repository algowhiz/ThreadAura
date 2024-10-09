import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCrousel from './components/ImageCrousel';
import Link from 'next/link';
import BestSelling from '@/components/BestSelling';
import Category from './components/Category'
import Shimmer from './components/Shimmer';

const Mens = () => {
  const [images, setImages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const carouselResponse = await axios.get("/api/carousel/category?category=men");
        setImages(carouselResponse.data.images);

        const categoriesResponse = await axios.get("/api/getCategories?gender=Men");
        setSubCategories(categoriesResponse.data[0].subcategories); 

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-100">
        <Shimmer type="carousel" />
        <div className="p-3">
          <Shimmer type="category" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div>
        <ImageCrousel images={images} />
      </div>
      <div className='p-3'>
        {subCategories.map((category, idx) => (
          <div key={idx} className="mb-10">
            <h1 className='text-3xl font-bold flex justify-center mb-6'>{category.name.toUpperCase()}</h1>

            {(category.name === "Best-Sellers" || category.name === "shop-by-fandom" ) ? (
              <BestSelling category={category} />
            ) : (
              <Category category={category} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mens;
