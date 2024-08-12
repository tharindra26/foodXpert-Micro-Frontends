import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';


const RoutesConfig: React.FC = () => (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
);

export default RoutesConfig;
