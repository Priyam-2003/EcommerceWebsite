import React from "react";
import { getData } from "../context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
  handleBrandChange
}) => {
  const { categoryData, brandData } = getData();

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden lg:block">
      <input
        type="text"
        placeholder="Search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />
      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryData?.map((item, indx) => {
          return (
            <div key={indx} className="flex gap-2">
              <input
                type="checkbox"
                name={item}
                id={indx}
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
              />
              <button className="uppercase cursor-pointer">{item}</button>
            </div>
          );
        })}
      </div>
      {/* Brand Wise Data */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        name=""
        id=""
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md uppercase"
        value={brand}
        onChange={handleBrandChange}
      >
        {brandData?.map((item, indx) => {
          return (
            <option key={indx} value={item} className="bg-gray-100">
              {item}
            </option>
          );
        })}
      </select>
      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="price-range">
          ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          name=""
          id="price-range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>
      <button className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer hover:shadow-2xl hover:bg-red-700 transition-all duration-300 ml-10" 
      onClick={()=>{setSearch('');setCategory("All");setBrand("All");setPriceRange([0,5000])}}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
