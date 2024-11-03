"use client";
import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import React from "react";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded"

const SetQuantity = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}: SetQtyProps) => {
  return (
    <div className="flex gap-8 items-center text-base">
      {cartCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex gap-4 items-center">
        <button onClick={handleQtyDecrease} className={btnStyles}> - </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={btnStyles}> + </button>
      </div>
    </div>
  );
};

export default SetQuantity;
