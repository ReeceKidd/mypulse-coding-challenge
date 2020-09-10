import { Router } from 'express';

import { getAppointmentsMiddlewares } from '../../../RouteMiddlewares/Appointments/getAppointmentMiddlewares';
import { createAppointmentMiddlewares } from '../../../RouteMiddlewares/Appointments/createAppointmentMiddlewares';

export const appointmentId = 'appointmentId';

const appointmentsRouter = Router();

appointmentsRouter.post(`/`, ...createAppointmentMiddlewares);

appointmentsRouter.get(`/:${appointmentId}`, ...getAppointmentsMiddlewares);

export { appointmentsRouter };
