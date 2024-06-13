import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { AuthService } from '../../../src/services/auth.service.js';
// TODO: template 이라고 되어 있는 부분을 다 올바르게 수정한 후 사용해야 합니다.

const mockuserRepository = {
    signUp: jest.fn(),
    signIn: jest.fn(),

};

const authService = new AuthService(mockuserRepository);

describe('AuthService Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('signUp Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  test('signIn Method', async () => {
    // GIVEN
    // WHEN
    // THEN
  });

  });

