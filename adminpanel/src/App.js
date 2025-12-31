import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Users from './pages/Users';
import Login from './pages/Login';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const App = () => {
  return (
    <CartProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/*" element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/users" element={<Users />} />
                </Routes>
              </MainLayout>
            } />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};
