import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { UserController } from '../../../src/controllers/user.controller.js';
import { dummyUsers } from '../../dummies/users.dummy.js';

const mockuserRepository = {
  findUserById: jest.fn(),
};

const mockRequest = {
  params: jest.fn(),
  user: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const userController = new UserController(mockuserRepository);

describe('UserController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status.mockReturnValue(mockResponse);
    mockResponse.json.mockReturnValue(mockResponse);
  });

  test('findUserById Method', async () => {
    // GIVEN
    const user = dummyUsers[1]; // 사용자가 존재하는 데이터
    mockRequest.params = { id: String(user.id) }; // ID는 문자열로 설정
    mockuserRepository.findUserById.mockResolvedValue(user);

    // WHEN
    await userController.findUserById(mockRequest, mockResponse, mockNext);

    // THEN
    expect(mockuserRepository.findUserById).toHaveBeenCalledWith(user.id);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  test('findUserById Method - User Not Found', async () => {
    // GIVEN
    const id = undefined // 존재하지 않는 사용자 ID
    mockRequest.params = { id: String(id) }; // ID를 문자열로 설정
    mockuserRepository.findUserById.mockResolvedValue(null);
  
    // WHEN
    await userController.findUserById(mockRequest, mockResponse, mockNext);
  
    // THEN
    expect(mockuserRepository.findUserById).toHaveBeenCalledWith(id); // String(id)로 변경
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
  
});




