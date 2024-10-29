import Link from 'next/link';
import React from 'react';

const Landingpage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8 text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-[#374151]">Welcome to ThreadAura!</h1>
        <p className="mt-2 text-xl text-gray-600">Your journey to becoming a top delivery partner starts here.</p>
      </header>

      <section className="bg-white p-8 rounded-lg shadow-xl mb-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-[#374151] mb-4">How to Complete Deliveries</h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
          <li>Review your dashboard for delivery details before starting.</li>
          <li>Confirm the pickup location and collect all items carefully.</li>
          <li>Use the provided navigation to reach the customer’s address promptly.</li>
          <li>Notify the customer in case of any delays or issues.</li>
          <li>Mark the delivery as complete after a successful handover.</li>
        </ul>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-xl mb-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-[#374151] mb-4">Top Tips for a Smooth Delivery Experience</h2>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
          <li>Plan your route in advance to minimize travel time.</li>
          <li>Handle items carefully to ensure they arrive in perfect condition.</li>
          <li>Communicate with the customer if you're running late or need clarification.</li>
          <li>Maintain a professional, friendly attitude to build customer trust.</li>
        </ul>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-xl mb-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-[#374151] mb-4">Safety First</h2>
        <p className="text-lg text-gray-700">
          Your safety on the road is our priority. Please follow all traffic rules, take breaks as needed, and always be mindful of your surroundings.
        </p>
      </section>

      <footer className="text-center mt-8">
        <Link href={'/delivery/dashboard'}><p className="text-[#5e80b8] font-semibold text-lg">Ready to start? Head over to your dashboard to view available orders!</p></Link>
      </footer>
    </div>
  );
};

export default Landingpage;
