import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';
import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

const patientParamsValidationSchema = {
    patientId: Joi.string()
        .required()
        .length(24),
};

export const patientParamsValidationMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    Joi.validate(
        request.params,
        patientParamsValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const sendPatientMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const { patients } = response.locals;
        response.status(ResponseCodes.success).send(patients);
    } catch (err) {
        next(new CustomError(ErrorType.SendPatientsMiddleware, err));
    }
};

export const getPatientMiddlewares = [patientParamsValidationMiddleware, sendPatientMiddleware];
