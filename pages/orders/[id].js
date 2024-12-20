import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Orders = ({user}) => {
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let rowIndex = 0;
  
  useEffect(() => {
    if(!user.value){
      router.push("/login");
    }
    if (id && user.value) {
      const fetchOrders = async () => {
        try {
          const response = await axios.post('/api/orders', { id });          
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl">Something went wrong. Please check back after some time.</p>
      </div>
    );
  }

  return (
    <div className='p-6 md:p-10'>
      <div className="container text-2xl mx-auto mb-4">
        My Orders
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden flex flex-col justify-center items-center">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b border-neutral-200 font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4">Sr.no</th>
                    <th scope="col" className="px-6 py-4">Order ID</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4">Product</th>
                    <th scope="col" className="px-6 py-4">Quantity</th>
                    <th scope="col" className="px-6 py-4">Price</th>
                    <th scope="col" className="px-6 py-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(3)].map((_, index) => (
                      <tr key={index} className="animate-pulse border-b border-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-6 bg-gray-300 rounded"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    orders.map((order, orderIndex) => (
                      order?.products.map((product, productIndex) => (
                        <tr key={`${orderIndex}-${productIndex}`} className="border-b border-neutral-200">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{++rowIndex}</td>
                          <td className="whitespace-nowrap px-6 py-4">{order?.orderId}</td>
                          <td className="whitespace-nowrap px-6 py-4">{order?.status}</td>
                          <td className="whitespace-nowrap px-6 py-4">{product?.productId?.title}</td>
                          <td className="whitespace-nowrap px-6 py-4"><p className='ml-4'>{product?.quantity}</p></td>
                          <td className="whitespace-nowrap px-6 py-4">₹{product?.productId?.price}</td>
                          <td className="whitespace-nowrap px-6 py-4">₹{product?.productId?.price * product?.quantity}</td>
                        </tr>
                      ))
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
