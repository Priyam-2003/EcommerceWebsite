import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "../assets/loading2.webm";
import Breadcrums from "../Components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const increase = () => {
    setQuantity(quantity + 1);
  };

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    addToCart(singleProduct, quantity);
    setQuantity(1);
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (!singleProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop>
          <source src={loading} type="video/webm" />
        </video>
      </div>
    );
  }

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100,
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrums title={singleProduct.title} />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 items-stretch max-w-7xl mx-auto md:px-4 px-2 md:py-6 py-3">
        {/* IMAGE */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex justify-center items-center md:min-h-130 min-h-65">
          <img
            src={singleProduct.images[0]}
            alt={singleProduct.title}
            className="md:w-full md:max-w-md object-contain"
          />
        </div>

        {/*DETAILS*/}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:gap-4 gap-2">
          {/* Brand & Category */}
          <div className="md:text-xs text-[10px] text-gray-500 uppercase tracking-wider">
            {singleProduct.brand} • {singleProduct.category}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {singleProduct.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">
              ⭐ {singleProduct.rating}
            </span>
            <span className="text-gray-500 text-sm">Rated Product</span>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="md:text-3xl text-2xl font-bold text-red-500">
              ${singleProduct.price}
            </span>

            <span className="md:text-lg text-[16px] text-gray-400 line-through">
              ${originalPrice}
            </span>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {singleProduct.discountPercentage}% OFF
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-6">{singleProduct.description}</p>

          {/* Stock */}
          <div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              In Stock
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 md:mt-3 mt-2">
            <span className="font-medium text-gray-700">Quantity</span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decrease}
                className="px-4 py-2 hover:bg-gray-100 text-lg"
              >
                -
              </button>

              <span className="px-5 font-semibold">{quantity}</span>

              <button
                onClick={increase}
                className="px-4 py-2 hover:bg-gray-100 text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1 mt-2 md:mt-6">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <IoCartOutline className="w-5 h-5" />
              Add to Cart
            </button>

            <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
