import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.get("/usuarios", UserController.getAll);
router.post("/usuarios", UserController.create);


export default router;