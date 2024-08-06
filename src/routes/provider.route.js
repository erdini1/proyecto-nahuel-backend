import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { providerController } from "../controllers/provider.controller.js"

const router = express.Router()

router.post("/", isAdmin, providerController.create)
router.post("/bulk", isAdmin, providerController.bulkCreate)
router.get("/", isCashier, providerController.getAll)
router.get("/:providerId", isAdmin, providerController.getById)
router.put("/:providerId", isAdmin, providerController.update)
router.delete("/:providerId", isAdmin, providerController.deleteById)

export default router