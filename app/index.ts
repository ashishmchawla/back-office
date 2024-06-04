import express from "express"
import dotenv from "dotenv"
import { json } from "body-parser"
import cors from "cors"
import morgan from "morgan"
import routes from "./routes"
import { swaggerSpec } from "./utils/swagger.config"
import initializeDatabase, { DB_CONNECTION } from "./database"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
const swaggerUi = require("swagger-ui-express")

// Middlewares
app.use(json())
app.use(cors())
app.use(morgan("tiny"))
app.use("/api", routes)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export let server: any

// Start the server
function startServer() {
  server = app.listen(port, async () => {
    initializeDatabase()
    console.log(
      `${process.env.APP_NAME} app listening on http://localhost:${port}`
    )
  })
  server.setTimeout(500000)
}

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: Closing HTTP Server")
  await DB_CONNECTION.close()
  server.close(() => {
    console.log("HTTP server closed")
  })
})

if (!server) {
  startServer()
}
