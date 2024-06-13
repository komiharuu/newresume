

import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';
import { UserRepository } from '../repositories/users.repository.js';
import { HttpError } from '../errors/http.error.js';
const userRepository = new UserRepository(prisma);


export default async function accessToken(req, res, next) {
  try {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new HttpError.Unauthorized('인증 정보가 없습니다.');
    }

    const [tokenType, accessToken] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      throw new HttpError.Unauthorized('지원하지 않는 인증 방식입니다');
    }

    const decodedToken = jwt.verify(accessToken, process.env.ACCESSTOKEN);
    const userId = decodedToken.userId;

   
    const user = await userRepository.findUserById(userId);

    if (!user) {
      res.clearCookie('authorization');
      throw new HttpError.NotFound('인증 정보와 일치하는 사용자가 없습니다.');
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    switch (err.name) {
      case 'TokenExpiredError':
        return res.status(401).json({ message: '인증 정보가 만료되었습니다' });
      case 'JsonWebTokenError':
        return res.status(401).json({ message: '토큰이 조작되었습니다.' });
      default:
        return res
          .status(401)
          .json({ message: err.message ?? '인증 정보가 유효하지 않습니다.' });
    }
  }
}
