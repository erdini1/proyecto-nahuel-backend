import express from "express"
import { authenticationController } from "../controllers/authentication.controller.js"
import { isAdmin } from "../middlewares/authorization.middleware.js"

const router = express.Router()

router.post("/register", isAdmin, authenticationController.create)
router.post("/login", authenticationController.login)
router.post("/forgot-password/:userNumber", isAdmin, authenticationController.forgotPassword)

export default router