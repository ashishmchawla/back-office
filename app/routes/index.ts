import express from "express"
import userRoute from "./user"

const app = express()
app.use("/auth", userRoute)

export default app
