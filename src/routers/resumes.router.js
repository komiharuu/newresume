

import express from 'express';
import accessMiddleware from '../middleware/require-access-token.middleware.js';
import { ResumeValidator } from '../middleware/resume-vaildator.middleware.js';
import { ResumesRepository } from '../repositories/resumes.repository.js';
import { ResumesService } from '../services/resumes.service.js';
import { ResumesController} from '../controllers/resume.controller.js';
import { prisma } from '../utils/prisma.util.js';

const router = express.Router();

// PostsController의 인스턴스를 생성합니다.
const resumesRepository = new ResumesRepository(prisma);
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

/** 이력서 작성 API **/
router.post('/', accessMiddleware, ResumeValidator, resumesController.createResume);


/** 이력서 조회 API **/
router.get('/', resumesController.getResumes);

/** 이력서 상세 조회 API **/
router.get('/:resumeId', resumesController.getPostById);


/** 이력서 수정 API **/
router.patch('/:resumeId', accessMiddleware, resumesController.updateResume);

/** 이력서 삭제 API **/
router.delete('/:resumeId', accessMiddleware, resumesController.deletePost);

export default router;





