import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import DiliveryForm from './components/DeliveryForm';
import OrderSummary from './components/OrderSummary';
import PaymentSection from './components/PaymentSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeliveryForm from './components/DeliveryForm';

const Checkouts = ({ cart, subTotal, clearCart, user }) => {
  const router = useRouter();
  const [order, setOrder] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [formValid, setFormValid] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true); // Set to true initially
  const [dataLoaded, setDataLoaded] = useState(false); // Track if data is loaded

  // Validate user token on mount
  useEffect(() => {
    const token = localStorage.getItem("thread_aura_token");

    const checkToken = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/checkValidToken", { token });
        setValidToken(response.data.isValid);

        if (!response.data.isValid) {
          toast.error("Error validating token! Redirecting to login...");
          setTimeout(() => router.push('/login'), 3000);
        }
      } catch (error) {
        console.error("Error validating token", error);
        toast.error("Error validating token! Redirecting to login...");
        setTimeout(() => router.push('/login'), 3000);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      checkToken();
    } else {
      toast.error("Error validating token! Redirecting to login...");
      setTimeout(() => router.push('/login'), 3000);
    }
  }, [router]);

  // Fetch user data to pre-fill the form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('thread_aura__id');
        if (userId) {
          const response = await axios.get(`/api/user/${userId}`);
          if (response.status === 200) {
            const userData = response.data.user;
            setFormValues({
              name: userData?.name || '',
              email: userData?.email || '',
              address: userData?.address || '',
              phone: userData?.phone || '',
              city: userData?.city || '',
              state: userData?.state || '',
              pincode: userData?.pincode || '',
            });
            setFormValid(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Set order details based on cart or buyNow query
  useEffect(() => {
    const { buyNow } = router.query;

    const loadOrderData = () => {
      const orderArray = buyNow 
        ? [JSON.parse(localStorage.getItem('buyNowOrder'))]
        : Object.entries(cart).map(([key, item]) => ({
            ...item,
            id: key,
          }));

      setOrder(orderArray);
      setDataLoaded(true); // Data is now loaded
    };

    loadOrderData();
  }, [router.query, cart]);

  // Form validation logic
  const validateForm = useCallback(() => {
    const allFieldsFilled = Object.values(formValues).every(value => value.trim() !== "");
    const isPincodeValid = typeof formValues.pincode === 'string' && formValues.pincode.trim().length === 6;
    setFormValid(allFieldsFilled && isPincodeValid);
  }, [formValues]);

  // Handle Google Pay success (remains unchanged)
  const handleGooglePaySuccess = async (paymentRequest) => {
    const paymentData = paymentRequest?.paymentMethodData;
    const paymentDetails = {
      cardNetwork: paymentData?.info?.cardNetwork,
      cardDetails: paymentData?.info?.cardDetails,
      token: paymentData?.tokenizationData?.token,
    };
    // Store payment details
    setPaymentDetails(paymentDetails);

    // Now create the order after successful payment
    const orderId = `ORDER_${Date.now()}`;
    const userId = localStorage.getItem('thread_aura__id');

    const orderData = {
      userId,
      orderId,
      pincode: formValues?.pincode,
      products: router.query.buyNow
        ? order.map((item) => ({
          productId: item?.productId,
          quantity: item?.quantity,
        }))
        : order.map((item) => ({
          productId: item._id,
          quantity: item.qty,
        })),
      address: `${formValues?.address}, ${formValues?.city}, ${formValues?.state} - ${formValues?.pincode}`,
      amount: router.query.buyNow ? order[0]?.price : subTotal,
      status: 'Pending',
      paymentDetails,
    };

    try {
      const response = await axios.post('/api/order', orderData);
      console.log(orderData);
      
      if (response.status === 201) {
        clearCart();
      } else {
        console.error('Failed to create order:', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="container m-auto p-3">
      <div className="font-bold text-3xl my-8 text-center">Checkouts</div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <DeliveryForm
            formValues={formValues}
            formValid={formValid}
            validateForm={validateForm}
          />
          <OrderSummary order={order} buyNow={!!router.query.buyNow} />
          <PaymentSection
            formValid={formValid}
            handleGooglePaySuccess={handleGooglePaySuccess}
            order={order}
            subTotal={subTotal}
            buyNow={!!router.query.buyNow}
            isButtonDisabled={!dataLoaded || !formValid} // Disable button if data is not loaded or form is invalid
          />
        </>
      )}
    </div>
  );
};

export default Checkouts;
