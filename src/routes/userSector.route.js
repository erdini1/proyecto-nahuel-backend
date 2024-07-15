import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/authorization.middleware.js"
import { userSectorController } from "../controllers/userSector.controller.js"

const router = express.Router()

router.get("/", isAdmin, userSectorController.getAll)
router.post("/", isAuthenticated, userSectorController.create)

export default router