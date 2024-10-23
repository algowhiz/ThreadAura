import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [guestLogin, setGuestLogin] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('thread_aura_token')){
      router.push('/');
    }
  },[router.query])

  useEffect(() => {
    if (guestLogin) {
      handleSubmit();  // Only submit after guest login credentials are set
    }
  }, [formData, guestLogin]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handelGuestLogin = () =>{
    setFormData({
      email:"guest@gmail.com",
      password:"123456",
    });
    setGuestLogin(true);
  }

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Validate empty fields
    if (formData?.password == "" || formData?.email == "") {
      toast.error("Enter all fields")
      return;
    }

    try {
      const response = await axios.post('/api/login', {
        email: formData?.email,
        password: formData?.password
      });
      
      if (response.status == 200) {
        localStorage.setItem("thread_aura_token",response?.data?.token)
        localStorage.setItem("thread_aura__id",response?.data?._id)
        toast.success("Back again! Deals are waiting.")
        setFormData({
          email: '',
          password: '',
        })
        router.push('/')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-32" src="/threadAura.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          draggable
          newestOnTop={false}
        />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6  " action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  p-2" value={formData?.email} onChange={handelChange} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 " value={formData?.password}
                  onChange={handelChange} />
              </div>
              <Link href={'/signup'} className=" flex justify-end font-semibold text-xs mt-2 mb-0 p-0">Don't have acoount ? <span className='text-indigo-600 text-xs hover:text-indigo-500 ml-1'> SignUp</span></Link>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit} >Sign in</button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Don't want to SignUp?
            <a onClick={handelGuestLogin} className="font-semibold leading-6 cursor-pointer text-indigo-600 hover:text-indigo-500"> Use Guest Account</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login