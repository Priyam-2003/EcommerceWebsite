import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import axios from "axios";
import Footer from "./Components/Footer";
import SingleProduct from "./Pages/SingleProduct";
import CategoryProducts from "./Pages/CategoryProducts";
import { useCart } from "./context/CartContext";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  const [location, setLocation] = useState();
  const [dropDown, setDropDown] = useState(false);
  const {cartItem,setCartItem} = useCart();
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const response = await axios.get(url);
        const exactLocation = response.data.address;
        setLocation(exactLocation);
        setDropDown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(()=>{
    window.scroll(0,0);
  },[])
  return (

<HashRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        dropDown={dropDown}
        setDropDown={setDropDown}
      />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
        <Route path="/products/:id" element={<SingleProduct/>}></Route>
        <Route path="/category/:category" element={<CategoryProducts/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/cart" element={<ProtectedRoute><Cart location={location} getLocation={getLocation}/></ProtectedRoute>}></Route>
      </Routes>
      <Footer />
</HashRouter>
  );
};

export default App;
