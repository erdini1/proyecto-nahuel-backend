import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/authorization.middleware.js"
import { userTaskController } from "../controllers/userTask.controller.js"

const router = express.Router()

// TODO: Implementar ruta para eliminar tarea
router.post("/", isAdmin, userTaskController.create)
router.get("/", isAdmin, userTaskController.getAll)
router.get("/user/:userId", isAdmin, userTaskController.getByUserId)
router.get("/task/:taskId", isAdmin, userTaskController.getByTaskId)
router.get("/date", isAuthenticated, userTaskController.getByUserIdAndDate)
router.put("/:taskId/completed", isAuthenticated, userTaskController.markTaskAsCompleted)

export default router