import { prisma } from '../utils/prisma.util.js';


export class UserRepository {
  
 findUserById = async (userId) => {
  try {
    return await prisma.user.findFirst({
      where: { userId: +userId },
      select: {
        userId: true,
        email: true,
        role: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (err) {
    throw new Error('Database error: ' + err.message);
  }
};


}
