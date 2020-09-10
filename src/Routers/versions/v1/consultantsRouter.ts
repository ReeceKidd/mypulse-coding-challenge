import { Router } from 'express';

import { getConsultantMiddlewares } from '../../../RouteMiddlewares/Consultants/getConsultantMiddlewares';

export const userId = 'userId';

const usersRouter = Router();

usersRouter.get(`/:${userId}`, ...getConsultantMiddlewares);

export { usersRouter };
