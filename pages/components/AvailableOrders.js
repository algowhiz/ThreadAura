import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvailableOrders = ({ assignmentOrder, deliveryBoyId, handleAcceptOrder }) => {
    const [orders, setOrders] = useState([]);
    const [acceptedOrders, setAcceptedOrders] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [click,setClick] = useState(false);
    useEffect(() => {
        const fetchOrderInfo = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/api/deliveryBoy/fetchByIds', { ids: assignmentOrder });
                console.log(response);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders", error);
                toast.error("Failed to fetch orders.");
            } finally {
                setLoading(false);
            }
        };

        if (assignmentOrder.length > 0) {
            fetchOrderInfo();
        } else {
            setOrders([]);
            setLoading(false);
        }
    }, [assignmentOrder,click]);

    const handleAccept = async (orderId) => {
        try {
            const response = await axios.post(`/api/deliveryBoy/accept`, {
                orderId,
                deliveryBoyId,
            });
            handleAcceptOrder();
            toast.success(response.data.message);
            setAcceptedOrders((prevAcceptedOrders) => new Set(prevAcceptedOrders).add(orderId));
            setClick(true);
        } catch (error) {
            console.error("Error accepting order", error);
            toast.error("Error accepting order. Please try again.");
        }
    };

    const handleReject = async (orderId) => {
        try {
            await axios.post(`/api/deliveryBoy/reject`, {
                orderId,
                deliveryBoyId,
            });
            toast.info("Order rejected!");
            setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
            setClick(true);
        } catch (error) {
            console.error("Error rejecting order", error);
            toast.error("Error rejecting order. Please try again.");
        }
    };

    return (
        <div className='mt-10 md:mt-2'>
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Available Orders</h2>
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : orders.length > 0 ? (
                <ul>
                    {orders
                        .filter(order => !acceptedOrders.has(order._id)) 
                        .map((order, idx) => (
                            <li key={idx} className="bg-white p-4 rounded shadow mb-4">
                                <p>Order ID: {order.orderId}</p>
                                <p>Customer: {order.userId.name}</p>
                                <p>Delivery Address: {order.address}</p>
                                <button onClick={() => handleAccept(order._id)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                                    Accept
                                </button>
                                <button onClick={() => handleReject(order._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Reject
                                </button>
                            </li>
                        ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-xl font-semibold text-gray-700">No available orders.</p>
                </div>
            )}
        </div>
    );
};

export default AvailableOrders;
