import { Router } from "express";
import { AuthDatsourceImpl } from "../../infraestructure/datasource/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infraestructure/repositories/auth.repository.impl";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDatsourceImpl()
    const repository = new AuthRepositoryImpl(datasource);
    const authController = new AuthController(repository);

    router.post('/create-account',
      authController.createAccount)

    return router;
  }
}