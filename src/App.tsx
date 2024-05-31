import React from 'react';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Category } from './Components/Category';
import { Home } from './Pages/Home';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { CartPage } from './Pages/CartPage'; 
import { LogIn } from './Pages/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './Components/Footer';


function App() {
  return (

    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={ <Shop /> } />
        <Route path='/men' element={ <Category  category="men" /> } />
        <Route path='/women' element={<Category category="women" />} />
        <Route path='/kids' element={<Category category="kids" />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LogIn /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>

  );
}

export default App;
