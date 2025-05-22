import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { login, register } from '../controllers/Login/ControladorLogin';

const router = Router();

// Middleware para manejar async/await con try-catch
function tryCatch(handler: any) {
  return async (req: any, res: any, next: any) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

router.get("/usuarios", UserController.getAll);
router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));

export default router;