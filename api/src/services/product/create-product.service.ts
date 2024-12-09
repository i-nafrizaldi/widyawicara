import { Product } from "@prisma/client";
import prisma from "../../prisma";

interface CreateProduct
  extends Omit<Product, "id" | "thumbnail" | "createdAt"> {}

export const createProductService = async (
  body: CreateProduct,
  file: Express.Multer.File
) => {
  try {
    const { name, price, stock, userId } = body;

    const existingProduct = await prisma.product.findFirst({
      where: { name },
    });

    if (existingProduct) {
      throw new Error("Product already exist !");
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User Not Found !");
    }

    return await prisma.product.create({
      data: {
        ...body,
        thumbnail: `/images/${file.filename}`,
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};
