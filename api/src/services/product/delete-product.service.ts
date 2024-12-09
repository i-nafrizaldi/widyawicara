import prisma from "@/prisma";

export const deleteProductService = async (id: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { user: true },
    });

    if (!product) {
      throw new Error("Product not found !");
    }

    return await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  } catch (error) {
    throw error;
  }
};
