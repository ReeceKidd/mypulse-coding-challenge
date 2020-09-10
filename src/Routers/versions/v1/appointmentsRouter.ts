import { Router } from 'express';

import { getAppointmentsMiddlewares } from '../../../RouteMiddlewares/Appointments/getAppointmentMiddlewares';
import { createAppointmentMiddlewares } from '../../../RouteMiddlewares/Appointments/createAppointmentMiddlewares';

const appointmentsRouter = Router();

appointmentsRouter.post(`/`, ...createAppointmentMiddlewares);

appointmentsRouter.get(`/`, ...getAppointmentsMiddlewares);

export { appointmentsRouter };
