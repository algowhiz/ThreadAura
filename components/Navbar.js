import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { PiCheckFatFill } from "react-icons/pi";
import { BsFillCartDashFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
const namer = require('color-namer');

const Navbar = ({ user, setUser, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [toggle, setToggle] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  
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
    hideDropdownTimeout = setTimeout(() => {
      setDropDown(false);
    }, 2000);
  }

  return (
    <div>
      <header className="text-gray-700 bg-white body-font shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row p-3 md:p-1 items-center">
          <a className="flex title-font font-medium justify-center items-center text-white mb-4 md:mb-0">
            <Image src="/threadLogo.png" width={180} height={30} className="md:w-20 md:h-20 w-32 h-32 rounded-full " alt="" />
          </a>
          <nav className="md:ml-auto font-bold md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={'/tshirts'}><p className="mr-5 hover:text-blue-400">Tshirts</p></Link>
            <Link href={'/hoodies'}><p className="mr-5 hover:text-blue-400">Hoodies</p></Link>
            <Link href={'/stickers'}><p className="mr-5 hover:text-blue-400">Stickers</p></Link>
            <Link href={'/mugs'}><p className="mr-5 hover:text-blue-400">Mugs</p></Link>
          </nav>
          <div className="flex justify-center items-center mt-3">
            {!user.value && <><Link href={'/login'}><button className="bg-blue-400 text-white md:mr-4 py-1 px-3 focus:outline-none rounded text-base md:mt-0">Login</button></Link></>}
            {user.value && <FaUserCircle size={30} onMouseOver={toggleDropDown} onMouseLeave={toggleHideDropDown} className='cursor-pointer md:mr-4 ' />}
            <FaCartShopping onClick={handleToggle} size={24} className="m-3 cursor-pointer hover:text-blue-500" />
            {dropDown && <div onMouseEnter={toggleDropDown} onMouseLeave={toggleHideDropDown} className='absolute top-full mr-3  bg-white shadow-lg rounded-md p-2' >
              <ul>
                <Link href='/myaccount'><li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">My Account</li></Link><hr />
                <Link href={`/orders/${localStorage.getItem("thread_aura__id")}`}><li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Orders</li></Link><hr />
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={handelLogout} >Logout</li>
              </ul>
            </div>}
          </div>
        </div>
        <div
          className={`sidebar overflow-y-scroll w-72 md:w-96 fixed top-0 right-0 bg-white p-10 transform transition-transform duration-700 ease-in-out ${toggle ? 'translate-x-0' : 'translate-x-full'
            } shadow-2xl z-50 rounded-md h-[100vh]`}
        >
          <p className="text-xl font-bold">This is Shopping Cart</p>
          <span
            className="absolute top-3 right-3 font-semibold cursor-pointer hover:text-red-500"
            onClick={handleToggle}
          >
            <IoClose size={20} />
          </span>
          <ol>
            {Object.keys(cart).map((it, idx) => {

              if (!cart[it]) return null;

              return (
                <li key={idx} className="flex font-bold gap-2 mt-2 font-sans items-center">
                  <p className="w-3/5">{cart[it].name} ( {cart[it].size} /  {cart[it].varient} )</p>
                  <p className="w-2/5 flex justify-center gap-3 items-center text-lg">
                    <FaCircleMinus
                      size={17}
                      onClick={() => removeFromCart(it, 1, cart[it]?.price, cart[it]?.name, cart[it]?.size, cart[it]?.varient)}
                      className="hover:text-red-500 cursor-pointer"
                    />
                    <p className='truncate'>{cart[it]?.qty}</p>
                    <FaCirclePlus
                      size={17}
                      onClick={() => addToCart(it, 1, cart[it]?.price, cart[it]?.name, cart[it]?.size, cart[it]?.varient)}
                      className="hover:text-green-500 cursor-pointer"
                    />
                  </p>
                </li>
              );
            })}
            <p className='font-semibold'> Total - ₹ {Math.floor(subTotal)}</p>
          </ol>
          <div className='flex justify-center items-center gap-2'>
            <Link href={'/checkouts'}><button className="flex justify-center items-center whitespace-nowrap gap-2 mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><PiCheckFatFill color='white' /> Checkout</button></Link>
            <button onClick={clearCart} className="flex justify-center gap-2 items-center mx-auto mt-16 text-white whitespace-nowrap bg-indigo-500 border-0 py-2 px-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><BsFillCartDashFill color='white' /> Clear Cart</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
