import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { cashBoxController } from "../controllers/cashBox.controller.js"

const router = express.Router()

router.post("/", isAdmin, cashBoxController.create)
router.get("/", isCashier, cashBoxController.getAll)
router.get("/:cashBoxId", isAdmin, cashBoxController.getById)
router.put("/:cashBoxId", isAdmin, cashBoxController.update)
router.delete("/:cashBoxId", isAdmin, cashBoxController.deleteById)

export default router