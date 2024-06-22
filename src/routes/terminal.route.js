import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { terminalController } from "../controllers/terminal.controller.js"

const router = express.Router()

router.post("/", isCashier, terminalController.create)
router.get("/", isCashier, terminalController.getAll)
router.get("/:terminalId", isAdmin, terminalController.getById)
router.put("/:terminalId", isCashier, terminalController.update) // Revisar roles

export default router