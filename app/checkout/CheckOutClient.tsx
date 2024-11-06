"use client";
import { useCart } from "@/hooks/UseCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";
// import CompletePage from "./CompletePage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckOutClient = () => {
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSucess, setPaymentSucess] = useState(false);

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            console.error("Error from API:", data.error);
            toast.error("Failed to retrieve payment intent.");
          } else if (data.paymentIntent) {
            console.log("Received Payment Intent:", data.paymentIntent);
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          } else {
            console.error("Unexpected API response format:", data);
            toast.error("Unexpected response from server.");
          }
        })
        .catch((error) => {
          setError(true);
          console.error("Fetch error:", error);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSucess = useCallback((value: boolean) => {
    setPaymentSucess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSucess={handleSetPaymentSucess}
          />
        </Elements>
      )}

      {loading && <div className="text-center">Loading Checkout...</div>}
      {error && (
        <div className="text-center text-rose-500">Something went wrong...</div>
      )}

      {paymentSucess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full"><Button label="View your Orders" onClick={()=>router.push('/order')}/></div>
        </div>
      )}
    </div>
  );
};

export default CheckOutClient;
