import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { AuthService } from '../../../src/services/auth.service.js';
import { dummyUsers } from '../../dummies/users.dummy.js';

const mockUserRepository = {
  signUp: jest.fn(),
  signIn: jest.fn(),
};

const authService = new AuthService(mockUserRepository);

describe('AuthService Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('signUp Method', async () => {
    // GIVEN
    const newUser = dummyUsers[0];
    mockUserRepository.signUp.mockResolvedValue(newUser);

    // WHEN
    const result = await authService.signUp(newUser);

    // THEN
    expect(mockUserRepository.signUp).toHaveBeenCalledWith(newUser);
    expect(result).toEqual(newUser);
  });

  test('signIn Method', async () => {
    // GIVEN
    const credentials = { email: dummyUsers[1].email, password: dummyUsers[1].password };
    const authToken = { token: 'somejwttoken' };
    mockUserRepository.signIn.mockResolvedValue(authToken);

    // WHEN
    const result = await authService.signIn(credentials);

    // THEN
    expect(mockUserRepository.signIn).toHaveBeenCalledWith(credentials);
    expect(result).toEqual(authToken);
  });
});


