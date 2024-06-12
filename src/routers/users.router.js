import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import accessMiddleware from '../middleware/require-access-token.middleware.js';

const router = express.Router();
const userController = new UserController ();

router.get('/:userId', accessMiddleware, userController.findUserById);

export default router;
