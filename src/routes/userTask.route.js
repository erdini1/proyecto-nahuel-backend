import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/authorization.middleware.js"
import { userTaskController } from "../controllers/userTask.controller.js"

const router = express.Router()

router.post("/", isAdmin, userTaskController.create)
router.get("/", isAdmin, userTaskController.getAll) // NO REVISADO
router.get("/user/task-set", isAuthenticated, userTaskController.getByUserIdAndTaskSet)
router.get("/task-set", isAuthenticated, userTaskController.getAllByTaskSetNotClosed) // REVISADO
router.get("/date/range", isAdmin, userTaskController.getByRangeOfDates) // REVISADO
router.get("/task-set/:taskSetId", isAuthenticated, userTaskController.getByTaskSetId) // REVISADO
router.get("/user/:userId", isAdmin, userTaskController.getByUserId) // NO REVISADO
router.get("/task/:taskId", isAdmin, userTaskController.getByTaskId) // NO REVISADO - NO SE USA
router.put("/:taskId/completed", isAuthenticated, userTaskController.markTaskAsCompleted) // REVISADO
router.put("/:userTaskId/optional", isAdmin, userTaskController.markTaskAsOptional)
router.put("/:userTaskId/should-do", isAuthenticated, userTaskController.markTaskAsShouldDo)
router.put("/:userTaskId", isAdmin, userTaskController.disableUserTask)
router.post("/order/:userId", isAuthenticated, userTaskController.updateTaskOrder)

export default router