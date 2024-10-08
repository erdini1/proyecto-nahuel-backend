import express from "express"
import { isAdmin } from "../middlewares/authorization.middleware.js"
import { taskController } from "../controllers/task.controller.js"

const router = express.Router()

router.get("/", isAdmin, taskController.getAll)
router.post("/bulk", isAdmin, taskController.bulkCreate)
router.post("/", isAdmin, taskController.create)
router.get("/:id", isAdmin, taskController.getById)
router.put("/:id", isAdmin, taskController.update)
router.delete("/", isAdmin, taskController.deleteTasks)
router.delete("/:id", isAdmin, taskController.deleteTask)

export default router