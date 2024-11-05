"use client";
import { useCart } from "@/hooks/UseCart";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckOutClient = () => {
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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

  return (
    <div>
      <p>CheckOut</p>
      {loading && <p>Loading payment details...</p>}
      {error && <p style={{ color: "red" }}>An error occurred. Please try again.</p>}
    </div>
  );
};

export default CheckOutClient;
