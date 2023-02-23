/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { Logger } from '../adapters/logger';
const logger = Logger.getInstance();
const saltRounds = 10;

export const encrypt = async(textPlain: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(textPlain, salt);
    return hash;
  } catch (error) {
    logger.error('encrypt');
    logger.error(error);
    throw error;
  }
}

export const compare = async (textPlain: string, hash: string) => {
  try {
    return await bcrypt.compareSync(textPlain, hash);
  } catch (error) {
    logger.error('encrypt');
    logger.error(error);
    throw error;
  }
}