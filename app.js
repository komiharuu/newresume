
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import validators from './src/middleware/validators.js';
import UsersRouter from './src/routers/users.router.js';
import ResumesRouter from './src/routers/resumes.router.js';
import AuthRouter from './src/routers/auth.router.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use('/auth',  AuthRouter );
app.use('/resume', ResumesRouter);
app.use('/user', UsersRouter);
app.use(validators);



app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});