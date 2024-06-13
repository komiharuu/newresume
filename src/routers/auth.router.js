

import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { SignUpValidator } from "../middleware/sign-up-validator.middleware.js";
import { SignInValidator } from '../middleware/sign-in-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import { UserRepository } from '../repositories/users.repository.js'
import { AuthService } from '../services/auth.service.js';



// import { errorHandlerMiddleware } from '../middleware/error-handler.middleware.js';
const authRouter = express.Router();

// router.use(errorHandlerMiddleware);
const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);





/** 회원가입 API **/
authRouter.post('/sign-up', SignUpValidator, authController.signUp);
/** 로그인 API **/
authRouter.post('/sign-in', SignInValidator, authController.signIn);

export { authRouter };