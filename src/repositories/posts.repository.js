

import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
  createResume = async (user, title, introduce, status) => {
    // user 객체로부터 userId를 추출합니다.
    const resume = await prisma.resume.create({
        data: {
            status,
            title,
            introduce,
            author: { connect: { userId: user.userId } },
        },
    });

    return resume; // 이제 이력서 객체 전체를 반환합니다.
};



// 1. 문제가 resume, 인자를 잘못 전달 그래서 사고가
// 2. resume 부모에 문제가 있었다. 외래키는 connect를 잘 봐야한다.




  findAllResumes = async () => {
    const resumes = await prisma.resume.findMany({
      select: {
        resumeId: true,
        authorId: true,
        title: true,
        status: true,
        introduce: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return resumes;
  };

  findPostById = async (resumeId) => {
    // ORM인 Prisma에서 Posts 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const resumes = await prisma.resume.findFirst({
      where: { resumeId: +resumeId },
      select: {
        resumeId: true,
        authorId: true,
        title: true,
        status: true,
        introduce: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  

    return resumes;
  };



  findResumeById = async (resumeId,  title, introduce) => {
    // ORM인 Prisma에서 Posts 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const resumes = await prisma.resume.update({
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

  deleteResume = async (resumeId) => {
    // ORM인 Prisma에서 Posts 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedPost = await prisma.resume.delete({
      where: {
        resumeId: +resumeId
      },
    });

    return deletedPost;
  };
}