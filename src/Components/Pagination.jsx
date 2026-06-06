import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const getPages = (current, total) => {
  let pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }
  return pages;
};
const Pagination = ({ pageHandler, page, setPage, dynamicPage }) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        disabled={page === 1}
        className={`${page === 1 ? "bg-red-400" : "bg-red-500"} text-white px-3 py-1 rounded-md cursor-pointer flex justify-center items-center gap-2`}
        onClick={() => pageHandler(page - 1)}
      >
        <FaArrowLeft/>
        Prev
      </button>
      {getPages(page, dynamicPage)?.map((item, indx) => {
        return (
          <span
            key={indx}
            onClick={() => typeof item === "number" && pageHandler(item)}
            className={`cursor-pointer ${item === page ? "font-bold text-red-600" : "text-black"}`}
          >
            {item}
          </span>
        );
      })}
      <button
        disabled={page === dynamicPage}
        className={`${page === dynamicPage ? "bg-red-400" : "bg-red-500"} text-white px-3 py-1 rounded-md cursor-pointer flex justify-center items-center gap-2`}
        onClick={() => pageHandler(page + 1)}
      >
        Next
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
