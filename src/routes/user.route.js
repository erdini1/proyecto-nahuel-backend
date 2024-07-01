import express from "express"
import { isAuthenticated, isCashier } from "../middlewares/authorization.middleware.js"
import { userController } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", isCashier, userController.getAll)
router.get("/profile", isAuthenticated, userController.getMyUser)
router.get("/:userId", isAuthenticated, userController.getById)

export default router