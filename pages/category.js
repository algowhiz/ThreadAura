import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ImageCrousel from './components/ImageCrousel';
import SortDropdown from './components/SortDropdown';
import Item from './components/Item';
import Shimmer from './components/Shimmer';

const category = () => {
  const router = useRouter();
  const { slug, category } = router.query; // Get the slug from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (!slug) return; 

    const fetchData = async () => {
      setLoading(true);
      setImages([]);
      setProducts([]);
      try {
        try {
          const response1 = await axios.get(`/api/carousel/category?category=${slug}`);
          setImages(response1.data.images);          
        } catch (error) { }

        try {
          const response2 = await axios.get(`/api/category/${slug}`);
          setProducts(response2.data.products);
          
        } catch (error) { }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };    
    fetchData();
  }, [slug,router.query]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-low-high') {
      return a.price - b.price;
    } else if (sortOption === 'price-high-low') {
      return b.price - a.price;
    } else if (sortOption === 'a-z') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });



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

  if (products.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">This Page is Under Observation</h2>
          <p className="text-gray-500">We are currently working on adding more products. Please visit us again soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='w-full overflow-hidden mx-auto'>
        {images.length > 0 && (
          <div className='w-full overflow-hidden mx-auto'>
            <ImageCrousel images={images} />
          </div>
        )}
      </div>

      <section className="text-gray-600 body-font">
        <div>
          <SortDropdown category={category} slug={slug} sortOption={sortOption} setSortOption={setSortOption} />
        </div>
        <Item sortedProducts={sortedProducts} slug={slug} />
      </section>
    </div>
  );
};

export default category;
