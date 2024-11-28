import Container from "@/app/components/Container";
import React from "react";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}

const OrderPage = async  ({ params }: { params: IParams }) => {
const order = await getOrderById(params);
if(!order) return <NullData title="No Order"/>;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />

      </Container>
    </div>
  );
};

export default OrderPage;
