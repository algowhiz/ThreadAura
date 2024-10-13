import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCrousel from './components/ImageCrousel';
import { useRouter } from 'next/router';
import BestSelling from '@/components/BestSelling';
import Category from './components/Category';
import Shimmer from './components/Shimmer';

const categories = () => {
  const [images, setImages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { category } = router.query; 

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;       
      
      try {
        setLoading(true);

        const carouselResponse = await axios.get(`/api/carousel/category?category=${category}`);
        setImages(carouselResponse.data.images);

        
        const categoriesResponse = await axios.get(`/api/getCategories?gender=${category}`);
        setSubCategories(categoriesResponse.data[0]?.subcategories || []); 

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    if (loading) {
      setImages([]); 
      setSubCategories([]); 
    }
  }, [loading]);

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
        {subCategories.map((subCategory, idx) => (
          <div key={idx} className="mb-10">
            <h1 className='text-3xl font-bold flex justify-center mb-6'>{subCategory.name.toUpperCase()}</h1>

            {(subCategory.name === "Best-Sellers" || subCategory.name === "shop-by-fandom" || subCategory.name === "SHOP BY COLOUR" || subCategory.name === "SHOP BY THEMES" || subCategory.name === "LATEST COLLECTIONS" || subCategory.name === "SHOP BY AGE" || subCategory.name === "OFFICIAL MERCHANDISE") ? (
              <BestSelling gender={category} category={subCategory} />
            ) : (
              <Category gender={category} category={subCategory} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default categories;
