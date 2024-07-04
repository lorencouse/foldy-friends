import "../styles/globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { ReactNode } from "react";
import Navbar from "../src/components/Navbar/Navbar";
import { Footer } from "../src/components/Footer";
import { ShopContextProvider } from "../src/context/ShopContext";
import { Comfortaa, Baloo_2, Quicksand } from "next/font/google";
import { AppProps } from "next/app";

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

interface ThemeProviderWrapperProps {
  children: ReactNode;
  [key: string]: any;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopContextProvider>
      <ThemeProviderWrapper attribute="class" defaultTheme="light">
        <style jsx global>{`
          :root {
            --comfortaa-font: ${comfortaa.style.fontFamily};
            --baloo2-font: ${baloo2.style.fontFamily};
            --quicksand-font: ${quicksand.style.fontFamily};
          }
        `}</style>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProviderWrapper>
    </ShopContextProvider>
  );
}

export default MyApp;
