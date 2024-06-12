import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { AuthService } from '../services/auth.service.js';
import { UserRepository } from '../repositories/users.repository.js';
import accessMiddleware from '../middleware/require-access-token.middleware.js';
import { prisma } from '../utils/prisma.util.js';

const router = express.Router();
const userRepository = new UserRepository (prisma);
const authservice = new AuthService (userRepository);
const userController = new UserController (authservice);



router.get('/:userId', accessMiddleware, userController.findUserById);

export default router;
