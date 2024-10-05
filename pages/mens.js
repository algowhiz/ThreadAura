
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCrousel from './components/ImageCrousel';

const Mens = () => {
  const [images, setImages] = useState([]); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/carousel/category?category=men"); 
        console.log(response);
        setImages(response.data.images); 
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleDropdownToggle = (index) => {
    if (dropdownVisible === index) {
      setDropdownVisible(null);
    } else {
      setDropdownVisible(index);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* <div className='absolute z-50 top-0 ml-5'>
        <div className="mb-4">
          <img src="/threadLogo.png" className="w-28 h-28 rounded-full" alt="Logo" />
        </div>
      </div> */}

      {/* Navbar */}
      

      <div>
       {/* <ImageCrousel images={images} /> */}
      </div>
    </div>
  );
};

export default Mens;
