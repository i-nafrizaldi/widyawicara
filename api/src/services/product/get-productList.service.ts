import prisma from "../../prisma";

export const getProductListService = async () => {
  try {
    const product = await prisma.product.findMany();
    return product;
  } catch (error) {
    throw error;
  }
};
