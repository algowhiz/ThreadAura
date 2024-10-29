import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DiliveryForm from './components/DeliveryForm';
import OrderSummary from './components/OrderSummary';
import PaymentSection from './components/PaymentSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkouts = ({ cart, subTotal, clearCart ,user}) => {
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

  useEffect(() => {
    const token = localStorage.getItem("thread_aura_token");

    const checkToken = async () => {
        try {
            const response = await axios.post("/api/checkValidToken", { token });

            if (response.data.isValid) {
                setValidToken(true);
            } else {
                setValidToken(false);
                toast.error("Error validating token! Redirecting to login...");
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            }
        } catch (error) {
            console.error("Error validating token", error);
            setValidToken(false);
            toast.error("Error validating token! Redirecting to login...");
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
    };

    if (token) {
        checkToken();
    } else {
        setValidToken(false);
        toast.error("Error validating token! Redirecting to login...");
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    }
}, [router,user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const allFieldsFilled = Object.values(formValues).every((value) => value.trim() !== "");
    setFormValid(allFieldsFilled);
  };

  const handleInputBlur = () => {
    validateForm();
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('thread_aura__id'); 
        if (userId) {
          const response = await axios.get(`/api/user/${userId}`);
          if (response.status === 200) {
            const userData = response?.data?.user;
            setFormValues({
              name: userData?.name || '',
              email: userData?.email || '',
              address: userData?.address || '',
              phone: userData?.phone || '',
              city: userData?.city || '',
              state: userData?.state || '',
              pincode: userData?.pincode || '',
            });         
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    validateForm(); // Runs after formValues have been updated
  }, [formValues]);

  useEffect(() => {
    const { buyNow } = router.query;

    if (buyNow) {
      const orderDetails = JSON.parse(localStorage.getItem('buyNowOrder'));
      setOrder(orderDetails ? [orderDetails] : []); // Single item
    } else {
      const orderArray = Object.entries(cart).map(([key, item]) => ({
        ...item,
        id: key,
      }));
      setOrder(orderArray); // Cart items
    }
  }, [router.query, cart]);

  // Callback for handling Google Pay payment success
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
      pincode:formValues?.pincode.length == 6,
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
                rtl={false}
                draggable
                newestOnTop={false}
            />
      <DiliveryForm
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleInputBlur={handleInputBlur}
        formValid={formValid}
        setFormValid={setFormValid}
        validateForm={validateForm}
      />

      <OrderSummary order={order} buyNow={!!router.query.buyNow} />

      <PaymentSection
        formValid={formValid}
        handleGooglePaySuccess={handleGooglePaySuccess}
        order={order}
        subTotal={subTotal}
        buyNow={!!router.query.buyNow}
      />
    </div>
  );
};

export default Checkouts;
