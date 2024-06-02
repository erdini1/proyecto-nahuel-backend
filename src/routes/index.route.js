import express from "express"
import authRouter from "./authentication.route.js"
import taskRouter from "./task.route.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/task", taskRouter)

export default router