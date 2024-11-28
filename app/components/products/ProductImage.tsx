"use client";

import { CartProductType, SelectedImgType } from "@/app/product/[productid]/ProductDetails";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Client, Storage } from "appwrite";

// Initialize the Appwrite client and storage
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

// Define the props for the ProductImage component
interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage = ({ cartProduct, product, handleColorSelect }: ProductImageProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]); // To store URLs of product images

  // Fetch all product images from Appwrite and set their URLs
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      const fetchImageUrls = async () => {
        const urls = await Promise.all(
          product.images.map(async (image: SelectedImgType) => {
            const imageUrl = generateAppwriteImageUrl(image.image); // Generate image URL from Appwrite storage
            return imageUrl;
          })
        );
        setImageUrls(urls);
      };

      fetchImageUrls();
    }
  }, [product]);

  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      {/* Thumbnail images */}
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] sm:min-h-[400px]">
        {product.images.map((image: SelectedImgType, index: number) => {
          const imageUrl = imageUrls[index]; // Get the corresponding image URL from state
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative w-[80%] aspect-square rounded border-teal-300 ${
                cartProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"
              }`}
            >
              <Image
                src={imageUrl || "/placeholder.png"} // Fallback to a placeholder if no URL is available
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      {/* Main product image */}
      <div className="col-span-5 relative aspect-square">
        <Image
          src={generateAppwriteImageUrl(cartProduct.selectedImg.image)} // Use the Appwrite image URL for the main image
          alt={cartProduct.name}
          fill
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
