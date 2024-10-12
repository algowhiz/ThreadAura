import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { PiCheckFatFill } from "react-icons/pi";
import { BsFillCartDashFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useRouter } from 'next/router';


const categories = {
  womens: [
    { name: "TOPWEAR", items: ["T-Shirts", "Shirts", "Hoodies", "Sweatshirts"] },
    { name: "BOTTOMWEAR", items: ["Jeans", "Joggers", "Shorts", "Trousers"] },
    { name: "ACCESSORIES", items: ["Bags", "Hats", "Watches"] }
  ],
  mens: [
    { name: "TOPWEAR", items: ["T-Shirts", "Shirts", "Hoodies", "Sweatshirts"] },
    { name: "BOTTOMWEAR", items: ["Jeans", "Joggers", "Shorts", "Trousers"] },
    { name: "SNEAKERS", items: ["Running-Shoes", "Casual-Shoes", "Sports-Shoes"] }
  ],
  kids: [
    { name: "CLOTHING", items: ["T-Shirts", "Pants", "Shorts", "Dresses"] },
    { name: "ACCESSORIES", items: ["Caps", "Bags", "Toys"] }
  ]
};

const Navbar = ({ user, setUser, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [toggle, setToggle] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [activeCategory, setActiveCategory] = useState('men');
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  let hideDropdownTimeout = null;

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handelLogout = () => {
    setDropDown(false);
    setUser({ value: null });
    localStorage.removeItem("thread_aura_token");
  }

  const toggleDropDown = () => {
    clearTimeout(hideDropdownTimeout);
    setDropDown(true);
  }

  const toggleHideDropDown = () => {
    setTimeout(() => {
      setDropDown(false);
    }, 2000);
  }

  const handleMouseEnter = (index) => {
    setDropdownVisible(index);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(null);
  };

  const handleCategoryChange = (category) => {
    console.log(category);

    setActiveCategory(category);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {

    const category = router.query.category;

    if (category) {
      setActiveCategory(category);
    }
  }, [router.query.category]);


  return (
    <div>
      <header className="bg-[#374151] text-white body-font sticky top-0 z-10">
        <div className="container hidden md:flex mx-auto  flex-wrap flex-col md:flex-row p-3 md:p-1 items-center">
          <div className='absolute z-50 top-0 ml-5'>
            <div className="mb-4">
              <img src="/threadLogo.png"  className={`w-28 h-28 rounded-full transition-transform duration-300 ${
            scrolled ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`} alt="Logo" />
            </div>
          </div>
          <nav className="md:ml-auto font-bold md:mr-auto flex flex-wrap items-center text-base justify-center">

            <Link href={"/categories?category=womens"}>
              <p
                className={`mr-5 hover:text-blue-500 cursor-pointer ${activeCategory === 'womens' ? 'text-blue-500' : ''}`}
                onClick={() => handleCategoryChange('women')}
              >
                Women
              </p>
            </Link>
            <Link href={"/categories?category=mens"}>
              <p
                className={`mr-5 hover:text-blue-500 cursor-pointer ${activeCategory === 'mens' ? 'text-blue-500' : ''}`}
                onClick={() => handleCategoryChange('men')}
              >
                Men
              </p>
            </Link>
            <Link href={"/categories?category=kids"}>
              <p
                className={`mr-5 hover:text-blue-500 cursor-pointer ${activeCategory === 'kids' ? 'text-blue-500' : ''}`}
                onClick={() => handleCategoryChange('kids')}
              >
                Kids
              </p>
            </Link>
          </nav>

          <div className="flex justify-center items-center mt-3 relative">
            {!user?.value && (
              <Link href={'/login'}>
                <button className="bg-blue-400 text-white md:mr-4 py-1 px-3 focus:outline-none rounded text-base md:mt-0">
                  Login
                </button>
              </Link>
            )}
            {user?.value && (
              <div className="relative">
                <FaUserCircle
                  size={30}
                  onMouseEnter={toggleDropDown}
                  // onMouseLeave={toggleHideDropDown}
                  className="cursor-pointer md:mr-4"
                />

                {dropDown && (
                  <div
                    onMouseEnter={toggleDropDown}
                    onMouseLeave={toggleHideDropDown}
                    className="absolute truncate whitespace-nowrap left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black shadow-lg rounded-md p-2"
                  >
                    <ul>
                      <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        <Link href="/myaccount">My Account</Link>
                      </li>
                      <hr />
                      <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        <Link href={`/orders/${localStorage.getItem("thread_aura__id")}`}>Orders</Link>
                      </li>
                      <hr />
                      <li
                        className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handelLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <FaCartShopping
              onClick={handleToggle}
              size={24}
              className="m-3 cursor-pointer hover:text-blue-500"
            />
          </div>


        </div>
        <div className="container md:hidden flex mx-auto  flex-wrap flex-row justify-between md:flex-row p-3 md:p-1 items-center">
          <IoMenu size={30} />
          <div className=" flex justify-center items-center z-50">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img src="/threadLogo.png" className="w-28 h-28 object-contain rounded-full" alt="Logo" />
            </div>
          </div>

          <div className="flex justify-center items-center mt-3 relative">
            {!user?.value && (
              <Link href={'/login'}>
                <button className="bg-blue-400 text-white md:mr-4 py-1 px-3 focus:outline-none rounded text-base md:mt-0">
                  Login
                </button>
              </Link>
            )}
            {user?.value && (
              <div className="relative">
                <FaUserCircle
                  size={30}
                  onMouseEnter={toggleDropDown}
                  onMouseLeave={toggleHideDropDown}
                  className="cursor-pointer md:mr-4"
                />

                {dropDown && (
                  <div
                    onMouseEnter={toggleDropDown}
                    onMouseLeave={toggleHideDropDown}
                    className="absolute  truncate -right-7  mt-2 bg-white text-black shadow-lg rounded-md p-2"
                  >
                    <ul>
                      <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        <Link href="/myaccount">My Account</Link>
                      </li>
                      <hr />
                      <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        <Link href={`/orders/${localStorage.getItem("thread_aura__id")}`}>Orders</Link>
                      </li>
                      <hr />
                      <li
                        className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handelLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <FaCartShopping
              onClick={handleToggle}
              size={24}
              className="m-3 cursor-pointer hover:text-blue-500"
            />
          </div>
        </div>
        <div className={`bg-white ${scrolled ? 'fixed top-0' : ''}  w-full   hidden md:block text-black shadow-md`}  >

          <div className="  flex space-x-8 items-center justify-between" onMouseLeave={handleMouseLeave}>
            <div className={`w-1/6 flex justify-center items-center transition-transform duration-300 ${
          !scrolled ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}>
              <img src="/threadLogo.png" className="w-14  h-14 rounded-full" alt="Logo" />
            </div>
            <div className=' w-5/6 flex space-x-8 items-center justify-start py-4 px-6'>
              {categories[activeCategory]?.map((category, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <button className="text-gray-800 font-semibold hover:text-blue-600 hover:underline hover:underline-offset-4 transition-all duration-200">
                    {category?.name} <span className="ml-2">▾</span>
                  </button>
                  {dropdownVisible === index && (
                    <div className="absolute left-0 max-w-auto min-w-full bg-white shadow-md rounded-md mt-2 z-10">
                      <ul className="py-2">
                        {category?.items?.map((subcategory, subIndex) => (
                          <li key={subIndex} className="px-4 hover:text-blue-600 hover:underline hover:underline-offset-4 transition-all duration-200 py-2 whitespace-nowrap hover:bg-gray-100">
                            <Link href={`/category?slug=${subcategory?.toLowerCase()}&category=mens`}>{subcategory}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <nav className="md:ml-auto md:hidden bg-white text-black border-4 border-gray-400 font-bold md:mr-auto flex flex-wrap items-center justify-between text-base px-4 py-2">
            <Link href={"/womens"}>
              <p
                className={`mx-auto w-full px-4 py-2  hover:text-blue-500 cursor-pointer ${activeCategory === 'women' ? 'text-blue-500' : ''}`}
                onClick={() => handleCategoryChange('women')}
              >
                Women
              </p>
            </Link>
            <Link href={"/mens"}>
              <p
                className={`mx-auto  w-full px-4 py-2  hover:text-blue-500 cursor-pointer ${activeCategory === 'men' ? 'text-blue-500' : ''}`}
                onClick={() => handleCategoryChange('men')}
              >
                Men
              </p>
            </Link>
            <Link href={"/kids"}>
              <p
                className={`mx-auto  w-full px-4 py-2 hover:text-blue-500 cursor-pointer ${activeCategory === 'kids' ? 'text-blue-500' : ''}`}
                onClick={() => handleCategoryChange('kids')}
              >
                Kids
              </p>
            </Link>
          </nav>
        </div>


      </header>

      {/* Sidebar for Cart */}
      <div className={`sidebar overflow-y-scroll w-72 md:w-96 fixed top-0 right-0 text-black bg-white p-8 transform transition-transform duration-700 ease-in-out ${toggle ? 'translate-x-0' : 'translate-x-full'} shadow-2xl z-50 rounded-md h-[100vh]`}>
        <p className="text-xl font-bold">This is Shopping Cart</p>
        <span className="absolute top-3 right-3 font-semibold cursor-pointer hover:text-blue-500" onClick={handleToggle}>
          <IoClose size={20} />
        </span>
        <ol>
          {Object.keys(cart)?.map((it, idx) => {
            if (!cart?.[it]) return null;

            return (
              <li key={idx} className="flex font-bold gap-2 mt-2 font-sans items-center">
                <p className="w-3/5">{cart?.[it]?.name} ( {cart?.[it]?.size} / {cart?.[it]?.varient} )</p>
                <p className="w-2/5 flex justify-center gap-3 items-center text-lg">
                  <FaCircleMinus size={17} onClick={() => removeFromCart(it, 1, cart?.[it]?.price, cart?.[it]?.name, cart?.[it]?.size, cart?.[it]?.varient)} className="hover:text-blue-500 cursor-pointer" />
                  <p className='truncate'>{cart?.[it]?.qty}</p>
                  <FaCirclePlus size={17} onClick={() => addToCart(it, 1, cart?.[it]?.price, cart?.[it]?.name, cart?.[it]?.size, cart?.[it]?.varient)} className="hover:text-green-500 cursor-pointer" />
                </p>
              </li>
            );
          })}
          <p className="mt-4 text-lg">SubTotal: <span className='font-bold'>₹{subTotal}</span></p>
        </ol>

        {Object.keys(cart)?.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <BsFillCartDashFill size={50} />
            <p className="font-bold">No Items Found in Cart!</p>
          </div>
        )}

        <div className="w-full flex mt-8  gap-2">
          <Link href={'/checkouts'}><button className="flex justify-center items-center whitespace-nowrap gap-2 mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><PiCheckFatFill color='white' /> Checkout</button></Link>
          <button onClick={clearCart} className="flex justify-center gap-2 items-center mx-auto mt-16 text-white whitespace-nowrap bg-indigo-500 border-0 py-2 px-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><BsFillCartDashFill color='white' /> Clear Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;