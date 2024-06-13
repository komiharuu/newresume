import { beforeEach, describe, jest, test, expect } from '@jest/globals';
import { UserRepository } from '../../../src/repositories/users.repository.js';
// TODO: template 이라고 되어 있는 부분을 다 올바르게 수정한 후 사용해야 합니다.

const mockPrisma = {
  template: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const userRepository = new UserRepository(mockPrisma);

describe('UserRepository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다
  });

  test('createUser Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test('findUserById Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test('findUserByEmail Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });


});
