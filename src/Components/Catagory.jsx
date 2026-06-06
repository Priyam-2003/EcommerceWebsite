import React, { useEffect } from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Catagory = () => {
  const { data } = getData();
  const navigate = useNavigate();
  const getCatagory = (data, category) => {
    let newVal = data?.map((curr) => {
      return curr[category];
    });
    return [...new Set(newVal)];
  };
  const allCategory = getCatagory(data, "category");
  const categoryData = [...(allCategory?.slice(5, 11) || [])];
  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categoryData?.map((item, indx) => {
          return (
            <div key={indx}>
              <button
                onClick={() => navigate(`/category/${item}`)}
                className="uppercase bg-linear-to-r from-red-500 via-pink-500 to-purple-500 text-white px-3.5 py-1.5 rounded-md cursor-pointer transition-all duration-300  hover:from-red-600 hover:via-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-2xl shadow-purple-950"
              >
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catagory;
