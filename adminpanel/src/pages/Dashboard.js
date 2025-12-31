import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Welcome back, here's what's happening with your restaurant today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <span className="material-icons-outlined mr-2 text-lg">add</span>
            New Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">$12,426</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
              <span className="material-icons-outlined">payments</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
              <span className="material-icons-outlined text-sm mr-1">trending_up</span>
              12.5%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last week</span>
          </div>
        </div>
        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,452</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <span className="material-icons-outlined">shopping_bag</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
              <span className="material-icons-outlined text-sm mr-1">trending_up</span>
              8.2%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last week</span>
          </div>
        </div>
        {/* Active Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8,740</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
              <span className="material-icons-outlined">group</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 dark:text-red-400 font-medium flex items-center">
              <span className="material-icons-outlined text-sm mr-1">trending_down</span>
              2.1%
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last week</span>
          </div>
        </div>
        {/* Avg. Delivery Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Delivery Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">24m 30s</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400">
              <span className="material-icons-outlined">moped</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
              <span className="material-icons-outlined text-sm mr-1">trending_down</span>
              45s
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">faster than usual</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
