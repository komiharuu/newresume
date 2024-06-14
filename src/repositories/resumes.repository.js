


export class ResumesRepository {

  constructor(prisma) {
    this.prisma = prisma;
  }

// 이력서 생성
  createResume = async (user, title, introduce, status) => {
    // user 객체로부터 userId를 추출합니다.
    const resume = await this.prisma.resume.create({
        data: {
            status,
            title,
            introduce,
            author: { connect: { userId: user.userId } },
        },
    });

    return resume; 
};



// 1. 문제가 resume, 인자를 잘못 전달 그래서 사고가
// 2. resume 부모에 문제가 있었다. 외래키는 connect를 잘 봐야한다.



findAllResumes = async () => {
  const resumes = await this.prisma.resume.findMany({
    select: {
      resumeId: true,
      authorId: true,
      title: true,
      status: true,
      introduce: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return resumes;
};


findResumeById = async (resumeId) => {
  const resume = await this.prisma.resume.findUnique({
    where: { resumeId: +resumeId },
    select: {
      resumeId: true,
      authorId: true,
      title: true,
      status: true,
      introduce: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return resume;
};



// 데이터 수정
  updateResume = async (resumeId,  title, introduce) => {
  
    const resumes = await this.prisma.resume.update({
      where: {
        resumeId: +resumeId,
      },
      data: {
        title,
        introduce,
      },
    });

    return resumes;
  };

  // 데이터 삭제
  deleteResume = async (resumeId) => {

    const deletedPost = await this.prisma.resume.delete({
      where: {
        resumeId: +resumeId
      },
    });

    return deletedPost;
  };
}