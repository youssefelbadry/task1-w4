import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Componant/1-login/Login";
import Signin from "./Componant/2-signin/signup";
import Home from "./Componant/3-home/Home";
import About from "./Componant/4-about/About";
import Account from "./Componant/5-account/Account";
import Cart from "./Componant/6-cart/Cart";
import Details from "./Componant/7-details/Details";
import Wishlist from "./Componant/8-wishlist/Wishlist";
import Checkout from "./Componant/9-chekout/Checkout";
import Contact from "./Componant/10-contact/Contact";
import Error from "./Componant/11-error/Error";
import AllSaling from "./Componant/allproducts/AllSaling";
import AllBestSelling from './Componant/allproducts/AllBestSelling'
import Breadcrumbs from "./Componant/breadcrumbs/Breadcrumbs";
import Header from "./Componant/header/Header"
import { Provider } from "react-redux";
import Store from "./Componant/redux/Store";
import AllProducts from "./Componant/allproducts/AllProducts";
import AllFavorites from "./Componant/allproducts/AllFavorites";
import Lottie from "lottie-react";
import topAnimation from "./animation/top.json";
import { useEffect, useState } from "react";
import AllCategory from "./Componant/allproducts/AllCategory";

import Footer from "./Componant/footer/Footer";
// import Snipper from "./Componant/snipper/Snipper";
// import  { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);

  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [location]);
  const [showScroll, setshowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setshowScroll(true);
      } else {
        setshowScroll(false);
      }
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]); 


  useEffect(() => {
    const pathName = location.pathname.split('/').filter((path) => path !== '');
    let pageTitle = 'OneStopMarket';
  
    if (location.pathname === '/') {
      pageTitle = 'OneStopMarket || Home';
    } else if (pathName.length > 0) {
      const lastPart = pathName[pathName.length - 1];
      pageTitle = `OneStopMarket || ${lastPart.charAt(0).toUpperCase() + lastPart.slice(1)}`;
    }
  
    // تحديث العنوان في الصفحة
    document.title = pageTitle;
  }, [location]);


  return (
    <div id="up">
    <Provider  store={Store}>
       {/* {loading?(< Snipper/>):
      (
        <>
        ROUTERS
      </>
      )
    } */}
    <Header />
  <Breadcrumbs/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details/:title" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sales" element={<AllSaling/>} />
        <Route path="/selles" element={<AllBestSelling/>} />
        <Route path="/ourProducts" element={<AllProducts/>} />
        <Route path="/allFavorites" element={<AllFavorites/>} />
        <Route path="/category/:category" element={<AllCategory />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer/>
      <a
        style={{
          opacity: showScroll ? 1 : 0,
          transition: "opacity 0.9s ease-in-out",
        }}
        href="#up"
      >
        <Lottie
          className="scroll-top"
          style={{ cursor: "pointer" }}
          animationData={topAnimation}
        />
      </a>
    </Provider>
    </div>
  );
}

export default App;
