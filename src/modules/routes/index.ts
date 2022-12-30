import { Router, Request, Response } from 'express'
import { CheckHealth } from '../check-health/services/check-health';

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-types
router.use((error: Error, _req: Request, res: Response, next: Function) => {
  if (error) {
    res.status(500).send(error.message);
  }

  next();
})

router.get('/', (_req: Request, res: Response) => {
  res.send('Bienvenido a nuestra API REST');
});

router.get('/checkhealth', async(_req: Request, res: Response) => {
  console.log('Alguien ha solicitado un checkhealth');
  const result = await CheckHealth();
  res.send(result);
});

export {router};