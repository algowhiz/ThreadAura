import React, { useEffect, useState } from 'react';
import Products from '@/pages/components/Products';
import Orders from '@/pages/components/Orders';
import Sidebar from '@/pages/components/Sidebar';
import BestSeller from '@/pages/components/BestSeller';
import AddProduct from '@/pages/components/AddProduct';
import axios from 'axios';
import { useRouter } from 'next/router';



const AdminDashboard = ({setUser}) => {

    const [activeView, setActiveView] = useState('orders');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [validToken, setValidToken] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handelLogout = () => {
        setUser({ value: null });
        localStorage.removeItem("thread_aura_token");
        localStorage.removeItem("thread_aura__id");
        router.push('/login');
    }

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

    useEffect(() => {
        const token = localStorage.getItem("thread_aura_token");

        const checkToken = async () => {
            try {
                const response = await axios.post("/api/checkValidToken", {
                    token: token,
                });

                if (response.data.isValid) {
                    console.log("Token is valid");
                    setValidToken(true);
                } else {
                    console.log("Token is invalid or expired");
                    setValidToken(false);
                    router.push('/login');
                }
            } catch (error) {
                console.error("Error validating token", error);
                setValidToken(false);
                router.push('/login');
            }
        };

        checkToken();
    }, [router]);


    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar handelLogout={handelLogout} setActiveView={setActiveView} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-grow p-4  bg-gray-100 overflow-y-auto relative">
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
    )
}

export default AdminDashboard