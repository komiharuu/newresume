import { AuthService } from '../services/auth.service.js';



export class AuthController {
    authService = new AuthService();

 signUp = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
 
    const userInfo = await this.authService.signUp(
      email, password, name
    );

    return res.status(201).json({ data: userInfo });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    next(err);
  }
};
}