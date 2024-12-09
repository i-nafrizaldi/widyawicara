import prisma from "@/prisma";
import { join } from "path";
import fs from "fs";
import { Product } from "@prisma/client";

const defaultDir = "../../../public/images";

export const updateProductService = async (
  id: number,
  body: Partial<Product>,
  file?: Express.Multer.File
) => {
  try {
    const { name } = body;

    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new Error("Blog not found");
    }

    if (name) {
      const productName = await prisma.product.findFirst({
        where: { name: { equals: name } },
      });

      if (productName) {
        throw new Error("Product name already in use");
      }
    }

    if (file) {
      body.thumbnail = `/images/${file.filename}`;
      const imagePath = join(__dirname, "../../../public" + product.thumbnail);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return await prisma.product.update({
      where: { id },
      data: { ...body },
    });
  } catch (error) {
    const imagePath = join(__dirname, defaultDir + file?.filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    throw error;
  }
};
