

import express from 'express';
import accessMiddleware from '../middleware/require-access-token.middleware.js';
import { ResumeValidator } from '../middleware/resume-vaildator.middleware.js';
import { ResumesRepository } from '../repositories/resumes.repository.js';
import { ResumesService } from '../services/resumes.service.js';
import { ResumesController} from '../controllers/resume.controller.js';
import { prisma } from '../utils/prisma.util.js';

const  resumesRouter = express.Router();

// PostsController의 인스턴스를 생성합니다.
const resumesRepository = new ResumesRepository(prisma);
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

/** 이력서 작성 API **/
resumesRouter.post('/', accessMiddleware, ResumeValidator, resumesController.createResume);


/** 이력서 조회 API **/
resumesRouter.get('/', resumesController.getResumes);

/** 이력서 상세 조회 API **/
resumesRouter.get('/:resumeId', resumesController.getResumeById);


/** 이력서 수정 API **/
resumesRouter.patch('/:resumeId', accessMiddleware, ResumeValidator, resumesController.updateResume);

/** 이력서 삭제 API **/
resumesRouter.delete('/:resumeId', accessMiddleware, resumesController.deleteResume);

export { resumesRouter };





