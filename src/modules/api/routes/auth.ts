/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import { Logger } from '../../../adapters/logger';
import { LoginUseCase, SignUpUseCase } from '../../auth/aplication';
import { RolService, UserService } from '../../users/application/services';
import { RoleMongoRepository, UserMongoRepository } from '../../users/infraestructure/repositories/mongo';
import { LoginController, SignUpController } from '../../auth/controllers';
import { CreateUserWithRolesUseCase } from '../../users/application/usecases';
import { Auth, RolAuth } from '../middleware';

const logger = Logger.getInstance();

const router = Router();
/**
 * POST
 * @openapi
 * /auth/sign-up:
 *  post:
 *    tags:
 *      - auth
 *    summary: 'Registro de usuarios'
 *    description: 'Registra los usuarios dentro de la aplicación'
 *    requestBody:
 *       description: Create un nuevo usuario
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signUp'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/signUp'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/signUp'
 *       required: true
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: 'Regresa un objeto con la información del usuario registrado'
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/signUp'
 */
export const singUpRoute = router.post('/auth/sign-up', Auth, RolAuth(['admin']), async(req: Request, res: Response) => {
  try {
    logger.info('Registro de usuarios');
    const userRepository = new UserMongoRepository();
    const userService = new UserService(userRepository);
    const roleRepository = new RoleMongoRepository();
    const rolService = new RolService(roleRepository);
    const userWithRolesService =  new CreateUserWithRolesUseCase(userService, rolService);
    const payload = req.body;
    const service =  new SignUpUseCase(userWithRolesService);
    const controller = new SignUpController(service);
    const result = await controller.signUp(payload);
    return res.json(result).status(200);
  } catch (error: any) {
    logger.error(`${singUpRoute.name}  - singUpRoute`);
    logger.error(error);
    return res.status(400).json({status: 400, type: error.type, message: error.message});
  }
});

/**
 * POST
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *      - auth
 *    summary: 'Solicita acceso a la plataforma'
 *    description: 'Se genera una solicitud de acceso a la plataforma usando las credenciales acceso'
 *    requestBody:
 *       description: Crea una nueva solicitud de acceso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *       required: true
 *    responses:
 *      '200':
 *        description: 'Regresa un objecto con la información del usuario'
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/login'
 *      '404':
 *          description: Error 404
 *          content:
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/error400'
 */
export const loginRoute = router.post('/auth/login', async(req: Request, res: Response) => {
  try {
    const payload = req.body;
    const userRepository = new UserMongoRepository();
    const userService = new UserService(userRepository);
    const service =  new LoginUseCase(userService);
    const controller = new LoginController(service);
    const result = await controller.login(payload);
    return res.status(200).json(result);
  } catch (error: any) {
    logger.error(`${loginRoute.name}  - loginRoute`);
    logger.error(error);
    return res.status(400).json({status: 400, type: error.type, message: error.message});
  }
});
