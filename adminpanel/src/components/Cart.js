import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 border border-gray-300 rounded-md text-gray-600 dark:text-gray-400"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border border-gray-300 rounded-md text-gray-600 dark:text-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold text-gray-900 dark:text-white">Total: ${getTotalPrice()}</p>
            <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
