import React, { useState } from 'react';
import axios from 'axios';

const AddFoodForm = ({ onClose, onFoodAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !description || !price || !category || !image) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    const foodData = { name, description, price: parseFloat(price), category };
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image);

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:8080/foods', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      onFoodAdded(response.data);
      onClose();
    } catch (err) {
      setError('Failed to add food item. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add New Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-gray-700" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-gray-700"></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Price</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-gray-700" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Category</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-gray-700" />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Image</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end pt-4">
          <button type="button" onClick={onClose} className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodForm;
