
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http.error.js';

export class AuthService {

  constructor( userRepository) {
    // 생성자에서 전달받은 PostsRepository 의존성을 주입합니다.
    this.userRepository =  userRepository;
  }

        signUp = async (email, password, name) => {
          // 비밀번호 암호화
          const hashedPassword = await bcrypt.hash(password, 10);
          // 사용자 생성
          const userInfo = await this.userRepository.createUser(email, hashedPassword, name);


          delete userInfo.password;
          return userInfo;
        };
      

        signIn = async (email, password) => {
          try {
            // 이메일로 사용자 조회
            const user = await this.userRepository.findUserByEmail(email);
        


            if (!user) {
              throw new HttpError.NotFound('사용자가 존재하지 않습니다.');
            }


            // 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              throw new HttpError.BadRequest('비밀번호가 일치하지 않습니다.');
            }
        



            // JWT 토큰 생성
            const accessToken = jwt.sign(
              { userId: user.userId },
              process.env.ACCESSTOKEN,
              { expiresIn: '12h' }
            );
        
            return { accessToken};
          } catch (err) {
            throw new HttpError.InternalServerError('서비스 오류: ');
          }
        };



  getUserById = async (userId) => {
    return this.userRepository.findUserById(userId);
  };
        
}