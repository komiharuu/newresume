import express from 'express';
import { authRouter } from './auth.router.js';
import { usersRouter } from './users.router.js';
import { resumesRouter } from './resumes.router.js';


const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', usersRouter);
apiRouter.use('/resume',  resumesRouter);

export { apiRouter };