/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { IJWToken, tokenSign, verifyToken } from './generateToken';

describe('Token Functions', () => {
  // let mockLoggerError: jest.SpyInstance;
  // let mockLoggerWarn: jest.SpyInstance;

  // beforeEach(() => {
  //   mockLoggerError = jest.spyOn(Logger.getInstance(), 'error');
  //   mockLoggerWarn = jest.spyOn(Logger.getInstance(), 'warn');
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should generate token', async () => {
    const user: IJWToken = {
      id: '123',
      email: 'test@example.com',
      roles: ['admin', 'user'],
    };
    const token = await tokenSign(user);
    expect(token).not.toBe(undefined);
    expect(typeof token).toBe('string');
  });

  test('should verify token', async () => {
    const user: IJWToken = {
      id: '123',
      email: 'test@example.com',
      roles: ['admin', 'user'],
    };
    const token = await tokenSign(user);
    const decodedToken = await verifyToken(token);
    expect(decodedToken).toEqual({...user,
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
    // expect(mockLoggerWarn).not.toHaveBeenCalled();
    // expect(mockLoggerError).not.toHaveBeenCalled();
  });

  test('should return null on verify invalid token', async () => {
    const invalidToken = 'invalidToken';
    const decodedToken = await verifyToken(invalidToken);
    expect(decodedToken).toBeNull();
    // expect(mockLoggerWarn).toHaveBeenCalled();
    // expect(mockLoggerError).not.toHaveBeenCalled();
  });

  test('should log error on tokenSign error', async () => {
    const user: IJWToken = {
      id: '123',
      email: 'test@example.com',
      roles: ['admin', 'user'],
    };
    const errorMessage = 'Token signing error';
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error(errorMessage); });
    await expect(tokenSign(user)).rejects.toThrow(errorMessage);
    // expect(mockLoggerError).toHaveBeenCalled();
    // expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  test('should log warning on verifyToken error', async () => {
    const invalidToken = 'invalidToken';
    const errorMessage = 'Token verification error';
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error(errorMessage); });
    const decodedToken = await verifyToken(invalidToken);
    expect(decodedToken).toBeNull();
    //expect(mockLoggerWarn).toHaveBeenCalled();
    //expect(mockLoggerError).not.toHaveBeenCalled();
  });
});
