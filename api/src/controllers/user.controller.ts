import { updateUserService } from "..//services/user/update-user.service";
import { loginService } from "../services/user/login.service";

import { NextFunction, Request, Response } from "express";

export class UserController {
  async updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.user.id;
      const newPassword = req.body.newPassword;

      const result = await updateUserService(id, req.body, newPassword);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
