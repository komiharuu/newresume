
import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import accessMiddleware from '../middleware/require-access-token.middleware.js';



const router = express.Router();

/** 이력서 생성 API **/
router.post('/post', accessMiddleware, async (req, res, next) => {
  const user = req.user;
  const { title, introduce} = req.body;
  const authorId = user.userId;

 try { if (!title) {
    return res.status(400).json({ message: '제목을 입력해 주세요.' });
  }
  if (!introduce) {
    return res.status(400).json({ message: '자기소개를 입력해 주세요.' });
  }

  if (introduce.length < 150) {
    return res.status(400).json({ message: '자기소개는 150자 이상 작성해야 합니다' });
  }


  const resume = await prisma.resume.create({
    data: { 
      authorId,
      title,
      introduce,
    },
  });




  return res.status(201).json({ data: resume });
} 
catch (err) {
  next(err);
}
});


// src/routes/posts.router.js

/** 이력서 목록 조회 API **/
router.get('/resumes', async (req, res, next) => {
  try {
    const user = req.user;
    const { status, sort = 'desc' } = req.query;
    const sortOrder = sort.toLowerCase() === 'asc' ? 'asc' : 'desc'; // 기본값은 'desc'

    // 조건에 따른 where 객체 생성
    let where = {};
    if (status) {
      where.status = status.toUpperCase();
    }

    // Prisma 쿼리 실행
    const resumes = await prisma.resume.findMany({
      where,
      orderBy: { createdAt: sortOrder },
      select: {
        resumeId: true,
        title: true,
        introduce: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: { // 작성자 정보를 포함하여 조회
          select: {
            name: true, // 작성자의 이름만 선택
          },
        },
      }
    });

    // 결과 반환
    if (!resumes) {
      return res.status(200).json([]);
    }

    // 사용자의 이름을 포함하여 이력서 목록 반환
    const data = resumes.map(resume => ({
      ...resume,
   
    }));

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
});









/** 이력서 상세 조회 API **/
router.get('/resumes/:resumeId', async (req, res, next) => {
  try {
    const user = req.user;
    const { resumeId } = req.params;

    const resume = await prisma.resume.findUnique({
      where: {
        resumeId: parseInt(resumeId, 10),
        authorId: user, // 작성자 ID와 현재 사용자 ID가 일치하는지 확인
      },
      include: { author: true },
    });

    if (!resume) {
      return res.status(404).json({ message: '이력서가 존재하지 않습니다.' });
    }

    const Resume = {
      resumeId: resume.resumeId,
      name: resume.author.name, // 작성자 이름 추가
      title: resume.title,
      introduce: resume.introduce,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };

    return res.status(200).json({ Resume });
  } catch (error) {
    next(error);
  }
});












/** 이력서 수정 API **/
router.patch('/resumes/:resumeId', accessMiddleware, async (req, res, next) => {
  try {const { resumeId} = req.params;
  const { title, introduce} = req.body;

  const post = await prisma.resume.findUnique({
    where: { resumeId: +resumeId }, 
    include: { author: true },
  });


  if (!post)  {
    return res.status(400).json({ message: '이력서가 존재하지 않습니다.'});
  }
  if (!title && !introduce)  {
    return res.status(400).json({ message: '수정 할 정보를 입력해 주세요.'});
  }
 
  const newResume = await prisma.resume.update({
    where: { resumeId: +resumeId }, // 이력서 ID로 업데이트
    data: { title, introduce } // 수정할 정보
});

const Resume = {
  resumeId: newResume.resumeId,
  userId: newResume.userId,
  title: newResume.title,
  introduce: newResume.introduce,
  status: newResume.status,
  createdAt: newResume.createdAt,
  updatedAt: newResume.updatedAt
};

  return res.status(200).json({Resume });
} catch (error) {
  next(error);
}});



/** 게시글 삭제 API **/
// 이력서 삭제 API
router.delete('/resumes/:resumeId', accessMiddleware, async (req, res, next) => {
  try {
    const user = req.user;
    const { resumeId } = req.params;

    // Prisma를 사용하여 이력서 조회
    const resume = await prisma.resume.findFirst({ where: { resumeId: +resumeId } });

    // 이력서가 존재하지 않는 경우 404 에러 반환
    if (!resume)
      return res.status(404).json({ message: '이력서가 존재하지 않습니다.' });

    // Prisma를 사용하여 이력서 삭제
    await prisma.resume.delete({ where: { resumeId: +resumeId } });

    // 삭제한 이력서의 ID 반환
    return res.status(200).json({ resumeId: +resumeId });
  } catch (error) {
    // 에러가 발생한 경우 에러 핸들러로 전달
    next(error);
  }
});















export default router;