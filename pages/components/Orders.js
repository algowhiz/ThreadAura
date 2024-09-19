import React from 'react'

const Orders = () => {
  return (
    <div className="p-4  mt-8">
    <h2 className="text-xl font-bold mb-4">Orders</h2>
    <table className="min-w-full bg-white border border-gray-300">
        <thead>
            <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="px-4 py-2 border">1</td>
                <td className="px-4 py-2 border">John Doe</td>
                <td className="px-4 py-2 border">$100</td>
                <td className="px-4 py-2 border">Completed</td>
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default Orders