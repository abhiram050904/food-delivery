import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Modal from './Modal';
import Cart from './Cart';
import { useCart } from '../context/CartContext';

const MainLayout = ({ children }) => {
  const { isCartOpen, setIsCartOpen, cartItems, updateCartItem, removeCartItem } = useCart();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
      <Modal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateCartItem}
          onRemoveItem={removeCartItem}
        />
      </Modal>
    </div>
  );
};

export default MainLayout;
