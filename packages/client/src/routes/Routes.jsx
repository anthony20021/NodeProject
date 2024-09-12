import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;