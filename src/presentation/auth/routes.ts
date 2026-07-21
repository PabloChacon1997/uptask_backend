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

    router.post('/confirm-account',
      authController.confirmAccount)

    router.post('/login',
      authController.login)

    router.post('/request-code',
      authController.confirmationCode)

    router.post('/forgot-password',
      authController.forgotPassword)

    router.post('/validate-token',
      authController.validateToken)

    router.post('/update-password/:token',
      authController.updatePasswordWithToken)

    return router;
  }
}