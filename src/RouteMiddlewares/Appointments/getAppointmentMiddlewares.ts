import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';
import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

const appointmentParamsValidationSchema = {
    appointmentId: Joi.string()
        .required()
        .length(24),
};

export const appointmentParamsValidationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    Joi.validate(
        request.params,
        appointmentParamsValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const sendAppointmentMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const { appointment } = response.locals;
        response.status(ResponseCodes.success).send(appointment);
    } catch (err) {
        next(new CustomError(ErrorType.SendAppointmentMiddleware, err));
    }
};

export const getAppointmentMiddlewares = [appointmentParamsValidationMiddleware, sendAppointmentMiddleware];
