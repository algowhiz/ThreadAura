import React from 'react'

const Sidebar = ({ setActiveView, isOpen, toggleSidebar }) => {
    return (
        <div className={`fixed md:static inset-y-0 left-0 bg-gray-800 text-white p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 z-20`}>
            <h2 className="text-xl md:text-2xl font-bold mb-6">Admin Panel</h2>
            <ul>
                <li className="mb-4">
                    <button
                        onClick={() => { setActiveView('orders'); toggleSidebar(); }}
                        className="hover:text-blue-400 focus:outline-none"
                    >
                        Orders
                    </button>
                </li>
                <li className="mb-4">
                    <button
                        onClick={() => { setActiveView('products'); toggleSidebar(); }}
                        className="hover:text-blue-400 focus:outline-none"
                    >
                        Products
                    </button>
                </li>
                <li className="mb-4">
                    <button
                        onClick={() => { setActiveView('bestSellers'); toggleSidebar(); }}
                        className="hover:text-blue-400 focus:outline-none"
                    >
                        Active Sales
                    </button>
                </li>
                <li className="mb-4">
                    <button onClick={() => {setActiveView('addProduct'); toggleSidebar();}} className="hover:text-blue-400 focus:outline-none">
                        Add Product
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar