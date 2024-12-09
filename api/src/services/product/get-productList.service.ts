import prisma from "../../prisma";

export const getProductListService = async (userId: number) => {
  try {
    const product = await prisma.product.findMany({
      where: { userId: userId },
      include: { user: true },
    });
    return product;
  } catch (error) {
    throw error;
  }
};
