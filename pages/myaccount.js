import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryForm from './components/DeliveryForm'; // Reusing the form component

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
        const userId = localStorage.getItem('thread_aura__id'); // Assuming user ID is stored in localStorage
        const response = await axios.post(`/api/user/update`, {userId,...formValues}); // Updating user data
        if (response.status === 200) {
          console.log(response);
          
            alert('Your information has been updated successfully!');
        } else {
            alert('Failed to update your information.');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        alert('There was an error updating your information.');
    }
};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('thread_aura__id'); // Assuming user ID is stored in localStorage
        if (userId) {
          const response = await axios.get(`/api/user/${userId}`);
          if (response.status === 200) {
            const userData = response.data;
            setFormValues({
              name: userData.name || '',
              email: userData.email || '',
              address: userData.address || '',
              phone: userData.phone || '',
              city: userData.city || '',
              state: userData.state || '',
              pincode: userData.pincode || '',
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-2xl font-bold text-center mb-5">My Account</h2>
      
      {/* Reusing the DeliveryForm component */}
      <DeliveryForm
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleInputBlur={() => {}} // No validation needed on blur in this case
        formValid={true} // No validation required for now, assuming form is valid
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
  );
};

export default MyAccount;
