import { Request, Response } from "express"
import User from "../../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { USER_JWT_SECRET } from "../../config"
import { generateToken, verifyToken } from "../../services/jwtService"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(500).json({
        status: "failed",
        message: "User not found",
      })
    }

    if (!user.is_active) {
      return res.status(500).json({
        status: "failed",
        message: "User is not active",
      })
    }

    // Verify Password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(500).json({
        status: "failed",
        message: "Password is incorrect",
      })
    }

    const token = generateToken(user._id, USER_JWT_SECRET)
    return res.status(200).json({
      status: "successful",
      user: user,
      token: token,
    })
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: `Failed due to : ${error}`,
    })
  }
}

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(500).json({
        status: "failed",
        message: "User with given email already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
      is_active: true,
    })

    await newUser.save()
    // Send an email on successfully registration.
    return res.status(201).json({
      status: "successful",
      message: "Successfully registered new user",
      user: newUser,
    })
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: `Failed due to : ${error}`,
    })
  }
}
