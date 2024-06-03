import express from "express"
import { isAdmin } from "../middlewares/authorization.middleware.js"
import { userTaskController } from "../controllers/userTask.controller.js"

const router = express.Router()

// TODO: Implementar ruta para eliminar tarea
router.post("/", isAdmin, userTaskController.create)
router.get("/", isAdmin, userTaskController.getAll)
router.get("/user/:userId", isAdmin, userTaskController.getByUserId)
router.get("/task/:taskId", isAdmin, userTaskController.getByTaskId)
router.get("/date/:userId", isAdmin, userTaskController.getByUserIdAndDate)
router.put("/:userId/:taskId/completed", isAdmin, userTaskController.markTaskAsCompleted)

export default router