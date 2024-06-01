import express from "express"
import authRouter from "./authentication.route.js"

const router = express.Router()

router.use("/auth", authRouter)

export default router