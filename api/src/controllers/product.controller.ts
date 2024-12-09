import { createSellingService } from "..//services/product/create-selling.service";
import { createPurchasingService } from "..//services/product/create-purchasing.service";
import { getProductListService } from "../services/product/get-productList.service";
import { NextFunction, Request, Response } from "express";

export class ProductController {
  async getProductListController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await getProductListService();

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createPurchasingController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await createPurchasingService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  
  async createSellingController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await createSellingService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
