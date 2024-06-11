import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from 'dotenv';

config();



const router = express.Router();

/** 사용자 회원가입 API **/
router.post('/sign-up', async (req, res, next) => {
  
  try {   const { email, password,  name} = req.body;
  const isExistUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!email) {
    return res.status(400).json({ message: '이메일을 입력해 주세요.' });
  }
  if (!password) {
    return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
  }
 
  if (!name) {
    return res.status(400).json({ message: '이름을 입력해 주세요.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '이메일 형식이 올바르지 않습니다.' });
    }


  if (isExistUser) {
    return res.status(400).json({ message: '이미 가입 된 사용자입니다.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: '비밀번호는 6자리 이상이어야 합니다.' });
  }



  // 사용자 비밀번호를 암호화합니다.
  const hashedPassword = await bcrypt.hash(password, 10);


  // Users 테이블에 사용자를 추가합니다.
  const userInfo = await prisma.user.create({
    data: { email,  name,  password: hashedPassword}
        
    });
  
    userInfo.password = undefined;

  return res.status(201).json({ message: '회원가입이 완료되었습니다.', userInfo});
  } catch (err){
    next(err);
  } 
});


// 사용자 로그인 API
router.post('/sign-in', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 유효성 검증
    if (!email) {
      return res.status(400).json({ message: '이메일을 입력해 주세요.' });
    }
    if (!password) {
      return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '이메일 형식이 올바르지 않습니다.' });
    }

    // 이메일로 사용자 조회
    const user = await prisma.user.findFirst({ where: { email } });

    // 이메일 또는 비밀번호가 일치하지 않는 경우
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
    }

    // JWT 토큰 생성
  

  

    const accessToken = jwt.sign({ userId: user.userId,}, 'aespa', { expiresIn: '12h' });
;

    res.header('authorization', accessToken); 
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    next(err);
  }
});





export default router;