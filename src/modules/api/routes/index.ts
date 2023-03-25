import { Router } from 'express';
import { checkhealth } from './checkhealth';
import { error500 } from './error_500';
import { welcome } from './welcome';
import {indexUser, createUser} from './users';
import { loginRoute, singUpRoute } from './auth';
const router = Router();

router.use(error500);
router.use(welcome);
router.use(checkhealth);
router.use(indexUser);
router.use(createUser);
router.use(singUpRoute);
router.use(loginRoute);
export { router };
