import { Router } from 'express';

import { getPatientMiddlewares } from '../../../RouteMiddlewares/Patients/getPatientMiddlewares';

export const patientId = 'patientId';

const patientsRouter = Router();

patientsRouter.get(`/:${patientId}`, ...getPatientMiddlewares);

export { patientsRouter };
