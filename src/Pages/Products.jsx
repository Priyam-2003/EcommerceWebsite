import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../Components/FilterSection";
import loading from "../assets/loading2.webm";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";
import notfound from "../assets/notfound.json";
import Lottie from "lottie-react";
import MobileFilter from "../Components/MobileFilter";

const LottieComponent = Lottie.default || Lottie;

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const filterData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1],
  );

  const dynamicPage = Math.ceil(filterData?.length / 8);

  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      <MobileFilter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        handleCategoryChange={handleCategoryChange}
        handleBrandChange={handleBrandChange}
      />
      {data?.length > 0 ? (
        <div className="flex gap-8">
          <FilterSection
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
          />

          {filterData?.length > 0 ? (
            <div className="flex flex-col w-full">
              <div className="grid md:grid-cols-4 grid-cols-2 md:gap-7 mt-10">
                {filterData?.slice(page * 8 - 8, page * 8)?.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Pagination
                  pageHandler={pageHandler}
                  page={page}
                  setPage={setPage}
                  dynamicPage={dynamicPage}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center md:h-150 md:w-225 mt-10">
              <LottieComponent animationData={notfound} className="w-125" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-100">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Products;
