import { ControladorEspecie } from './../controllers/especies/ControladorEspecie';
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { login, register } from '../controllers/Login/ControladorLogin';
import { Mascota } from "../Entity/mascotas/EntidadMascota";
import { MascotaController } from "../controllers/Mascota/ControllerMascota";


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

router.get("/especies",ControladorEspecie.getAll)
router.post("/especies", tryCatch(ControladorEspecie.create));


router.get("/mascotas",MascotaController.getAll);
router.post("/mascotas", tryCatch(MascotaController.create));

export default router;