/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Request, Response, NextFunction } from 'express';
import { Logger } from '../../adapters/logger';
import { verifyToken } from '../../helpers/generateToken';
const logger = Logger.getInstance();

export const Auth = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ').pop();
    const tokenData = await verifyToken(token!);
    
    if (tokenData) {
      const parseTokenData = JSON.parse(JSON.stringify(tokenData));
      const hasId = parseTokenData.id;
      logger.info(hasId);

      if (hasId) {
        next();
      } else {
        res.status(401);
        res.send({error: 'El usuario no está authorizado'});
      }
    } else {
      res.status(401);
      res.send({error: 'El usuario no está authorizado'});
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
} 