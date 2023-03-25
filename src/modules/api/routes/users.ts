/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { UserController } from '../../users/controllers/user.controller';
import { Logger } from '../../../adapters/logger';
import { UserMongoRepository, RoleMongoRepository } from '../../users/infraestructure/repositories/mongo';
import { UserService,  RolService } from '../../users/application/services';
import { Auth, RolAuth } from '../middleware';
import { CreateUserWithRolesService } from '../../users/application/usecases';

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
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: 'Regresa un objecto con la información del usuario'
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/users'
 */
export const indexUser = router.get('/users', Auth, RolAuth(['basic']),  async(_req: Request, res: Response) => {
  try {
    logger.info('solicita todos lo usuarios');
    const userRepository = new UserMongoRepository();
    const service =  new UserService(userRepository);
    const controller = new UserController(service);
    const result = await controller.find();
    return res.json(result).status(200);
  } catch (error: any) {
    logger.error(`${createUser.name}  - indexUser`);
    logger.error(error);
    return res.status(400).json({status: 400, type: error.type, message: error.message});
  }
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
 *    security:
 *      - bearerAuth: []
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
 *          description: Error 404
 *          content:
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/error400'
 */
export const createUser = router.post('/users', Auth, RolAuth(['basic']), async(req: Request, res: Response) => {
  try {
    const payload = req.body;
    const userRepository = new UserMongoRepository();
    const roleRepository = new RoleMongoRepository();
    const rolService = new RolService(roleRepository);
    const userService =  new UserService(userRepository);
    const userWithRolesService =  new CreateUserWithRolesService(userService, rolService);
    const controller = new UserController(userService, userWithRolesService);
    const result = await controller.create(payload);
    return res.status(200).json(result);
  } catch (error: any) {
    logger.error(`${createUser.name}  - createUser`);
    logger.error(error);
    return res.status(400).json({status: 400, type: error.type, message: error.message});
  }
});
