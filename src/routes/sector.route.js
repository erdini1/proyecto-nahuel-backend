import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { sectorController } from "../controllers/sector.controller.js"

const router = express.Router()

router.post("/", isAdmin, sectorController.create)
router.get("/", isAdmin, sectorController.getAll)

export default router