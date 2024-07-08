import express from "express"
import { isAdmin, isAuthenticated, isCashier } from "../middlewares/authorization.middleware.js"
import { taskSetController } from "../controllers/taskSet.controller.js"

const router = express.Router()

router.post("/", isAuthenticated, taskSetController.create)
router.get("/last", isAuthenticated, taskSetController.getLastestById)
router.put("/", isAuthenticated, taskSetController.update)

export default router