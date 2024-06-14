import { beforeEach, describe, jest, test, expect } from '@jest/globals';
import { UserRepository } from '../../../src/repositories/users.repository.js';
import { dummyUsers } from '../../dummies/users.dummy.js';

const mockPrisma = {
  user: {
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
    jest.clearAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('createUser Method', async () => {
    // GIVEN
    const newUser = dummyUsers[0];
    mockPrisma.user.create.mockResolvedValue(newUser);

    // WHEN
    const result = await userRepository.createUser(newUser);

    // THEN
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
      },
    });
    expect(result).toEqual(newUser);
  });

  test('findUserById Method', async () => {
    // GIVEN
    const userId = dummyUsers[1].id;
    const foundUser = dummyUsers[1];
    mockPrisma.user.findUnique.mockResolvedValue(foundUser);

    // WHEN
    const result = await userRepository.findUserById(userId);

    // THEN
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
    expect(result).toEqual(foundUser);
  });

  test('findUserByEmail Method', async () => {
    // GIVEN
    const userEmail = dummyUsers[1].email;
    const foundUser = dummyUsers[1];
    mockPrisma.user.findFirst.mockResolvedValue(foundUser);

    // WHEN
    const result = await userRepository.findUserByEmail(userEmail);

    // THEN
    expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: userEmail,
      },
    });
    expect(result).toEqual(foundUser);
  });
});

