import prisma from "../../prisma";

export const deleteProductService = async (id: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { user: true },
    });

    if (!product) {
      throw new Error("Product not found !");
    }

    const deleteProduct = await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: "Delete address success", data: deleteProduct };
  } catch (error) {
    throw error;
  }
};
