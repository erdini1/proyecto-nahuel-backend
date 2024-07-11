import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/authorization.middleware.js"
import { userSectorController } from "../controllers/userSector.controller.js"

const router = express.Router()

router.get("/", isAdmin, userSectorController.getAll)

export default router