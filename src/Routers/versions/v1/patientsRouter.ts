import { Router } from 'express';

import { getPatientMiddlewares } from '../../../RouteMiddlewares/Patients/getPatientMiddlewares';

const patientsRouter = Router();

patientsRouter.get(`/`, ...getPatientMiddlewares);

export { patientsRouter };
