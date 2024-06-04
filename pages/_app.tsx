
import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '../src/Components/Navbar/Navbar';
import { Footer } from '../src/Components/Footer';
import { ShopContextProvider } from '../src/Context/ShopContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopContextProvider>
      <div className="App">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default MyApp;
