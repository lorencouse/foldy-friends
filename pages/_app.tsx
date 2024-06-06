
import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css'
import Navbar from '../src/components/Navbar/Navbar';
import { Footer } from '../src/components/Footer';
import { ShopContextProvider } from '../src/context/ShopContext';
// import { AuthProvider } from '../src/context/AuthContex';

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    // <AuthProvider>
    <ShopContextProvider>
      <div className="App">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ShopContextProvider>
    // </AuthProvider>
  );
}

export default MyApp;
