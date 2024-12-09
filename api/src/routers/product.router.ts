import { verifyToken } from "../middlewares/verifyToken";
import { ProductController } from "../controllers/product.controller";
import { Router } from "express";

export class ProductRouter {
  private productController: ProductController;
  private router: Router;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.get("/", this.productController.getProductListController);
    this.router.post(
      "/purchasing",
      verifyToken,
      this.productController.createPurchasingController
    );
    this.router.post(
      "/selling",
      verifyToken,
      this.productController.createSellingController
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
