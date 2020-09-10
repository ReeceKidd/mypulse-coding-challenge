import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import * as mongoose from 'mongoose';

import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

import { patientModel, PatientModel } from '../../Models/Patient';
import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';

const createPatientBodyValidationSchema = {
    patientName: Joi.string().required(),
};

export const createPatientBodyValidationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    Joi.validate(
        request.body,
        createPatientBodyValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const getCreatePatientFromRequestMiddleware = (patient: mongoose.Model<PatientModel>) => async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { patientName } = request.body;
        const newPatient = new patient({
            patientName,
        });
        response.locals.savedPatient = await newPatient.save();
        next();
    } catch (err) {
        next(new CustomError(ErrorType.CreatePatientFromRequestMiddleware, err));
    }
};

export const createPatientFromRequestMiddleware = getCreatePatientFromRequestMiddleware(patientModel);

export const sendCreatedPatientMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const { savedPatient } = response.locals;
        response.status(ResponseCodes.created).send(savedPatient);
    } catch (err) {
        next(new CustomError(ErrorType.SendCreatedPatientMiddleware, err));
    }
};

export const createPatientMiddlewares = [
    createPatientBodyValidationMiddleware,
    createPatientFromRequestMiddleware,
    sendCreatedPatientMiddleware,
];
