"use client";
import { useCart } from "@/hooks/UseCart";
import { formatPrice } from "@/utilis/formatPrice";
import { PaymentElement, useElements, useStripe, AddressElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSucess: (value: boolean) => void;
}

const CheckoutForm = ({
  clientSecret,
  handleSetPaymentSucess,
}: CheckoutFormProps) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSucess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");

          handleClearCart();
          handleSetPaymentSucess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">
        Address Information
      </h2>
      <AddressElement 
      options={{
        mode: 'shipping',
        allowedCountries:["NGN", "UK", "US"]

      }}
      />
      <h2 className="font-semibold mt-4 mb-2">
        Payment Information
      </h2>
      <PaymentElement 
      id="payment-element" options={{layout:"tabs"}}
      />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
      label={isLoading ? "Processing" : "Pay now"} disabled={isLoading || !stripe || !elements} onClick={()=>{}}
      />
    </form>
  );
};

export default CheckoutForm;
