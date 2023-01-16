import { Router, Request, Response } from 'express';
import { CheckHealthController } from '../check-health/controllers/check-health';
import { CheckHealthService } from '../check-health/services/check-health';

const router = Router();
/**
 * Get
 * @openapi
 * /checkhealth:
 *  get:
 *    tags:
 *      - checkhealth
 *    summary: 'Comprueba que la aplicación este disponible'
 *    description: 'Comprueba que la aplicación esta disponible'
 *    responses:
 *      '200':
 *        description: 'Regresa un objecto con la información de verificación'
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/checkhealth'
 */
export const checkhealth = router.get('/checkhealth', async(_req: Request, res: Response) => {
  const service =  new CheckHealthService();
  const controller = new CheckHealthController(service);
  const result = await controller.find();
  res.send(result);
});