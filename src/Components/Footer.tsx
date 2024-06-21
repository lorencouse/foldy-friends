import React, { useState } from "react";
import Link from "next/link";
import { LinkInfo } from "../types";
import { NavLogo } from "./Navbar/NavLogo";
import SocialIcons from "./SocialIcons";
import { NavLink } from "./Navbar/NavLink";

export const Footer = () => {
  const [active, setActive] = useState("Shop");

  const links: LinkInfo[] = [
    { title: "shop", url: "/shop" },
    { title: "returns", url: "/returns" },
    { title: "about", url: "/about" },
    { title: "contact", url: "/contact" },
    { title: "create", url: "/admin/create-product" },
    { title: "all", url: "/admin/all-products" },
  ];

  return (
    <div className="footer w-full p-1">
      <div className="footer-components flex flex-row flex-wrap m-5 justify-around">
        <NavLogo />
        <ul className="nav-menu flex flex-row flex-wrap  gap-10 m-auto p-5">
          {links.map((link, key) => (
            <NavLink
              url={link.url}
              label={link.title}
              key={key}
            />
          ))}
        </ul>
        <SocialIcons />
      </div>
      <hr className="h-0 outline outline-1 outline-gray-400  m-auto" />
      <div className="copyright my-12">
        <p>Foldy Friends Inc. 2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};
