// components/paymentform.js
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCartStore } from "@/context/cart";

const PaymentForm = ({
  formData,
  isProcessing,
  setIsProcessing,
  setMessage,
  cart,
  total,
}) => {
  const [isClient, setIsClient] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const {setUserData} = useCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const orderData = {
        ...formData,
        orderDetails: {
          cart,
          total
        }
      };
      setUserData(orderData);
      localStorage.setItem('orderData', JSON.stringify(orderData));
    }
  }, [formData, cart, total, setUserData]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      if (!formData.firstName || !formData.email) {
        throw new Error("Missing required customer information");
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          payment_method_data: {
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              address: {
                line1: formData.address,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postalCode,
              },
              phone: formData.phone,
            },
          },
        },
      });

      if (error) {
        setMessage(error.message);
      }
    } catch (err) {
      setMessage(err.message || "An unexpected error occurred during payment processing.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={handlePaymentSubmit}>
      <PaymentElement />
      <button className="w-full bg-black hover:bg-gray-900  text-white py-3 px-4 rounded-md  transition-colors duration-200 mt-4" disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
};

const PaymentFormWrapper = ({
  formData,
  isProcessing,
  setIsProcessing,
  setMessage,
  cart,
  total,
  promise,
  secret
}) => {
  // Check if we have both the stripe promise and clientSecret
  if (!promise || !secret) {
    return <div>Loading payment form...</div>;
  }

  const options = {
    // Make sure clientSecret is a string
    clientSecret: secret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: 'black',
        colorBackground: '#f9f9f9',
        colorText: 'black',
        colorDanger: '#e57373',
        fontFamily: 'Arial, sans-serif',
        fontLineHeight: '1.5',
        spacingUnit: '4px',
      borderWidth:'0px',
      outline: '0px',
      }
    }
  };

  return (
    <Elements stripe={promise} options={options}>
      <PaymentForm
        formData={formData}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        setMessage={setMessage}
        cart={cart}
        total={total}
      />
    </Elements>
  );
};

export default PaymentFormWrapper;