/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Request, Response, NextFunction } from 'express';
import { Logger } from '../../adapters/logger';
import { verifyToken } from '../../helpers/generateToken';
const logger = Logger.getInstance();

export const RolAuth = (roles: string[]) => async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ').pop();
    const tokenData = await verifyToken(token!);
    if (tokenData) {
      const parseTokenData = JSON.parse(JSON.stringify(tokenData));
      const hasId = parseTokenData.id;

      if (hasId) {
        const rolesDB = {
          roles: ['admin', 'basic']
        };
        const allRoles = rolesDB.roles;
        // const userService = new UserService();
        // const user = await userService.findById(hasId);

        if (roles.some((role) => allRoles.includes(role))) {
          next();
        } else {
          res.status(401);
          res.send({error: 'El usuario no tiene permisos'});  
        }
      } else {
        res.status(401);
        res.send({error: 'El usuario no tiene permisos'});
      }
    } else {
      res.status(401);
      res.send({error: 'El usuario no tiene permisos'});
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}