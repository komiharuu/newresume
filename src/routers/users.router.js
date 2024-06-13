import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserRepository } from '../repositories/users.repository.js';
import accessMiddleware from '../middleware/require-access-token.middleware.js';
import { prisma } from '../utils/prisma.util.js';

const usersRouter = express.Router();
const userRepository = new UserRepository (prisma);
const userController = new UserController (userRepository);



usersRouter.get('/:userId', accessMiddleware, userController.findUserById);

export {usersRouter};
