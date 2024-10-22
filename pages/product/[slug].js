import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const namer = require('color-namer');

const Slug = ({ addToCart, clearCart, user }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [service, setService] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false); // State for "Read More" toggle

  useEffect(() => {
    if (slug) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`/api/products/${slug}`);
          setProduct(response.data.product);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchProductDetails();
    }
  }, [slug]);

  const handleColorClick = (idx) => {
    setSelectedColor(idx);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleCheckPinCodeAvailability = async (enteredPinCode) => {
    setIsChecked(true);
    try {
      const response = await fetch('/api/pincode');
      const pinJson = await response.json();
      setService(pinJson.includes(parseInt(enteredPinCode)));
    } catch (error) {
      console.error('Error fetching pin codes:', error);
      setService(false);
    }
  };

  const handlePinCodeChange = (e) => {
    setPinCode(e.target.value);
    if (e.target.value === '') {
      setIsChecked(false);
    }
  };

  const showToast = (mess) => {
    toast.error(mess);
  };

  const buyNow = () => {
    if (selectedSize && product) {
      const orderDetails = {
        slug: product?.slug,
        quantity: 1,
        price: Math.floor(product?.price),
        title: product?.title,
        size: selectedSize,
        color: namer(product?.color[selectedColor].color).pantone[0].name,
        img: product?.img,
        desc: product?.desc,
        productId: product?._id,
      };

      localStorage.setItem('buyNowOrder', JSON.stringify(orderDetails));

      router.push("/checkouts?buyNow=true");
    } else {
      showToast('Please select a size');
    }
  };


  const addToCartHandler = () => {
    if (user?.value === null)
      showToast("Please log in first, then we can continue the adventure!");
    if (selectedSize && product) {
      addToCart(
        product?.slug,
        1,
        Math.floor(product?.price),
        product?.title,
        selectedSize,
        namer(product?.color[selectedColor].color).pantone[0].name,
        product?.img,
        product?.desc,
        product?._id,
      );
    } else {
      showToast('Please select a size');
    }
  };

  if (!product) {
    return <div className="flex items-center justify-center h-screen">
      <div className=" w-10 h-10 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          draggable
          newestOnTop={false}
        />
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className='lg:w-1/2 flex justify-center items-center w-full px-16 md:px-24 lg:h-auto object-cover object-center'>
            <div className=' rounded shadow-lg shadow-slate-600 h-[400px] flex justify-center items-center'>
              <img
                alt={product?.title}
                src={product?.img}
              />
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">ThreadAura</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className={`w-4 h-4 ${i < product?.rating ? 'text-indigo-500' : 'text-gray-300'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">{product?.reviews} Reviews</span>
              </span>
            </div>
            {/* Description section */}
            <div className={`relative ${product?.desc.length > 150 ? 'overflow-hidden transition-all duration-500 ease-linear' : ''} ${showFullDescription ? 'max-h-full' : 'max-h-40'}`}>
              <div dangerouslySetInnerHTML={{ __html: product.desc }} />

              {product?.desc.length > 150 && !showFullDescription && (
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white"></div>
              )}
            </div>
            {product?.desc.length > 150 && (
              <button
                className="text-indigo-500 font-semibold mt-3 hover:underline"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            )}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {product?.color
                  .filter(color => color?.color !== '#FFFFFF')
                  .map((color, index) => (
                    <button
                      key={index}
                      className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${selectedColor === index ? 'border-blue-500' : 'border-gray-300'}`}
                      style={{ backgroundColor: color?.color }}
                      aria-label={`Color ${color?.color}`}
                      onClick={() => handleColorClick(index)}
                    ></button>
                  ))}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    value={selectedSize}
                    onChange={handleSizeChange}
                  >
                    <option value="" disabled>Select Size</option>
                    {product?.size.map((size, index) => (
                      <option key={index} value={size}>{size}</option>
                    ))}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹ {Math.floor(product?.price)}</span>
              <button
                onClick={buyNow}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Buy
              </button>
              <button
                onClick={addToCartHandler}
                className="flex ml-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slug;
