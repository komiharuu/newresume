
export class UserController {


  constructor(userRepository) {
    // 생성자에서 전달받은 PostsService의 의존성을 주입합니다.
    this.userRepository = userRepository;
  }



  findUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
  

    const userInfo = await this.userRepository.findUserById(userId);
    
    return res.status(200).json({ data: userInfo });
  } catch (err) {
    next(err);
  }
};
}


