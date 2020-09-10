import { Router } from 'express';
import { consultantsRouter } from './consultantsRouter';
import { patientsRouter } from './patientsRouter';
import { appointmentsRouter } from './appointmentsRouter';

const v1Router = Router();

export enum Routes {
    consultants = 'consultants',
    patients = 'patients',
    appointments = 'appointments',
}

v1Router.use(`/${Routes.consultants}`, consultantsRouter);
v1Router.use(`/${Routes.patients}`, patientsRouter);
v1Router.use(`/${Routes.appointments}`, appointmentsRouter);

export default v1Router;
