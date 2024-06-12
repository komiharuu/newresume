import { prisma } from '../utils/prisma.util.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export class AuthService {
 signUp = async (email, password, name) => {
  try {
    const isExistUser = await prisma.user.findFirst({ where: { email } });

    if (isExistUser) {
      return { message: '이미 가입 된 사용자입니다.', };
    }

    if (password.length < 6) {
      return { message: '비밀번호는 6자리 이상이어야 합니다.', };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInfo = await prisma.user.create({
      data: { email, name, password: hashedPassword }
    });

    userInfo.password = undefined;

    return { message: '회원가입이 완료되었습니다.', userInfo };
  } catch (err) {
    throw new Error('서비스 오류: ' + err.message);
  }
};

 signIn = async (email, password) => {
  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { accessToken: null, message: '인증 정보가 유효하지 않습니다.' };
    }

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESSTOKEN,
      { expiresIn: '12h' }
    );

    return { accessToken, message: '로그인 성공' };
  } catch (err) {
    throw new Error('서비스 오류: ' + err.message);
  }
};
}