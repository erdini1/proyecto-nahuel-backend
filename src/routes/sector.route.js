import express from "express"
import { isAdmin, isCashier } from "../middlewares/authorization.middleware.js"
import { sectorController } from "../controllers/sector.controller.js"

const router = express.Router()

router.post("/", isAdmin, sectorController.create)
router.get("/", isAdmin, sectorController.getAll)
router.post("/bulk", isAdmin, sectorController.bulkCreate)
router.put("/:id", isAdmin, sectorController.update)
router.delete("/:id", isAdmin, sectorController.deleteSector)

export default router