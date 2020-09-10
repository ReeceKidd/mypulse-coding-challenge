import { Router } from 'express';

import { getConsultantMiddlewares } from '../../../RouteMiddlewares/Consultants/getConsultantMiddlewares';

export const consultantId = 'consultantId';

const consultantsRouter = Router();

consultantsRouter.get(`/:${consultantId}`, ...getConsultantMiddlewares);

export { consultantsRouter };
