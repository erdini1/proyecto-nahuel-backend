import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { userController } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", isCashier, userController.getAll)

export default router