


export class UserRepository {
  
  constructor(prisma) {
    // 생성자에서 전달받은 Prisma 클라이언트의 의존성을 주입합니다.
    this.prisma = prisma;
  }

  createUser = async (email, hashedPassword, name) => {
    const userInfo = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return userInfo;
  };


 findUserById = async (userId) => {
  
  const userInfo = await this.prisma.user.findUnique({
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
    return userInfo;
};

findUserByEmail = async (email) => {
 
    // 이메일로 사용자 조회
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: {
        userId: true,
        email: true,
        role: true,
        name: true,
        password: true, // 비밀번호를 가져옵니다.
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } 



}







