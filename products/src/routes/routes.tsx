import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsHome from '../pages/ProductsHome';

const RoutesConfig: React.FC = () => (
  <Routes>
    <Route path="/products" element={<ProductsHome />} />
  </Routes>
);

export default RoutesConfig;
