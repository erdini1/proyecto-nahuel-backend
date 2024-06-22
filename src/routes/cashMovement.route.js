import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { cashMovementController } from "../controllers/cashMovement.controller.js"

const router = express.Router()

router.post("/", isCashier, cashMovementController.create)
router.get("/", isCashier, cashMovementController.getAll)
router.get("/user", isCashier, cashMovementController.getByUserId)
router.get("/:cashMovementId", isAdmin, cashMovementController.getById)
router.put("/:cashMovementId", isCashier, cashMovementController.update)
router.delete("/:cashMovementId", isCashier, cashMovementController.deleteById)

export default router