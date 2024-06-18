import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { providerController } from "../controllers/provider.controller.js"

const router = express.Router()

router.post("/", isAdmin, providerController.create)
router.get("/", isCashier, providerController.getAll)
router.get("/:providerId", isAdmin, providerController.getById)
router.put("/:providerId", isAdmin, providerController.update)

export default router