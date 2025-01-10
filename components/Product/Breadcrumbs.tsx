import React from "react";
import Link from "next/link";

export const Breadcrumbs = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => {
  return (
    <div className="breadcrimbs flex flex-row capitalize mb-4">
      <p>
        {" "}
        <Link href="/">Home </Link> / <Link href="/shop">Shop </Link> /{" "}
        <Link href={`/shop/category/${category}`}>{category}</Link> /{" "}
        <span className="text-gray-400">{name}</span>
      </p>
    </div>
  );
};
