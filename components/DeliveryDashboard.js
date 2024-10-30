import React, { useEffect, useState } from 'react';
import AvailableOrders from '@/pages/components/AvailableOrders';
import MyOrders from '@/pages/components/MyOrders';
import Sidebar2 from '@/pages/components/Sidebar2';
import axios from 'axios';
import { useRouter } from 'next/router';

const DeliveryDashboard = ({ setUser }) => {
    const [activeView, setActiveView] = useState('availableOrders');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [validToken, setValidToken] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [assignmentOrder, setAssignmentOrder] = useState([]);
    const [fetchMyOrders, setFetchMyOrders] = useState(true);
    const [totalEarning, setTotalEarning] = useState(0);
    const router = useRouter();
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handelLogout = () => {
        setUser({ value: null });
        if (typeof window !== 'undefined') {
            localStorage.removeItem("thread_aura_token");
        }
        router.push('/login');
    };

    const fetchAvailableOrders = async () => {
        try {
            if (typeof window !== 'undefined') {
                const id = localStorage.getItem("thread_aura__id");
                const response = await axios.post(`/api/deliveryBoy/getInfo`, { id });
                setTotalEarning(response?.data?.orderCompleted?.length);
                setUserInfo(response?.data);
                
                if (response?.data?.assignedOrders) {
                    setAssignmentOrder(response?.data?.assignedOrders);
                }
            }
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };
    const handleAcceptOrder = () => {
        setFetchMyOrders(true); 
    };


    useEffect(() => {
        fetchAvailableOrders(); 
    }, []);

    const renderView = () => {
        const id = typeof window !== 'undefined' ? localStorage.getItem("thread_aura__id") : null;
        switch (activeView) {
            case 'availableOrders':
                return <AvailableOrders  handleAcceptOrder={handleAcceptOrder} assignmentOrder={assignmentOrder} deliveryBoyId={id} />;
            case 'myOrders':
                return <MyOrders  setFetchMyOrders={setFetchMyOrders} fetchMyOrdersDeatils={fetchMyOrders}/>;
            default:
                return <AvailableOrders handleAcceptOrder={handleAcceptOrder} assignmentOrder={assignmentOrder} deliveryBoyId={id} />;
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem("thread_aura_token");

                if (!token) {
                    setValidToken(false);
                    router.push('/login');
                    return;
                }

                try {
                    const response = await axios.post("/api/checkValidToken", { token });
                    if (response.data.isValid) {
                        setValidToken(true);
                    } else {
                        setValidToken(false);
                        router.push('/login');
                    }
                } catch (error) {
                    console.error(error);
                    setValidToken(false);
                    router.push('/login');
                }
            }
        };

        checkToken();
        fetchAvailableOrders();
    }, [router]);

    useEffect(() => {
        if (validToken === false) {
            router.push('/login');
        }
    }, [validToken, router]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar2 totalEarning={totalEarning} handelLogout={handelLogout} setActiveView={setActiveView} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-grow p-4 bg-gray-100 overflow-y-auto relative">
                <button onClick={toggleSidebar} className="md:hidden absolute top-4 left-4 bg-gray-800 text-white p-2 rounded">
                    ☰
                </button>
                <div className='min-h-[100vh]' onClick={() => setSidebarOpen(false)}>
                    {renderView()}
                </div>
            </div>
        </div>
    );
};

export default DeliveryDashboard;
