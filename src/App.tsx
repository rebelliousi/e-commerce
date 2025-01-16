import React from 'react';
import {lazy,Suspense} from "react"
import { Routes, Route } from 'react-router-dom';
const Navbar=lazy(()=>import("./components/Navbar"));
const Slider=lazy(()=>import("./components/Slider"));
const Products=lazy(()=>import('./components/Product')) 
const ProductDetails=lazy(()=>import('./components/ProductDetails')) ;
const Footer=lazy(()=>import("./components/Footer")) ;
const CategoryProducts=lazy(()=>import('./components/CategoryProducts')); // Import the correct component
const Contact=lazy(()=>import('./components/Contact')) ;
const Categories=lazy(()=>import("./components/Categories")) 
const SearchPage=lazy(()=>import("./components/SearchPage")) 


const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div></div>}>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Slider />
            <Products />
          </>
        } />
        <Route path="/contact" element={<Contact />} />
        {/* Correct route for dynamic categories */}
        <Route path="/Category" element={<Categories />} />
        {/* Dynamic route */}
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/product/:productId" element={<ProductDetails />} /> 
        <Route path="/search" element={<SearchPage />} /> {/* Search Page route */}
      </Routes>
      <Footer />
      </Suspense>
    </div>
  );
};

export default App;