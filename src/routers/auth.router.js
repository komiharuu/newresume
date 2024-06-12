

import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { SignUpValidator } from "../middleware/sign-up-validator.middleware.js";
import { SignInValidator } from '../middleware/sign-in-validator.middleware.js'
const router = express.Router();

// PostsController의 인스턴스를 생성합니다.
const authController = new AuthController ();

/** 회원가입 API **/
router.post('/sign-up', SignUpValidator, authController.signUp);
/** 로그인 API **/
router.post('/sign-in', SignInValidator, authController.signIn);

export default router;