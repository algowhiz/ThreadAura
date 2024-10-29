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
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('thread_aura_token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const sendOtp = async () => {
    setLoadingOtp(true);
    try {
      const response = await axios.post('/api/send-otp', {
        email: formData.email,
        isDeliveryBoy: "false",
      });
      setIsOtpSent(true);
      setShowOtpModal(true);
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoadingOtp(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('/api/verify-otp', { email: formData.email, otp });
      setIsVerified(true);
      setShowOtpModal(false);
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!isVerified) {
      toast.error('Please verify your OTP first');
      return;
    }

    setLoadingSignUp(true);
    try {
      const response = await axios.post('/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      toast.success("Account created! Welcome aboard");
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      sessionStorage.setItem('signupEmail', formData.email);
      sessionStorage.setItem('signupPassword', formData.password);
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Username</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 border-2 p-2"
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 border-2 p-2"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 border-2 p-2"
              />
            </div>

            <button
              type="submit"
              disabled={!isVerified || loadingSignUp}
              className={`w-full ${isVerified ? 'bg-indigo-600' : 'bg-gray-400 cursor-not-allowed '} text-white rounded-md p-2 flex items-center justify-center`}
            >
              {loadingSignUp ? (
                <div className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <Link href="/login" className="block mt-4 text-sm text-center text-indigo-600">
            Already have an account? Sign In
          </Link>
        </div>

        {/* OTP Modal */}
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
    </div>
  );
};

export default Signup;
