


export class AuthController {
    
    constructor( authService) {
      // 생성자에서 전달받은 PostsRepository 의존성을 주입합니다.
      this.authService =  authService;
    }



    signUp = async (req, res, next) => {
      const { email, password, name } = req.body;
      try {
        const userInfo = await this.authService.signUp(email, password, name);
        return res.status(201).json({ message: '회원가입이 완료되었습니다.', userInfo });
      } catch (err) {
        next(err);
      }
    };

 signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {


    const { accessToken} = await this.authService.signIn(email, password);
   

    res.header('authorization', accessToken);
    return res.status(200).json({ accessToken });
  } catch (err) {
    // console.error(err);
    next(err);
  }
};
}