import { Router } from 'express';
import { checkhealth } from './checkhealth';
import { error500 } from './error_500';
import { welcome } from './welcome';
const router = Router();

router.use(error500);
router.use(welcome);
router.use(checkhealth);

export { router };
