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
  const { slug , category } = router.query; // Get the slug from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    const fetchData = async () => {
      try {
        const response1 = await axios.get(`/api/carousel/category?category=${slug}`);
        console.log(response1);
        setImages(response1.data.images);

        const response2 = await axios.get(`/api/category/${slug}`); // Call your API endpoint
        setProducts(response2.data.products);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

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

  return (
    <div>
      <div className='w-full overflow-hidden mx-auto'>
        <ImageCrousel images={images} />
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
