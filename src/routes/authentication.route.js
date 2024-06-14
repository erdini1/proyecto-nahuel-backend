import express from "express"
import { authenticationController } from "../controllers/authentication.controller.js"
import { isAdmin } from "../middlewares/authorization.middleware.js"

const router = express.Router()

// TODO: agregar ruta para eliminar un usuario logicamente
// TODO: agregar ruta para modificar el role de un usuario
router.post("/register", isAdmin, authenticationController.create)
router.put("/update", isAdmin, authenticationController.update)
router.post("/login", authenticationController.login)
router.post("/forgot-password/:userNumber", isAdmin, authenticationController.forgotPassword)
router.delete("/delete", isAdmin, authenticationController.deleteById)

export default router