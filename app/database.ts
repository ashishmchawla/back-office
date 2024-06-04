import mongoose, { ConnectOptions, Connection } from "mongoose"
import dotenv from "dotenv"

dotenv.config()
export let DB_CONNECTION: Connection

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI
    if (!mongoURI) {
      throw Error("Database link missing in .env")
    }
    await mongoose.connect(mongoURI).then(
      () => {
        console.log("Connected to database successfully")
      },
      (err) => {
        console.log(`Database connection error: ${err}`)
      }
    )

    DB_CONNECTION = mongoose.connection
    DB_CONNECTION.on(
      "error",
      console.error.bind(console, "Database connection error")
    )
    DB_CONNECTION.once("open", () => {
      console.log("Connected to databse successfully")
    })
  } catch (error) {
    console.error(`Database connection error: ${error}`)
    process.exit(1)
  }
}

export const initializeDatabase = async () => {
  await connectToDatabase()
}

export default initializeDatabase
