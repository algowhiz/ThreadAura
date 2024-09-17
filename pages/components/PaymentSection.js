import { MdOutlinePayment } from "react-icons/md";
import GooglePayButton from '@google-pay/button-react';
import { useState } from "react";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'; // Import framer-motion

const PaymentSection = ({ formValid, handleGooglePaySuccess, order, subTotal, buyNow }) => {
  const [toggle, setToggle] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success modal
  const router = useRouter();

  const btnToggle = () => {
    setToggle(true);
  };

  const handleGooglePaySuccessWithModal = async (paymentRequest) => {
    await handleGooglePaySuccess(paymentRequest);

    setShowSuccess(true); // Show the success modal

    setTimeout(() => {
      setShowSuccess(false); // Hide the modal after 3 seconds
      router.push(`/orders/${localStorage.getItem('thread_aura__id')}`); // Redirect to orders page
    }, 3000); 
  };

  return (
    <div>
      <h2 className="text-xl font-sans font-bold mt-5">3. Payment</h2>

      {formValid && toggle && (
        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: 'BCR2DN4T6Y4TH4KF',
              merchantName: 'Demo Merchant',
            },
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPriceLabel: 'Total',
              totalPrice: buyNow ? order[0]?.price.toString() : subTotal.toString(),
              currencyCode: 'INR',
              countryCode: 'IN',
            },
          }}
          onLoadPaymentData={handleGooglePaySuccessWithModal} 
          onError={(error) => {
            console.error('Google Pay Error:', error);
          }}
        />
      )}

      {formValid && !toggle && (
        <button
          onClick={btnToggle}
          className="flex items-center gap-2 mt-5 px-4 py-2 text-white rounded bg-green-500 hover:bg-green-600"
        >
          <MdOutlinePayment /> Pay ₹{buyNow ? order[0]?.price : subTotal}
        </button>
      )}

      {!formValid && (
        <button
          disabled
          className="flex items-center gap-2 mt-5 px-4 py-2 text-white rounded bg-green-400 cursor-not-allowed"
        >
          <MdOutlinePayment /> Pay ₹{buyNow ? order[0]?.price : subTotal}
        </button>
      )}

      {/* Success Modal with smooth animation */}
      {showSuccess && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }} // Start with 0 opacity
          animate={{ opacity: 1 }} // Fade in to full opacity
          exit={{ opacity: 0 }} // Fade out when done
          transition={{ duration: 0.5 }} // 0.5 seconds fade animation
        >
          <motion.div
            className="bg-white p-8 rounded-lg text-center"
            initial={{ scale: 0.5 }} // Start smaller
            animate={{ scale: 1 }} // Scale to full size
            transition={{ duration: 0.5 }} // Animation duration for scale effect
          >
            <h3 className="text-2xl font-bold text-green-600">Payment Successful!</h3>
            <p className="mt-4">Your order has been placed successfully.</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentSection;
