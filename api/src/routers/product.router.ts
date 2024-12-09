import { verifyToken } from "../middlewares/verifyToken";
import { ProductController } from "../controllers/product.controller";
import { Router } from "express";
import { uploader } from "../lib/uploader";

export class ProductRouter {
  private productController: ProductController;
  private router: Router;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.post(
      "/create",
      verifyToken,
      uploader("IMG", "/images").array("thumbnail", 1),
      this.productController.createProductController
    );
    this.router.get(
      "/",
      verifyToken,
      this.productController.getProductListController
    );
    this.router.get(
      "/:id",
      verifyToken,
      this.productController.getProductController
    );
    this.router.patch(
      "/:id",
      verifyToken,
      uploader("IMG", "/images").array("thumbnail", 1),
      this.productController.updateProductController
    );
    this.router.delete(
      "/:id",
      verifyToken,
      this.productController.deleteProductController
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
