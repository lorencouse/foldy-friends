import React from "react";

const SortProductsByDropdown = ({
  setSort,
  sort
}: {
  setSort: (sort: string) => void;
  sort: string;
}) => {
  const handleSortChange = (sort: string) => {
    setSort(sort);
  };

  return (
    <div className="dropdown mx-6">
      <div tabIndex={0} role="button" className="m-1 btn bg-base-100 w-56 capitalize">Sort By{`: ${sort}`}</div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
      >
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortChange("lowest")}
          >
            Price: Low to High
                 </button>
        </li>
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortChange("highest")}
          >
            Price: High to Low
          </button>
        </li>
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortChange("newest")}
          >
            Date: Newest to Oldest
          </button>
        </li>
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortChange("oldest")}
          >
            Date: Oldest to Newest
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SortProductsByDropdown;
