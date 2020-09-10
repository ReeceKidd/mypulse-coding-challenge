import { Router } from 'express';

import { getAppointmentMiddlewares } from '../../../RouteMiddlewares/Appointments/getAppointmentMiddlewares';

export const appointmentId = 'appointmentId';

const appointmentsRouter = Router();

appointmentsRouter.get(`/:${appointmentId}`, ...getAppointmentMiddlewares);

export { appointmentsRouter };
