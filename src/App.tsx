import React from 'react';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Category } from './Pages/Category';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LogIn } from './Pages/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (

    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/men' element={ <Category  /> } />
        <Route path='/women' element={<Category  />} />
        <Route path='/kids' element={<Category  />} />
        <Route path='/product' element={<Product /> } />
        <Route path=':productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LogIn /> } />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
