import { Router } from 'express';

import { getConsultantsMiddlewares } from '../../../RouteMiddlewares/Consultants/getConsultantMiddlewares';

export const consultantId = 'consultantId';

const consultantsRouter = Router();

consultantsRouter.get(`/:${consultantId}`, ...getConsultantsMiddlewares);

export { consultantsRouter };
