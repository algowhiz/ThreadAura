import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const namer = require('color-namer');
import LoadingBar from 'react-top-loading-bar';
import Script from "next/script";
import AdminDashboard from "@/components/AdminDashboard";


export default function App({ Component, pageProps }) {

  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const hideNavbarRoutes = ['/admin/dashboard'];

  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40);
    });

    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });

    try {
      if (localStorage.getItem("MyCart")) {
        setCart(JSON.parse(localStorage.getItem("MyCart")));
        saveCart(JSON.parse(localStorage.getItem("MyCart")));
      }
    } catch (error) {
      localStorage.removeItem("MyCart");
    }

    const token = localStorage.getItem("thread_aura_token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }

  }, [router.query]);

  const saveCart = (newCart) => {
    localStorage.setItem("MyCart", JSON.stringify(newCart));
    let subT = 0;
    let keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subT += newCart[keys[i]]?.price * newCart[keys[i]]?.qty;
    }
    setSubTotal(subT);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const addToCart = (itemCode, qty, price, name, size, varient, imgUrl, desc , _id) => {
    let newCart = { ...cart };
    let key = `${name}-${size}-${varient}`;

    if (newCart[key]) {
      newCart[key].qty += qty;
    } else {
      newCart[key] = { qty, price, name, size, varient, imgUrl, desc ,_id};
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode, qty, price, name, size, varient) => {
    let newCart = { ...cart };
    let key = `${name}-${size}-${varient}`;

    if (newCart[key]) {
      newCart[key].qty -= qty;

      if (newCart[key].qty <= 0) {
        delete newCart[key];
      }
    }

    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <>
    <Script async src="https://pay.google.com/gp/p/js/pay.js"/>

      <LoadingBar
        color='#6366F1'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
       {!hideNavbarRoutes.includes(router.pathname) && <Navbar key={key} setUser={setUser} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}

       {hideNavbarRoutes.includes(router.pathname) && <AdminDashboard setUser={setUser}  />}
      


      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      {!hideNavbarRoutes.includes(router.pathname) &&  <Footer />}
     
    </>
  );
}
