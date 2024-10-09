import "../styles/globals.css";
import React from "react";
import Navbar from "../src/components/Navbar/Navbar";
import { Footer } from "../src/components/Footer";
import { ShopContextProvider } from "../src/context/ShopContext";
import { Comfortaa, Baloo_2, Quicksand } from "next/font/google";
import { AppProps } from "next/app";
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

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ShopContextProvider>
      <style jsx global>{`
        :root {
          --comfortaa-font: ${comfortaa.style.fontFamily};
          --baloo2-font: ${baloo2.style.fontFamily};
          --quicksand-font: ${quicksand.style.fontFamily};
        }
      `}</style>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeTransition}
          className="min-h-screen"
        >
          <Component {...pageProps} key={router.asPath} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </ShopContextProvider>
  );
}

export default MyApp;
