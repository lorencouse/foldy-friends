import React from "react";
import { ProductData } from "../../types";

const SortProductsByDropdown = ({
  filteredProducts,
  setFilteredProducts,
}: {
  filteredProducts: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}) => {
  const handleSortProducts = (sort: string) => {
    let sortedProducts = [...filteredProducts];

    if (sort === "low") {
      sortedProducts.sort(
        (p1, p2) =>
          (p1.sale_price ?? p1.full_price ?? 0) -
          (p2.sale_price ?? p2.full_price ?? 0),
      );
    } else if (sort === "high") {
      sortedProducts.sort(
        (p1, p2) =>
          (p2.sale_price ?? p2.full_price ?? 0) -
          (p1.sale_price ?? p1.full_price ?? 0),
      );
    } else if (sort === "newest") {
      sortedProducts.sort(
        (p1, p2) => (p2.created_at ?? 0) - (p1.created_at ?? 0),
      );
    } else if (sort === "oldest") {
      sortedProducts.sort(
        (p1, p2) => (p1.created_at ?? 0) - (p2.created_at ?? 0),
      );
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="dropdown dropdown-hover mx-6">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 capitalize font-bold bg-gray-100"
      >
        Sort Price
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortProducts("low")}
          >
            Price: Low to High
          </button>
        </li>
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortProducts("high")}
          >
            Price: High to Low
          </button>
        </li>
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortProducts("newest")}
          >
            Date: Newest to Oldest
          </button>
        </li>
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortProducts("oldest")}
          >
            Date: Oldest to Newest
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SortProductsByDropdown;