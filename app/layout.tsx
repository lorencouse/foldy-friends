"use client";

import "../styles/globals.css";
import React from "react";
import Navbar from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { ShopContextProvider } from "@/context/ShopContext";
import { Comfortaa, Baloo_2, Quicksand } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ShopContextProvider>
          <style jsx global>{`
            :root {
              --comfortaa-font: ${comfortaa.style.fontFamily};
              --baloo2-font: ${baloo2.style.fontFamily};
              --quicksand-font: ${quicksand.style.fontFamily};
            }
          `}</style>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ShopContextProvider>
      </body>
    </html>
  );
};

export default Layout;
