
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import validators from './src/middleware/validators.js';
import { errorHandler } from './src/middleware/error-handler.middleware.js';
import { apiRouter } from './src/routers/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use('/', apiRouter);
app.use(validators);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});