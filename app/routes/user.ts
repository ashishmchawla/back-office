import express from "express"
import { register, login } from "../controllers/auth/userController"

const router = express.Router()
router.post("/register", register)
router.post("/login", login)

export default router
