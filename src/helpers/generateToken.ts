/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt  from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config';
import { Logger } from '../adapters/logger';
const logger = Logger.getInstance();

export interface IJWToken {
  id: string;
  email: string;
  roles: string[];
}

export const tokenSign = async (user: IJWToken) => {
  try {
    const token = await jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
}

export const verifyToken = async (token: string) => {
  try {
    return await jwt.verify(token, JWT_SECRET);
  } catch (error: any) {
    logger.warn(error.message);
    return null
  }
}