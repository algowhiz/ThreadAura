import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const category = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/category/${slug}`); // Call your API endpoint
        setProducts(response.data.products);
        console.log(response);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <div>
      <h1>Products in {slug} Category</h1>
      <div>
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default category;
