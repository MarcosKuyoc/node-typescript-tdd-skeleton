/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Request, Response, NextFunction } from 'express';
import { Logger } from '../../adapters/logger';
import { verifyToken } from '../../helpers/generateToken';
import { RoleMongoRepository } from '../users/infraestructure/repositories/mongo';
const logger = Logger.getInstance();

export const RolAuth = (roles: string[]) => async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ').pop();
    const tokenData = await verifyToken(token!);
    if (tokenData) {
      const parseTokenData = JSON.parse(JSON.stringify(tokenData));
      const hasId = parseTokenData.id;

      if (hasId) {
        const rolRepository = new RoleMongoRepository();
        const allRoles = await rolRepository.find();
        const listRoles = allRoles.map((role) => role.name);
        
        if (roles.some((role) => listRoles.includes(role))) {
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
    res.status(500);
    res.send({error: 'Ocurrio un problema'});
  }
}