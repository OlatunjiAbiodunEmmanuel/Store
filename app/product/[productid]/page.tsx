import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utilis/products";

interface IParams {
  productid?: string;
}

const ProductPage = ({ params }: { params: IParams }) => {

  const product = products.find((product) => product.id === params.productid);

  if (!product) {
    return <div>Product not found</div>; 
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
