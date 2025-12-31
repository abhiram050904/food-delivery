import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8080/orders', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.put(`http://localhost:8080/orders/${orderId}/status?status=${newStatus}`, {}, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      fetchOrders(); // Refresh the list
    } catch (err) {
      alert('Failed to update order status');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'CREATED': 'bg-blue-100 text-blue-800',
      'CONFIRMED': 'bg-green-100 text-green-800',
      'PREPARING': 'bg-yellow-100 text-yellow-800',
      'OUT_FOR_DELIVERY': 'bg-purple-100 text-purple-800',
      'DELIVERED': 'bg-gray-100 text-gray-800',
      'CANCELLED': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = filter === 'ALL' 
    ? orders 
    : orders.filter(order => order.orderStatus === filter);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-md text-sm ${filter === 'ALL' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('CONFIRMED')}
            className={`px-3 py-1 rounded-md text-sm ${filter === 'CONFIRMED' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('PREPARING')}
            className={`px-3 py-1 rounded-md text-sm ${filter === 'PREPARING' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Preparing
          </button>
          <button
            onClick={() => setFilter('OUT_FOR_DELIVERY')}
            className={`px-3 py-1 rounded-md text-sm ${filter === 'OUT_FOR_DELIVERY' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Out for Delivery
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No orders found</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>{order.email}</div>
                      <div className="text-xs text-gray-400">{order.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.orderItems.length} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.paymentStatus === 'COMPLETED' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="CREATED">Created</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="PREPARING">Preparing</option>
                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
