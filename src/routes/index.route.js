import express from "express"
import authRouter from "./authentication.route.js"
import taskRouter from "./task.route.js"
import userTaskRouter from "./userTask.route.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/task", taskRouter)
router.use("/checklist", userTaskRouter)

export default router