import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { cashRegisterTerminalsController } from "../controllers/cashRegisterTerminals.controller.js"

const router = express.Router()

router.post("/", isCashier, cashRegisterTerminalsController.createAssociation)
router.get("/", isAdmin, cashRegisterTerminalsController.getAll)
router.post("/delete", isCashier, cashRegisterTerminalsController.deleteAssociation)

export default router