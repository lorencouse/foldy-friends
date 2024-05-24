import React from 'react';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Category } from './Components/Category';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LogIn } from './Pages/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './Components/Footer';


function App() {
  return (

    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/men' element={ <Category  category="men" /> } />
        <Route path='/women' element={<Category category="women" />} />
        <Route path='/kids' element={<Category category="kids" />} />
        <Route path='/product' element={<Product /> } />
        <Route path=':productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LogIn /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>

  );
}

export default App;
