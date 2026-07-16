import { registerUser, loginUser, logoutUser } from '../controllers/authController.js'
import express from 'express'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser) 
authRouter.get('/logout', logoutUser)

