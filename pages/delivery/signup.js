import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    pincode: ''
  });
  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    if (localStorage.getItem('thread_aura_token')) {
      router.push('/delivery/landingpage');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Check pincode availability
  const checkPincodeAvailability = async () => {
    try {
      const response = await axios.post('/api/deliveryBoy/checkPincode', {
        pincode: formData.pincode
      });
      const { available, message } = response.data;
      setIsPincodeValid(available);
      toast.info(message);
    } catch (err) {
      toast.error('Error checking pincode availability');
    }
  };

  // Send OTP
  const sendOtp = async () => {
    if (!formData.email) {
      toast.error('Please enter your email first.');
      return;
    }
    setLoadingOtp(true);
    try {
      const response = await axios.post('/api/send-otp', {
        email: formData.email,
        isDeliveryBoy: "true",
      });
      setIsOtpSent(true);
      setShowOtpModal(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoadingOtp(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    try {
      const response = await axios.post('/api/verify-otp', { email: formData.email, otp });
      setIsVerified(true);
      setShowOtpModal(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!isPincodeValid) {
      toast.error("Please check pincode availability first.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (formData.phoneNumber.length !== 10) {
      toast.error('Phone number must be 10 digits');
      return;
    }
    
    // Send OTP if not sent
    if (!isOtpSent) {
      await sendOtp();
      return; // Stop here and wait for the user to enter the OTP
    }

    // Verify OTP
    if (!isVerified) {
      toast.error("Please verify your OTP first.");
      return;
    }

    // Submit signup form
    try {
      setLoadingSignUp(true);
      const response = await axios.post('/api/deliveryBoy/signup', {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        pinCode: formData.pincode,
      });
      toast.success('Account created! Welcome aboard');
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        pincode: ''
      });
      router.push('/login'); // Redirect to login after signup
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoadingSignUp(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-32" src="/threadAura.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full border-2 border-gray-400 rounded-md p-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="flex mt-2 space-x-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full border-2 border-gray-400 rounded-md p-2"
                />
               <button
                  type="button"
                  onClick={sendOtp}
                  disabled={isOtpSent || loadingOtp}
                  className="w-1/3 bg-[#4F46E5] cursor-pointer text-white rounded-md p-1 text-sm flex items-center justify-center"
                >
                  {loadingOtp ? (
                    <div className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    isOtpSent ? 'OTP Sent' : 'Send OTP'
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full border-2 border-gray-400 rounded-md p-2"
              />
            </div>

            <div>
              <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">Pincode</label>
              <div className="flex mt-2 space-x-2">
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="block w-full border-2 border-gray-400 rounded-md p-2"
                />
                <button
                  type="button"
                  onClick={checkPincodeAvailability}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Check
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full border-2 border-gray-400 rounded-md p-2"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full border-2 border-gray-400 rounded-md p-2"
              />
            </div>

            <div>
              <button
                type="submit"
                className={`w-full px-4 py-2 mt-4 bg-indigo-600 text-white rounded-md ${loadingSignUp ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loadingSignUp}
              >
                {loadingSignUp ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Already have an account? <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
          </p>
        </div>
      </div>

      {showOtpModal && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white rounded-lg p-6 w-80">
           <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
           <input
             type="text"
             value={otp}
             onChange={(e) => setOtp(e.target.value)}
             className="block w-full rounded-md border-gray-300 border-2 p-2 mb-4"
             placeholder="Enter OTP"
           />
           <button
             onClick={verifyOtp}
             className="w-full bg-green-500 text-white rounded-md p-2"
           >
             Verify OTP
           </button>
           <button
             onClick={() => {
               setShowOtpModal(false);
               setIsOtpSent(false); // Reset OTP sent state
               setOtp(''); // Clear the OTP input
             }}
             className="mt-2 w-full bg-gray-300 text-gray-700 rounded-md p-2"
           >
             Cancel
           </button>
         </div>
       </div>
      )}
    </div>
  );
};

export default Signup;
