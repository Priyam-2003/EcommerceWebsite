import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductListView = ({ item }) => {
  const navigate = useNavigate();
  const {addToCart} = useCart();
   const originalPrice = Math.round(
    item.price +
      (item.price * item.discountPercentage) / 100,
  );
  console.log(item);
  return (
    <div className="space-y-4 mt-2 rounded-md">
      <div className="bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        <img
          src={item.images[0]}
          alt={item.title}
          onClick={() => navigate(`/products/${item.id}`)}
          className="md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer"
        />
       <div className="space-y-4">
        <h1 
        onClick={() => navigate(`/products/${item.id}`)}
        className="font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full cursor-default w-55">{item.title}</h1>
         <p className="flex flex-wrap items-center gap-3">
            <span className="md:text-3xl text-xl">
              ${item.price}
            </span>

            <span className="text-sm text-gray-400 line-through md:text-xl">
              ${originalPrice}
            </span>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full md:text-xl font-semibold text-sm">
              {item.discountPercentage}% OFF
            </span>
          </p>
          <p className="text-sm">FREE delivery <span className="font-semibold">Fri, 18 Apr</span> <br />
          Or fastest delivery <span className="font-semibold">Tomorrow, 17 Apr</span>
          </p>
          <button 
          onClick={()=>addToCart(item,1)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Add to Cart</button>
       </div>
      </div>
    </div>
  );
};

export default ProductListView;
