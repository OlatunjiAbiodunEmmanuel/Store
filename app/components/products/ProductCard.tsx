"use client";
import { formatPrice } from "@/utilis/formatPrice";
import { truncateTxt } from "@/utilis/TruncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Client, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("672dd1d3000fabe729bc");

const storage = new Storage(client);

interface ProductCardProps {
  data: any;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter();

  // Calculate average product rating
  const productRating =
    data.reviews.length > 0
      ? data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
        data.reviews.length
      : 0;

  // Generate image URL dynamically
  const productImage =
    data.images?.[0]?.image
      ? storage.getFilePreview("672de0a8001e82cef20e", data.images[0].image) // Replace `bucketId` with your Appwrite bucket ID
      : "/placeholder.png";

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            src={productImage}
            alt={data.name || "Product Image"}
            fill
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4 font-medium">{truncateTxt(data.name)}</div>
        <div>
          <Rating value={productRating} precision={0.5} readOnly />
        </div>
        <div className="">
          {data.reviews.length} {data.reviews.length === 1 ? "review" : "reviews"}
        </div>
        <div className="font-semibold text-lg">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
