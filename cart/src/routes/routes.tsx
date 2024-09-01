import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartDetails from '../pages/CartDetails';

const RoutesConfig: React.FC = () => (
  <Routes>
    <Route path="/cart/:cartId" element={<CartDetails />} />
  </Routes>
);

export default RoutesConfig;
