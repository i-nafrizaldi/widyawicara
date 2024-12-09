import { createProductService } from "@/services/product/create-product.service";
import { NextFunction, Request, Response } from "express";
import { getProductListService } from "../services/product/get-productList.service";
import { getProductService } from "@/services/product/get-product.service";
import { updateProductService } from "@/services/product/update-product.service";
import { deleteProductService } from "@/services/product/delete-product.service";

export class ProductController {
  // create product
  async createProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files.length) {
        throw new Error("No File Uploaded");
      }

      const result = await createProductService(req.body, files[0]);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  //get product list
  async getProductListController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.body.user.id;
      const result = await getProductListService(Number(userId));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //get product
  async getProductController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getProductService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //update product
  async updateProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const files = req.files as Express.Multer.File[];
      const result = await updateProductService(Number(id), req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //update product
  async deleteProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const result = await deleteProductService(Number(id));

      return res.status(200).send({ message: "Delete Product Success !!" });
    } catch (error) {
      next(error);
    }
  }
}
