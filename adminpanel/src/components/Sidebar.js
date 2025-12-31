import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <span className="material-icons-outlined text-orange-500 mr-2 text-3xl">lunch_dining</span>
          <span className="text-xl font-bold tracking-tight">FoodAdmin</span>
        </div>
        <nav className="mt-6 px-3 space-y-1">
          <NavLink to="/" end className={({ isActive }) =>
            `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
              isActive ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-orange-500'
            }`
          }>
            <span className="material-icons-outlined mr-3 text-xl">dashboard</span>
            Dashboard
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) =>
            `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
              isActive ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-orange-500'
            }`
          }>
            <span className="material-icons-outlined mr-3 text-xl">receipt_long</span>
            Orders
            <span className="ml-auto bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 py-0.5 px-2 rounded-full text-xs font-semibold">12</span>
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) =>
            `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
              isActive ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-orange-500'
            }`
          }>
            <span className="material-icons-outlined mr-3 text-xl">restaurant_menu</span>
            Menu Management
          </NavLink>
          <NavLink to="/users" className={({ isActive }) =>
            `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
              isActive ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-orange-500'
            }`
          }>
            <span className="material-icons-outlined mr-3 text-xl">people</span>
            Users
          </NavLink>
          <a href="#" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-orange-500 transition-colors">
            <span className="material-icons-outlined mr-3 text-xl">delivery_dining</span>
            Drivers
          </a>
          <a href="#" className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-orange-500 transition-colors">
            <span className="material-icons-outlined mr-3 text-xl">analytics</span>
            Analytics
          </a>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
          <span className="material-icons-outlined mr-3">settings</span>
          Settings
        </a>
        <button
          onClick={() => {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }}
          className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
        >
          <span className="material-icons-outlined mr-3">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
