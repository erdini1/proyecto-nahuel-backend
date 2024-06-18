import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { cashRegisterController } from "../controllers/cashRegister.controller.js"

const router = express.Router()

router.post("/", isCashier, cashRegisterController.create)
router.get("/", isAdmin, cashRegisterController.getAll)
router.get("/:cashRegisterId", isAdmin, cashRegisterController.getById)
router.put("/:cashRegisterId", isCashier, cashRegisterController.update) // Revisar roles
router.get("/user/:userId", isCashier, cashRegisterController.getByUserIdAndDate)

export default router