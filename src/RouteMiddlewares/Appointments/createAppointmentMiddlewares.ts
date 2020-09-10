import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import * as mongoose from 'mongoose';

import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

import { appointmentModel, AppointmentModel } from '../../Models/Appointment';
import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';

const createAppointmentBodyValidationSchema = {
    patientName: Joi.string().required(),
    patientId: Joi.string().required(),
    consultantName: Joi.string().required(),
    consultantId: Joi.string().required(),
    startTime: Joi.date().required(),
};

export const createAppointmentBodyValidationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    Joi.validate(
        request.body,
        createAppointmentBodyValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const getCreateAppointmentFromRequestMiddleware = (appointment: mongoose.Model<AppointmentModel>) => async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { patientName, patientId, consultantName, consultantId, startTime } = request.body;
        const newAppointment = new appointment({
            patientName,
            patientId,
            consultantName,
            consultantId,
            startTime,
        });
        response.locals.savedAppointment = await newAppointment.save();
        next();
    } catch (err) {
        next(new CustomError(ErrorType.CreateAppointmentFromRequestMiddleware, err));
    }
};

export const createAppointmentFromRequestMiddleware = getCreateAppointmentFromRequestMiddleware(appointmentModel);

export const sendCreatedAppointmentMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const { savedAppointment } = response.locals;
        response.status(ResponseCodes.created).send(savedAppointment);
    } catch (err) {
        next(new CustomError(ErrorType.SendCreatedAppointmentMiddleware, err));
    }
};

export const createAppointmentMiddlewares = [
    createAppointmentBodyValidationMiddleware,
    createAppointmentFromRequestMiddleware,
    sendCreatedAppointmentMiddleware,
];
