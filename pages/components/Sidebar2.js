import React from 'react';

const Sidebar = ({ setActiveView, isOpen, toggleSidebar, handelLogout }) => (
    <div className={`fixed md:static inset-y-0 left-0 bg-gray-800 text-white p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 z-20`}>
        <h2 className="text-xl md:text-2xl font-bold mb-6">Delivery Panel</h2>
        <ul>
            <li className="mb-4">
                <button
                    onClick={() => { setActiveView('availableOrders'); toggleSidebar(); }}
                    className="hover:text-blue-400 focus:outline-none"
                >
                    Available Orders
                </button>
            </li>
            <li className="mb-4">
                <button
                    onClick={() => { setActiveView('myOrders'); toggleSidebar(); }}
                    className="hover:text-blue-400 focus:outline-none"
                >
                    Order Stack
                </button>
            </li>
            <li className="mb-4">
                <button onClick={() => { handelLogout(); }} className="hover:text-blue-400 focus:outline-none">
                    Logout
                </button>
            </li>
        </ul>
    </div>
);

export default Sidebar;
