import { verifyToken } from "../middlewares/verifyToken";
import { UserController } from "../controllers/user.controller";
import { Router } from "express";

export class UserRouter {
  private userController: UserController;
  private router: Router;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.patch(
      "/profile",
      verifyToken,
      this.userController.updateUserController
    );
    this.router.post("/login", this.userController.loginController);
  }

  getRouter(): Router {
    return this.router;
  }
}
