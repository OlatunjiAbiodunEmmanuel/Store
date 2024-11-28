"use client";

import React, { useState, useEffect } from "react";
import { CartProductType } from "../product/[productid]/ProductDetails";
import { formatPrice } from "@/utilis/formatPrice";
import Link from "next/link";
import { truncateTxt } from "@/utilis/TruncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/UseCart";
import { Client, Storage } from "appwrite";

// Initialize Appwrite client and storage
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("672dd1d3000fabe729bc"); // Your Appwrite project ID

const storage = new Storage(client);

// Function to generate Appwrite image URL from file ID
const generateAppwriteImageUrl = (fileId: string) => {
  const BUCKET_ID = "672de0a8001e82cef20e"; // Replace with your Appwrite bucket ID
  return storage.getFilePreview(BUCKET_ID, fileId); // Get the file preview URL
};

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent = ({ item }: ItemContentProps) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();

  const [imageUrl, setImageUrl] = useState<string>("");

  // Fetch image URL dynamically from Appwrite
  useEffect(() => {
    if (item.selectedImg.image) {
      const url = generateAppwriteImageUrl(item.selectedImg.image); // Generate URL using Appwrite storage
      setImageUrl(url);
    }
  }, [item.selectedImg.image]);

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={imageUrl || "/placeholder.png"} // Use Appwrite image URL or placeholder
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateTxt(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
        />
      </div>

      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
