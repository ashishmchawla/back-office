import mongoose, { model, Schema } from "mongoose"
import validator from "validator"

export interface UserDocument extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
  is_active: string
}

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid email address",
      },
    },
    password: { type: String, required: true },
    is_active: { type: String, default: true },
  },
  { timestamps: true }
)

const User = mongoose.model<UserDocument>("User", UserSchema)

export default User
