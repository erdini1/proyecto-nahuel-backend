import express from "express"
import { authenticationController } from "../controllers/authentication.controller.js"

const router = express.Router()

router.post("/register", authenticationController.create)
router.post("/login", authenticationController.login)

export default router