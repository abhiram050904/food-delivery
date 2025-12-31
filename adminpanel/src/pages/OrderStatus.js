import React from 'react';

const OrderStatus = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e7e8] dark:border-b-[#3a2a2a] bg-surface-light dark:bg-surface-dark px-10 py-3 shadow-sm">
                <div className="flex items-center gap-4 text-text-main-light dark:text-text-main-dark">
                    <div className="size-8 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">local_pizza</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">FoodDelivery</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <nav className="hidden md:flex items-center gap-9">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Home</a>
                        <a className="text-sm font-medium text-primary" href="#">Orders</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Profile</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Cart</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-md hover:bg-red-600 transition-colors">
                            <span className="truncate">Log Out</span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white dark:border-gray-700 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDieiXPa_l6TSwc-bbysdSorleCHMEpbmSMNBOkqUZ-W6i5etadAbwlyiFSXQ7NYRtEOMdoUBYmMWCKUim1GyB_E0Yj2WEPpXYVSejRy1w_TvsyiIU-aljZf0BS6rdNSSM7D3baBYjleP1IwQvuZWSfwPhmreB0kDjzYqFQ577a6XviDbjz5M3fFsDrr_606J14R4EHZH4iUeEOX0ND06hWT93-LVaPRCbdyPJL-hkDUCIFPIZh4r12TUSIpuWGDDo0welcOs5ku4")' }}></div>
                    </div>
                </div>
            </header>
            <main className="layout-container flex flex-col min-h-screen">
                <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN: Tracking & Status */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* ... tracking and status content */}
                        </div>
                        {/* RIGHT COLUMN: Order Summary */}
                        <div className="lg:w-1/3 flex flex-col gap-6">
                            {/* ... order summary content */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderStatus;
