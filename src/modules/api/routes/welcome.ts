import { Router, Request, Response } from 'express';
const router = Router();

export const welcome = router.get('/', (_req: Request, res: Response) => {
  res.send('Bienvenido a nuestra API REST');
});