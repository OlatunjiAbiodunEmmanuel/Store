import prisma from "@/libs/prismadb";

export interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
    try {
      const { productId } = params;
  
      console.log("Product ID received:", productId);
  
      if (!productId) {
        console.error("Product ID is missing");
        throw new Error("Product ID is required");
      }
  
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          reviews: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
  
      console.log("Query result:", product);
  
      if (!product) {
        console.warn("No product found with the provided ID:", productId);
        return null;
      }
  
      return product;
    } catch (error: any) {
      console.error("Error fetching product by ID:", error);
      throw new Error(error.message || "Unable to fetch product details");
    }
  }
  