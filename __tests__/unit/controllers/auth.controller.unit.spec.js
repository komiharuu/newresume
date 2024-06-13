import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { AuthController } from '../../../src/controllers/auth.controller.js';
import { dummyUsers } from '../../dummies/users.dummy.js';

const mockauthService = {
  signUp: jest.fn(),
  signIn: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const authController = new AuthController(mockauthService);

describe('AuthController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야 합니다.
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('signUp Method by Success', async () => {
    // GIVEN
    const newUser = dummyUsers[0];
    const createdUser = dummyUsers[1];
    mockRequest.body = newUser;
    mockauthService.signUp.mockResolvedValue(createdUser);

    // WHEN
    await authController.signUp(mockRequest, mockResponse, mockNext);

    // THEN
    expect(mockauthService.signUp).toHaveBeenCalledWith(newUser);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(createdUser);
  });

  test('signIn Method by Success', async () => {
    // GIVEN
    const credentials = { email: dummyUsers[1].email, password: dummyUsers[1].password };
    const authToken = { token: 'somejwttoken' };
    mockRequest.body = credentials;
    mockauthService.signIn.mockResolvedValue(authToken);
  
    // WHEN
    await authController.signIn(mockRequest, mockResponse, mockNext);
  
    // THEN
    expect(mockauthService.signIn).toHaveBeenCalledWith({
      email: expect.stringMatching(credentials.email),
      password: expect.stringMatching(credentials.password)
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(authToken);
  });
  
  
  });

