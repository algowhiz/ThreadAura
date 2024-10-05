import React, { useEffect, useState } from 'react'
import ImageCrousel from './components/ImageCrousel';

const womens = () => {

  const [images, setImages] = useState([]); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/carousel/category?category=women"); 
        console.log(response);
        setImages(response.data.images); 
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className='min-h-screen w-full bg-gray-100'>
       <ImageCrousel images={images} />
    </div>
  )
}

export default womens