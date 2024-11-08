import prisma from "@/libs/prismadb";

export default async function getOrders() {
  try {
    const order = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });

    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}
