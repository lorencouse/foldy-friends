import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from '../src/components/Navbar/Navbar';
import { Footer } from '../src/components/Footer';
import { ShopContextProvider } from '../src/context/ShopContext';

function MyApp({ Component, pageProps }) {
  return (
    <ShopContextProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="App">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </ShopContextProvider>
  );
}

export default MyApp;
