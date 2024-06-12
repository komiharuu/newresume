

import { UserRepository } from '../repositories/users.repository.js';


export class UserController {
  userRepository = new UserRepository ();

  findUserById = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const users = await this.userRepository.findUserById(userId);
    
    return res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};
}


