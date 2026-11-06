"use client";

import "@/styles/main.css";
import React, { ReactNode } from "react";
import Navbar from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { ShopContextProvider } from "@/context/ShopContext";
import { Comfortaa, Baloo_2, Quicksand } from "next/font/google";
import { ThemeProvider } from "@/context/theme-provider";

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

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html
      lang="en"
      className={`${comfortaa.className} ${baloo2.className} ${quicksand.className}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ShopContextProvider>
            <Navbar />
            <main className="min-h-[80vh] md:mt-16">{children}</main>
            <Footer />
          </ShopContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
