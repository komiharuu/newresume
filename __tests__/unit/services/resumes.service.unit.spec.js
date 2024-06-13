import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import {ResumesService} from '../../../src/services/resumes.service.js';
// TODO: template 이라고 되어 있는 부분을 다 올바르게 수정한 후 사용해야 합니다.

const mockresumesRepository = {
    createResume: jest.fn(),
    findAllResumes: jest.fn(),
    findResumeById: jest.fn(),
    updateResume: jest.fn(),
    deleteResume: jest.fn(),
};

const resumesService = new ResumesService(mockresumesRepository);

describe('ResumesService Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('  createResume Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test('findAllResumes Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test(' findResumeById Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test('findResumeById Method - 이력서 없는 경우', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test(' updateResume Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test(' deleteResume Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });
});
