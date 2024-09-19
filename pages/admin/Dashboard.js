import React, { useState } from 'react';
import Products from '../components/Products';
import Orders from '../components/Orders';
import Sidebar from '../components/Sidebar';
import BestSeller from '../components/BestSeller';
import AddProduct from '../components/AddProduct';

const dashboard = () => {
    const [activeView, setActiveView] = useState('orders');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const renderView = () => {
        switch (activeView) {
            case 'orders':
                return <Orders />;
            case 'products':
                return <Products />;
            case 'bestSellers':
                return <BestSeller />;
            case 'addProduct':   
                return <AddProduct />;
            default:
                return <Orders />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar setActiveView={setActiveView} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-grow p-4  bg-gray-100 overflow-y-auto relative" >
                <button
                    onClick={toggleSidebar}
                    className="md:hidden absolute top-4 left-4 bg-gray-800 text-white p-2 rounded focus:outline-none"
                >
                    ☰
                </button>
                <div onClick={() => setSidebarOpen(false)}>
                    {renderView()}
                </div>

            </div>
        </div>
    );
};

export default dashboard;