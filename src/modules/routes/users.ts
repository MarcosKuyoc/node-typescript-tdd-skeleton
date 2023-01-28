/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { UserController } from '../users/controllers/user.controller';
import { UserService } from '../users/services/user.service';
import {Logger} from '../../adapters/logger';

const logger = Logger.getInstance();

const router = Router();
/**
 * Get
 * @openapi
 * /users:
 *  get:
 *    tags:
 *      - users
 *    summary: 'Lista todos los usuarios'
 *    description: 'Lista todos los usuarios registrados'
 *    responses:
 *      '200':
 *        description: 'Regresa un objecto con la información del usuario'
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/users'
 */
export const indexUser = router.get('/users', async(_req: Request, res: Response) => {
  logger.info('solicita todos lo usuarios');
  const service =  new UserService();
  const controller = new UserController(service);
  const result = await controller.find();
  return res.json(result).status(200);
});

/**
 * Post
 * @openapi
 * /users:
 *  post:
 *    tags:
 *      - users
 *    summary: 'Crea un nuevo usuario'
 *    description: 'Crea un nuevo usuario'
 *    requestBody:
 *       description: Create a new pet in the store
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *       required: true
 *    responses:
 *      '200':
 *        description: 'Regresa un objecto con la información del usuario'
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/users'
 *      '404':
 *          description: Invalid input
 */
export const createUser = router.post('/users', async(req: Request, res: Response) => {
  try {
    const payload = req.body;
    const service =  new UserService();
    const controller = new UserController(service);
    const result = await controller.create(payload);
    logger.info('Succesfull');
    return res.status(200).json(result);
  } catch (error: any) {
    logger.error('Fallo el servicio');
    logger.error(error);
    return res.status(404).json(error[0].params.errors);
  }
});
