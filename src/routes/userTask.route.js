import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/authorization.middleware.js"
import { userTaskController } from "../controllers/userTask.controller.js"

const router = express.Router()

router.post("/", isAdmin, userTaskController.create) // REVISADO
router.get("/", isAdmin, userTaskController.getAll) // NO REVISADO
// router.get("/date", isAuthenticated, userTaskController.getByUserIdAndTaskSet) // TODO: Eliminar cuando no se use mas
router.get("/user/task-set", isAuthenticated, userTaskController.getByUserIdAndTaskSet) // REVISADO
// router.get("/date/all", isAuthenticated, userTaskController.getByDate) // TODO: Eliminar cuando no se use mas
router.get("/task-set", isAuthenticated, userTaskController.getAllByTaskSetNotClosed) // REVISADO
router.get("/date/range", isAdmin, userTaskController.getByRangeOfDates) // REVISADO
router.get("/date/shift", isAdmin, userTaskController.getByUserIdDateAndShift) // REVISADO
router.get("/user/:userId", isAdmin, userTaskController.getByUserId) // NO REVISADO
router.get("/task/:taskId", isAdmin, userTaskController.getByTaskId) // NO REVISADO - NO SE USA
router.put("/:taskId/completed", isAuthenticated, userTaskController.markTaskAsCompleted) // REVISADO
router.delete("/:userTaskId", isAdmin, userTaskController.deleteUserTask) // REVISADO

export default router