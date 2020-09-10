import { Router } from 'express';

import { getConsultantsMiddlewares } from '../../../RouteMiddlewares/Consultants/getConsultantMiddlewares';

const consultantsRouter = Router();

consultantsRouter.get(`/`, ...getConsultantsMiddlewares);

export { consultantsRouter };
