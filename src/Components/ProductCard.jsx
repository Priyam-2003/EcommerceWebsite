import React from "react";
import { IoCartOutline } from "react-icons/io5";
import Stars from "./Stars";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <div className="group border border-gray-100 rounded-xl bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-all">
      {/* Image Section */}
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          New
        </span>
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => navigate(`/products/${item.id}`)}
        />
      </div>
      {/* Content */}
      <div className="p-2 flex flex-col gap-2">
        <h1 className="line-clamp-1 font-semibold text-gray-800">
          {item.title}
        </h1>
        <div className="flex items-center gap-2 text-yellow-500 text-sm">
          <Stars rating={item.rating} />
          <span className="text-gray-500">({item.rating})</span>
        </div>
        <p className="text-lg font-bold text-gray-900">${item.price}</p>
        <button
          className="bg-red-500 hover:bg-red-600 transition-colors text-white py-2 rounded-md flex items-center justify-center gap-2 font-semibold"
          onClick={() => addToCart(item, 1)}
        >
          <IoCartOutline className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
