"use client";
import { useCart } from "@/hooks/UseCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utilis/formatPrice";

const CartClient = () => {
  const { cartProducts,handleClearCart,cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link href={"/"} className="text-slate-500 flex items-center gap-1">
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 mt-8 items-center">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[100px]">
          <Button label="Clear Cart" onClick={() => {handleClearCart()}} small outline />
        </div>

        <div className="text-small flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>
          <Button label="Checkout" onClick={() => {}} />
          <Link href={"/"} className="text-slate-500 flex items-center gap-1">
            <MdArrowForward />
            <span>Countinue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
