import React from 'react';

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center md:hidden">
        <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500">
          <span className="material-icons-outlined">menu</span>
        </button>
      </div>
      <div className="flex-1 max-w-lg mx-auto md:mx-0 hidden md:flex">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons-outlined text-gray-400 text-lg">search</span>
          </span>
          <input
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md leading-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search orders, dishes, or users..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="material-icons-outlined">notifications</span>
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
        </button>
        <button
          className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          <span className="material-icons-outlined dark:hidden">dark_mode</span>
          <span className="material-icons-outlined hidden dark:block">light_mode</span>
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Abhiram</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
          </div>
          <img
            alt="Admin Avatar"
            className="h-9 w-9 rounded-full object-cover border-2 border-orange-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCR-G-f_Pjw0O84j1pkaM2L9jqdA8hXDtwzXSod9xa6coL3aHuyAEUIXwWG3cGc-dlaqUwfRUdh-KAQm1cTUPvpHIxsYj_sOFrU7946b01rmWhOhRPvIUfmFMK5TvkIHhGhnBnt-pBOyWT6_Rxjzx0oyAPX2z-QXDJvpAIXWp6HkTUZQemXhQcfKbH7ppd8nEuMrXonj2ZYb4xHAmMiNL3G_iR2rS6dDb8IjIQ2xb-S5MrI6bV33HYuIL_QMoGKS2NKfVPEfc-0XQ"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
