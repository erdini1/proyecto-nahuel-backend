import express from "express"
import authRouter from "./authentication.route.js"
import taskRouter from "./task.route.js"
import userTaskRouter from "./userTask.route.js"
import userRouter from "./user.route.js"
import cashRegisterRouter from "./cashRegister.route.js"
import terminalRouter from "./terminal.route.js"
import providerRouter from "./provider.route.js"
import cashMovementRouter from "./cashMovement.route.js"
import cancellationRouter from "./cancellation.route.js"
import taskSetRouter from "./taskSet.route.js"
import sectorRouter from "./sector.route.js"
import userSectorRouter from "./userSector.route.js"
import cashBoxRouter from "./cashBox.route.js"
import cashRegisterTerminalsRouter from "./cashRegisterTerminals.route.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/task", taskRouter)
router.use("/checklist", userTaskRouter)
router.use("/user", userRouter)
router.use("/cash-register", cashRegisterRouter)
router.use("/terminal", terminalRouter)
router.use("/provider", providerRouter)
router.use("/cash-movement", cashMovementRouter)
router.use("/cancellation", cancellationRouter)
router.use("/task-set", taskSetRouter)
router.use("/sector", sectorRouter)
router.use("/user-sector", userSectorRouter)
router.use("/cash-box", cashBoxRouter)
router.use("/cash-register-terminals", cashRegisterTerminalsRouter)

export default router