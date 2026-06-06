import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import emptyCard from '../assets/empty-cart.png';

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigation = useNavigate();
  const totalPrice = cartItem.reduce((total, item) => total + item.price, 0);

  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.fullName);
    }
    if (location) {
      setAddress(location.county || "");
      setState(location.state || "");
      setPostcode(location.postcode || "");
      setCountry(location.country || "");
    }
  }, [location, user]);
  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>
          <div>
            <div className="mt-10 ">
              {cartItem.map((item, indx) => {
                return (
                  <div
                    key={indx}
                    className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full sm:gap-1"
                  >
                    <div 
                    onClick={()=>navigation(`/products/${item.id}`)}
                    className="flex items-center gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-20 h-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-75 line-clamp-2">{item.title}</h1>
                        <p className="text-red-500 font-semibold text-lg ">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                      <button
                        className="cursor-pointer"
                        onClick={() => updateQuantity(item.id, "decrease")}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => updateQuantity(item.id, "increase")}
                      >
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                    >
                      <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                <form>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="Name">Full Name</label>
                    <input
                      type="text"
                      id="Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your name"
                      className="p-2 rounded-md border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="Address">Address</label>
                    <input
                      type="text"
                      id="Address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Enter your address"
                      className="p-2 rounded-md border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                    />
                  </div>
                  <div className="flex w-full gap-5">
                    <div className="flex flex-col space-y-1 w-full">
                      <label htmlFor="State">State</label>
                      <input
                        type="text"
                        id="State"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="Enter your state"
                        className="p-2 rounded-md w-full border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label htmlFor="Post">Postal Code</label>
                      <input
                        type="text"
                        id="Post"
                        name="postal"
                        value={postcode}
                        required
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="Enter your postal code"
                        className="p-2 rounded-md w-full border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-5">
                    <div className="flex flex-col space-y-1 w-full">
                      <label htmlFor="Country">Country</label>
                      <input
                        type="text"
                        id="Country"
                        name="country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Enter your country"
                        className="p-2 rounded-md w-full border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                      <label htmlFor="Phone">Phone No</label>
                      <input
                        type="tel"
                        id="Phone"
                        name="tel"
                        required
                        placeholder="Enter your phone no"
                        className="p-2 rounded-md w-full border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer  hover:bg-red-700 hover:shadow-2xl transition-colors duration-300">
                    Submit
                  </button>
                </form>
                <div className="flex items-center justify-center w-full text-gray-700">
                  ---------OR---------
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={getLocation}
                    className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer  hover:bg-red-700 hover:shadow-2xl transition-colors duration-300"
                  >
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="bg-white border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill deatails
                </h1>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <LuNotebookText />
                    </span>
                    Items total
                  </h1>
                  <p className="text-gray-700">${totalPrice}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <MdDeliveryDining />
                    </span>{" "}
                    Delivery Charge
                  </h1>
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">${25}</span>{" "}
                    Free
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <GiShoppingBag />
                    </span>{" "}
                    Handling Charge
                  </h1>
                  <p className="text-red-500 font-semibold">$5</p>
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-lg">Grand total</h1>
                  <p className="font-semibold text-lg">
                    ${(totalPrice + 5).toFixed(2)}
                  </p>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                    Apply Promo Code
                  </h1>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter code"
                      className="p-2 rounded-md w-full"
                    />
                    <button className="bg-white text-black border border-gray-200 px-4 py-1 rounded-md cursor-pointer ">
                      Apply
                    </button>
                  </div>
                </div>
                <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3  hover:bg-red-700 hover:shadow-2xl transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-125 ">
          <h1 className="text-red-500/80 font-bold text-5xl">Oh no! Your cart is empty</h1>
          <img src={emptyCard} alt="emptyCard" className="w-100"/>
          <button 
          onClick={()=>navigation('/products')}
          className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer  hover:bg-red-700 hover:shadow-2xl transition-colors duration-300">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
