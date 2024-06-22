import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { cancellationController } from "../controllers/cancellation.controller.js"

const router = express.Router()

router.post("/", isCashier, cancellationController.create)
router.get("/", isAdmin, cancellationController.getAll)
router.get("/user", isCashier, cancellationController.getByUserId)
router.get("/:cancellationId", isAdmin, cancellationController.getById)
router.put("/:cancellationId", isCashier, cancellationController.update)
router.delete("/:cancellationId", isCashier, cancellationController.deleteById)

export default router