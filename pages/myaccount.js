import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryForm from './components/DeliveryForm'; // Reusing the form component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [activeDropdown, setActiveDropdown] = useState("deliveryDetails"); // Track the active dropdown
  const [orderCount, setOrderCount] = useState(0); // Track user's total orders

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails({
      ...passwordDetails,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem('thread_aura__id');
      const response = await axios.post(`/api/user/update`, { userId, ...formValues });
      if (response.status === 200) {
        console.log(response);
        toast.success("Your information has been updated successfully!");
      } else {
        toast.error("Failed to update your information.");
      }
    } catch (error) {
      toast.error("There was an error updating your information.");
    }
  };

  const handleChangePassword = async () => {
    if (passwordDetails?.newPassword !== passwordDetails?.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userId = localStorage.getItem('thread_aura__id');
      const response = await axios.post(`/api/user/change-password`, {
        userId,
        currentPassword: passwordDetails?.currentPassword,
        newPassword: passwordDetails?.newPassword
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!");
      } else {
        toast.error("Passwords do not match!");
      }
    } catch (error) {
      toast.error("Passwords do not match!");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('thread_aura__id');
        if (userId) {
          const response = await axios.get(`/api/user/${userId}`);

          setOrderCount(response?.data?.orderCnt ? response?.data?.orderCnt : 0);
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
          }
        }
      } catch (error) {
      }
    };

    const fetchOrderCount = async () => {
      try {
        const userId = localStorage.getItem('thread_aura__id');
        if (userId) {
          const response = await axios.get(`/api/orders/count/${userId}`);
          if (response.status === 200) {
            setOrderCount(response?.data?.orderCount);
          }
        }
      } catch (error) {
      }
    };

    fetchUserData();
    fetchOrderCount();
  }, []);

  const toggleDropdown = (section) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg  max-w-2xl">
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        newestOnTop={false}
      />
      <div className="my-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg w-full text-left"
          onClick={() => toggleDropdown('deliveryDetails')}
        >
          My Account
        </button>
        {activeDropdown === 'deliveryDetails' && (
          <div className="mt-2 p-4 bg-gray-100 rounded-lg">
            <DeliveryForm
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleInputBlur={() => { }}
              formValid={true}
            />

            <div className="text-center mt-6">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                onClick={handleUpdate}
              >
                Update Information
              </button>
            </div>
          </div>
        )}
      </div>


      <div className="my-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg w-full text-left"
          onClick={() => toggleDropdown('changePassword')}
        >
          Change Password
        </button>
        {activeDropdown === 'changePassword' && (
          <div className="mt-2 p-4 bg-gray-100 rounded-lg">
            <label className="block mb-2">
              Current Password:
              <input
                type="password"
                name="currentPassword"
                className="block w-full mt-1 p-2 border rounded"
                onChange={handlePasswordChange}
              />
            </label>
            <label className="block mb-2">
              New Password:
              <input
                type="password"
                name="newPassword"
                className="block w-full mt-1 p-2 border rounded"
                onChange={handlePasswordChange}
              />
            </label>
            <label className="block mb-2">
              Confirm New Password:
              <input
                type="password"
                name="confirmPassword"
                className="block w-full mt-1 p-2 border rounded"
                onChange={handlePasswordChange}
              />
            </label>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mt-3"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        )}
      </div>

      <div className="my-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg w-full text-left"
          onClick={() => toggleDropdown('orders')}
        >
          Total Orders You've Made
        </button>
        {activeDropdown === 'orders' && (
          <div className="mt-2 p-4 bg-gray-100 rounded-lg">
            {orderCount > 20 ? (
              <p>Wow! You have bought <strong>{orderCount}</strong> orders. Are you starting a shopping empire? 🏰🛍️</p>
            ) : orderCount > 5 ? (
              <p>Nice job! You have <strong>{orderCount}</strong> orders. Shopping is clearly your cardio! 🏃‍♂️💨</p>
            ) : orderCount > 0 ? (
              <p>You have bought <strong>{orderCount}</strong> orders. Keep it up! Every purchase counts! 👍</p>
            ) : (
              <p>You have no orders yet. It's time to go shopping! 🛒 Maybe grab something shiny? ✨</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyAccount;
