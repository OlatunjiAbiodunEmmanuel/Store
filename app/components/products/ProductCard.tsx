"use client";
import { formatPrice } from "@/utilis/formatPrice";
import { truncateTxt } from "@/utilis/TruncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  data: any;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            src={data.images[0].image}
            alt={data.name}
            fill
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateTxt(data.name)}</div>
        <div className="">
          <Rating value={productRating} readOnly />
        </div>
        <div className="">{data.reviews.length} reviews</div>
        <div className="font-semibold ">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
