import React from 'react';

const Cart = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-[#1b0e0e] dark:text-[#fcf8f8]">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e7e8] dark:border-b-[#3a2e2e] bg-[#fcf8f8] dark:bg-[#211111] px-10 py-3">
                <div className="flex items-center gap-4 text-[#1b0e0e] dark:text-white">
                    <div className="size-6 text-primary">
                        <span className="material-symbols-outlined text-3xl">lunch_dining</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">FoodDelivery</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <nav className="flex items-center gap-9 hidden md:flex">
                        <a className="text-[#1b0e0e] dark:text-[#e0dada] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Home</a>
                        <a className="text-[#1b0e0e] dark:text-[#e0dada] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Menu</a>
                        <a className="text-[#1b0e0e] dark:text-[#e0dada] text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Offers</a>
                    </nav>
                    <div className="flex gap-2">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-[#d41f27] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
                            <span className="truncate">Sign In</span>
                        </button>
                        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f3e7e8] dark:bg-[#3a2e2e] text-[#1b0e0e] dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 relative group">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shopping_cart</span>
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">3</span>
                        </button>
                    </div>
                </div>
            </header>
            {/* Main Content */}
            <main className="flex-grow layout-container flex flex-col items-center py-8 px-4 md:px-10 lg:px-20 xl:px-40 w-full">
                <div className="w-full max-w-[1200px] flex flex-col gap-6">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 text-sm">
                        <a className="text-[#994d51] dark:text-[#e08f93] font-medium leading-normal hover:underline" href="#">Home</a>
                        <span className="text-[#994d51] dark:text-[#e08f93] font-medium leading-normal">/</span>
                        <a className="text-[#994d51] dark:text-[#e08f93] font-medium leading-normal hover:underline" href="#">Menu</a>
                        <span className="text-[#994d51] dark:text-[#e08f93] font-medium leading-normal">/</span>
                        <span className="text-[#1b0e0e] dark:text-white font-medium leading-normal">Cart</span>
                    </div>
                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between gap-3 pb-2 border-b border-[#f3e7e8] dark:border-[#3a2e2e]">
                        <h1 className="text-[#1b0e0e] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Your Order from Burger King</h1>
                        <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline self-end" href="#">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Menu
                        </a>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-4">
                        {/* Left Column: Cart Items */}
                        <div className="flex-1 w-full flex flex-col gap-6">
                            {/* Item 1 */}
                            <div className="flex gap-4 p-4 bg-white dark:bg-[#2a1a1a] rounded-xl shadow-sm border border-[#f3e7e8] dark:border-[#3a2e2e]">
                                <div className="shrink-0 bg-center bg-no-repeat bg-cover rounded-lg size-[80px] md:size-[100px]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKd6E_8tYXmcISTOObujFFyXUNs7mLiAiPjXpg0lvFHfbIjuLr5heauaDWW-sTPqpd5L2_Ba1b3n2OCnHHuWC_93-mwUHxINYb3V4TY6NzsoGm-LqA3TPwx4tT0CkBgjkS-k4iUQxZkMxcGkJcRnm-sHY5Y9mI1-Ill86ygvXxFfWKRA7Dch8gZa3RfenzOobPHINQSBEbGZWzifl8B-5-392b_wgABmuPdpnsFr06UM2q3qQpyxccm7RaYE2DlyqXMeXiy_NwYik")' }}></div>
                                <div className="flex flex-1 flex-col justify-between">
                                    {/* ... item details */}
                                </div>
                            </div>
                            {/* Other items omitted for brevity */}
                        </div>
                        {/* Right Column: Order Summary */}
                        <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24">
                            {/* ... order summary */}
                        </div>
                    </div>
                </div>
            </main>
            {/* Footer */}
            <footer className="mt-auto border-t border-[#f3e7e8] dark:border-[#3a2e2e] bg-white dark:bg-[#211111] py-8">
                {/* ... footer content */}
            </footer>
        </div>
    );
};

export default Cart;
