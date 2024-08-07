import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { cashRegisterController } from "../controllers/cashRegister.controller.js"

const router = express.Router()

router.post("/", isCashier, cashRegisterController.create)
router.get("/", isAdmin, cashRegisterController.getAll)
router.get("/user", isCashier, cashRegisterController.getLastByUserId)
router.get("/check", isCashier, cashRegisterController.checkIfCashRegisterExists)
router.get("/:cashRegisterId", isAdmin, cashRegisterController.getById)
router.put("/:cashRegisterId", isCashier, cashRegisterController.update)

router.get("/export-csv/download", cashRegisterController.downloadCSV);

export default router