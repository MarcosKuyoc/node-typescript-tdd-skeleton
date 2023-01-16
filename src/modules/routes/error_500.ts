import { Router, Request, Response } from 'express';
const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-types
export const error500 = router.use((error: Error, _req: Request, res: Response, next: Function) => {
  if (error) {
    res.status(500).send(error.message);
  }

  next();
});