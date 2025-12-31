import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import AddFoodForm from '../components/AddFoodForm';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/foods');
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu items. Is the backend server running?');
        console.error(err);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleFoodAdded = (newFood) => {
    setMenuItems([...menuItems, newFood]);
  };

  const handleDelete = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const authToken = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:8080/foods/${foodId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        setMenuItems(menuItems.filter(item => item.id !== foodId));
      } catch (err) {
        setError('Failed to delete food item. Please try again.');
        console.error(err);
      }
    }
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Menu Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <span className="material-icons-outlined mr-2">add</span>
          Add New Item
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a dish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full max-w-sm pl-4 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading menu items...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="h-40 w-full object-cover"/>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 h-10">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-500">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item.id, 1)}
                      className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="material-icons-outlined text-lg">add_shopping_cart</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <span className="material-icons-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No matching menu items found.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddFoodForm
          onClose={() => setIsModalOpen(false)}
          onFoodAdded={handleFoodAdded}
        />
      </Modal>
    </div>
  );
};

export default Menu;
