import { Product } from "@prisma/client";
import prisma from "../../prisma";

interface CreateProduct extends Omit<Product, "id" | "createdAt"> {
  userId: number;
}

export const createProductService = async (
  userId: number,
  body: CreateProduct,
  file: Express.Multer.File
) => {
  try {
    const { name, price, stock } = body;

    const existingProduct = await prisma.product.findFirst({
      where: { name },
    });

    if (existingProduct) {
      throw new Error("Product already exist !");
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    console.log("inininin", userId);

    if (!user) {
      throw new Error("User Not Found !");
    }

    const result = await prisma.product.create({
      data: {
        ...body,
        thumbnail: `/images/${file.filename}`,
        price: Number(price),
        stock: Number(stock),
        userId: Number(userId),
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
