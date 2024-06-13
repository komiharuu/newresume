import { beforeEach, describe, jest, test, expect } from '@jest/globals';
import { ResumesRepository } from '../../../src/repositories/resumes.repository.js';
import { dummyResumes } from '../../dummies/resumes.dummy.js';

const mockPrisma = {
  resume: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const resumesRepository = new ResumesRepository(mockPrisma);

describe('ResumesRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다
  });

  test(' createResume Method', async () => {
    // GIVEN
    const mockReturn = 'create Return String';
    mockPrisma.resume.create.mockReturnValue(mockReturn);
    const createResumeParams = {
        title: 'createResumeTitle',
        introduce: 'createResumeIntroduce',
        status: 'createResumeStatus'
      };

      const createResumeData = await resumesRepository.createResume(
        createResumeParams.title,
        createResumeParams.introduce,
        createResumeParams.status,
      );


    // createPostData는 prisma.posts의 create를 실행한 결과값을 바로 반환한 값인지 테스트합니다.
    expect(createResumeData).toBe(mockReturn);

    // postsRepository의 createPost Method를 실행했을 때, prisma.posts의 create를 1번 실행합니다.
    expect(mockPrisma.resume.create).toHaveBeenCalledTimes(1);

    // postsRepository의 createPost Method를 실행했을 때, prisma.posts의 create를 아래와 같은 값으로 호출합니다.
    expect(mockPrisma.resume.create).toHaveBeenCalledWith({
      data: createResumeParams,
    });
  });
});







  test('findAllResumes  Method', async () => {
    // GIVEN
    const mockReturn = 'findMany String';
    mockPrisma.resume.findMany.mockReturnValue(mockReturn);

    // WHEN
    const result = await resumesRepository.findAllResumes();

    // THEN
    expect(resumesRepository.prisma.resume.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockReturn);
  });

  test('findResumeById Method', async () => {
    // GIVEN
    const resume = dummyResumes[1];
    mockPrisma.resume.findUnique.mockResolvedValue(resume);

    // WHEN
    const result = await resumesRepository.findResumeById(resume.id);

    // THEN
    expect(mockPrisma.resume.findUnique).toHaveBeenCalledWith({ where: { id: resume.id } });
    expect(result).toEqual(resume);
  });

  test(' updateResume Method', async () => {
    // GIVEN
    const resumeId = dummyResumes[1].id;
    const updateData = { title: 'Updated Title' };
    const updatedResume = { ...dummyResumes[1], ...updateData };
    mockPrisma.resume.update.mockResolvedValue(updatedResume);

    // WHEN
    const result = await resumesRepository.updateResume(resumeId, updateData);

    // THEN
    expect(mockPrisma.resume.update).toHaveBeenCalledWith({ where: { id: id }, data: updateData });
    expect(result).toEqual(updatedResume);
  });

  test('deleteResume Method', async () => {
    // GIVEN
    const id = dummyResumes[1].id;
    mockPrisma.resume.delete.mockResolvedValue(dummyResumes[1]);

    // WHEN
    const result = await resumesRepository.deleteResume(id);

    // THEN
    expect(mockPrisma.resume.delete).toHaveBeenCalledWith({ where: { id: id } });
    expect(result).toEqual(dummyResumes[1]);
  });


