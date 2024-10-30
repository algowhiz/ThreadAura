import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = ({ fetchMyOrdersDeatils }) => {
    const [myOrders, setMyOrders] = useState([]);
    const [orderSteps, setOrderSteps] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingOtp, setLoadingOtp] = useState({});
    const [loadingVerifyOtp, setLoadingVerifyOtp] = useState({});
    const [loadingConfirm, setLoadingConfirm] = useState({});
    const [otp, setOtp] = useState({});

    useEffect(() => {
        const deliveryBoyId = localStorage.getItem('thread_aura__id');
        if (deliveryBoyId) {
            setDeliveryBoyId(deliveryBoyId);
        }
    }, []);
    

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/deliveryBoy/fetchacceptedorders', { deliveryBoyId });
            if (response.status === 200) {
                const orders = response.data;
                setMyOrders(orders);

                const steps = {};
                orders.forEach(order => {
                    steps[order._id] = 1;
                });
                setOrderSteps(steps);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, [fetchMyOrdersDeatils]);

    const handleNextStep = (orderId) => {
        setOrderSteps(prevSteps => ({
            ...prevSteps,
            [orderId]: prevSteps[orderId] + 1
        }));
    };

    const handelSendOtp = async (idx, order) => {
        const userDetails = myOrders[idx];
        const userEmail = userDetails.userId.email;
        const orderId = userDetails._id;

        setLoadingOtp(prev => ({ ...prev, [orderId]: true }));

        try {
            const response = await axios.post('/api/send-otp', {
                email: userEmail,
                isOrderConfirmation: "true",
            });
            toast.success(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoadingOtp(prev => ({ ...prev, [orderId]: false }));
            handleNextStep(order._id);
        }
    };

    const handleOtpChange = (orderId, value) => {
        setOtp(prev => ({ ...prev, [orderId]: value }));
    };

    const handelVerifyOtp = async (orderId) => {
        const userDetails = myOrders.find(order => order._id === orderId);
        const userEmail = userDetails.userId.email;
        const userOtp = otp[orderId];

        setLoadingVerifyOtp(prev => ({ ...prev, [orderId]: true }));

        try {
            const response = await axios.post('/api/verify-otp', { email: userEmail, otp: userOtp });
            toast.success(response.data.message);
            handleNextStep(orderId);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoadingVerifyOtp(prev => ({ ...prev, [orderId]: false }));
        }
    };

    const handleConfirmOrder = async (orderId) => {
        setLoadingConfirm(prev => ({ ...prev, [orderId]: true }));

        try {
            const response = await axios.put('/api/deliveryBoy/completeOrder', {
                deliveryBoyId,
                orderId,
            });
            toast.success(response.data.message);
            fetchMyOrders();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to confirm order. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoadingConfirm(prev => ({ ...prev, [orderId]: false }));
        }
    };

    const renderStepContent = (order, idx, step) => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h4>Step 1: Send OTP</h4>
                        <button
                            onClick={() => handelSendOtp(idx, order)}
                            className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${loadingOtp[order._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loadingOtp[order._id]}
                        >
                            {loadingOtp[order._id] ? (
                                <div className="flex items-center">
                                    <div className="loader border-t-4 border-white rounded-full w-4 h-4 animate-spin mr-2"></div>
                                    Sending...
                                </div>
                            ) : (
                                'Send OTP'
                            )}
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h4>Step 2: Verify OTP</h4>
                        <div className='flex gap-4 items-center'>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="input-field rounded-md px-3 py-2 border-2 border-gray-400"
                                onChange={(e) => handleOtpChange(order._id, e.target.value)}
                            />
                            <button
                                onClick={() => handelVerifyOtp(order._id)}
                                className={`bg-blue-500 text-white px-3 py-2 rounded ${loadingVerifyOtp[order._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loadingVerifyOtp[order._id]}
                            >
                                {loadingVerifyOtp[order._id] ? (
                                    <div className="flex items-center">
                                        <div className="loader border-t-4 border-white rounded-full w-4 h-4 animate-spin mr-2"></div>
                                        Verifying...
                                    </div>
                                ) : (
                                    'Verify OTP'
                                )}
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h4>Step 3: Confirm Order</h4>
                        <button
                            onClick={() => handleConfirmOrder(order._id)}
                            className={`bg-green-500 text-white px-4 py-2 rounded mt-2 ${loadingConfirm[order._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loadingConfirm[order._id]}
                        >
                            {loadingConfirm[order._id] ? (
                                <div className="flex items-center">
                                    <div className="loader border-t-4 border-white rounded-full w-4 h-4 animate-spin mr-2"></div>
                                    Confirming...
                                </div>
                            ) : (
                                'Confirm Order'
                            )}
                        </button>
                    </div>
                );
            default:
                return <p>Order confirmed!</p>;
        }
    };

    return (
        <div className='mt-10 md:mt-2'>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : myOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-xl font-semibold text-gray-700">No orders found!</p>
                </div>
            ) : (
                <ul>
                    <ToastContainer position="top-right" autoClose={5000} />
                    {myOrders.map((order, idx) => (
                        <li key={idx} className="bg-white p-4 rounded shadow mb-4">
                            <p>Order ID: {order.orderId}</p>
                            <p>Customer: {order?.userId?.name}</p>
                            <p>Delivery Address: {order.address}</p>
                            <p>Status: {order.status}</p>
                            <div className="mt-4">
                                {renderStepContent(order, idx, orderSteps[order._id])}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrders;
