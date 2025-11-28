import express from 'express';
import { handleLogin, handleRegistration, getUserProfile, handleLogout, handleAccountDelete, handleGithubLogin, handleGoogleLogin, getUserDetails } from '../Controllers/user.controller.js';
import { AuthMiddleware } from '../Middleware/Auth.js';

const userRouter = express.Router()

userRouter.post('/registration', handleRegistration)
userRouter.post('/github-login', handleGithubLogin)
userRouter.post('/google-login', handleGoogleLogin)
userRouter.delete('/delete', AuthMiddleware, handleAccountDelete)
userRouter.get('/me', AuthMiddleware, getUserProfile)
userRouter.get('/details', AuthMiddleware, getUserDetails)
userRouter.post('/login', handleLogin)
userRouter.post('/logout', handleLogout)

export default userRouter