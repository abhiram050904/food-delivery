import React from 'react';

const Dashboard = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-200">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-solid border-[#f3e7e8] dark:border-[#3a2525] bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm">
                <div className="px-4 md:px-10 py-3 flex items-center justify-between mx-auto max-w-[1440px]">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 text-primary">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">lunch_dining</span>
                        </div>
                        <h2 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">FoodDelivery</h2>
                    </div>
                    {/* Location & Auth Section */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3a2525] px-3 py-2 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            <span className="text-sm font-medium leading-normal whitespace-nowrap">Deliver to: <span className="font-bold">New York, NY</span></span>
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="hidden md:flex h-10 px-4 items-center justify-center rounded-lg bg-surface-light dark:bg-surface-dark border border-[#f3e7e8] dark:border-[#3a2525] text-text-main dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#3a2525] transition-colors">
                                Sign In
                            </button>
                            <button className="h-10 px-4 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-sm">
                                Sign Up
                            </button>
                            <button className="relative h-10 w-10 flex items-center justify-center rounded-lg bg-surface-light dark:bg-surface-dark border border-[#f3e7e8] dark:border-[#3a2525] text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-[#3a2525] transition-colors">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">2</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex flex-col w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative w-full">
                    <div className="relative h-[500px] w-full bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkpou8kWexQ4MQOjKGiRnVP_36GrJM8cU7_HUkm9Hy26YAOlARABhugKTDatXqz-5KrTyYk3QMcWchCs0I9H-zxzK6EROgQcKWSlTPkwGjeXZ9Glg-1vhgQPqcDq5w8mGcjSddT7gD8rC_2s_5aTFrL5gSj2PnS_kAhWyWp3mF0ZJIPPVp2m8B6mZqXq39cyAXl7J-NWfLu6ZTNCOATg_IlZxXtXH6uJRXOFMDBzrePsq3v8DOzgcPgzmWjKAFb9E2pnsDH50A0jk")' }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4 max-w-3xl drop-shadow-lg">
                                Delicious food, delivered right to your door
                            </h1>
                            <h2 className="text-gray-100 text-lg md:text-xl font-medium mb-8 drop-shadow-md">
                                Order from the best restaurants near you
                            </h2>
                            {/* Search Bar */}
                            <div className="w-full max-w-2xl bg-white dark:bg-surface-dark p-2 rounded-xl shadow-xl flex flex-col md:flex-row gap-2">
                                <div className="flex-1 flex items-center px-3 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700">
                                    <span className="material-symbols-outlined text-primary mr-3">search</span>
                                    <input className="w-full h-12 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder-gray-400 text-base" placeholder="Search for restaurant, cuisine or a dish" type="text" />
                                </div>
                                <button className="h-12 px-8 bg-primary hover:bg-red-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                    Find Food
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Categories Carousel */}
                <section className="py-10 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-text-main dark:text-white">Explore Categories</h3>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                            </button>
                            <button className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x">
                        {/* Category Item: Pizza */}
                        <a className="snap-start flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer" href="#">
                            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden group-hover:ring-4 ring-primary/20 transition-all duration-300">
                                <div className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQTwGnoHTolvMVatPFmCgdlh6G834bJqF86qcm2CEX2b2tdp5viiWYN4P5tCh2R5VYlydffPDN7R0xpQTUe6Ms8xX8_IgujM36tmsL5IQrKJumCBOf_mPt8Sz6qDLkNXoz0kEcLXcwcY1t1nfZONwKzLG23U27NAODbgdx7-W8OznvK8dscnzBt3n-lSR0x66KgH9kU9cHbBKP8YCyUdCx9oUmqY1TPOa9F5M6st_VMNjyv4qIZWmxj59grZ67uPLa46IxbP7JHZE")' }}></div>
                            </div>
                            <span className="font-bold text-sm text-text-main dark:text-gray-200">Pizza</span>
                        </a>
                        {/* Other categories omitted for brevity */}
                    </div>
                </section>
                {/* Featured Restaurants Section */}
                <section className="py-10 px-4 md:px-10 max-w-[1440px] mx-auto w-full bg-surface-light dark:bg-surface-dark rounded-xl my-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-1">Top Rated Near You</h3>
                            <p className="text-text-muted dark:text-gray-400">The best local spots as voted by you</p>
                        </div>
                        <a className="text-primary font-bold hover:underline flex items-center" href="#">View all <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span></a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Restaurant Cards omitted for brevity */}
                    </div>
                </section>
                {/* ... more sections ... */}
            </main>
        </div>
    );
};

export default Dashboard;
