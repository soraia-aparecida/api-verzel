import express from "express"
import { UserController } from "../controller/UserController"

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post('/signup', userController.signupController)
userRouter.post('/login', userController.loginController)