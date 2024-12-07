import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}

const ProductPage = async ({ params }: { params: { productid: string } }) => {
  console.log("Params received in ProductPage:", params);

  const product = await getProductById({ productId: params.productid });
  const user = await getCurrentUser();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user}/>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
