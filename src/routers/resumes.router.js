

import express from 'express';
import { ResumeController } from '../controllers/resume.controller.js';
import accessMiddleware from '../middleware/require-access-token.middleware.js';
const router = express.Router();

// PostsController의 인스턴스를 생성합니다.
const resumeController = new ResumeController();


/** 이력서 작성 API **/
router.post('/', accessMiddleware, resumeController.createResume);


/** 이력서 조회 API **/
router.get('/', resumeController.getResumes);

/** 이력서 상세 조회 API **/
router.get('/:resumeId', resumeController.getPostById);


/** 이력서 수정 API **/
router.patch('/:resumeId', accessMiddleware, resumeController.updateResume);

/** 이력서 삭제 API **/
router.delete('/:resumeId', accessMiddleware, resumeController.deletePost);

export default router;





