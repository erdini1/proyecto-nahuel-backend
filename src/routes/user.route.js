import express from "express"
import { isAdmin } from "../middlewares/authorization.middleware.js"
import { userController } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", isAdmin, userController.getAll)

export default router