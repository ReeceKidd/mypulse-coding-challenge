import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';
import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

const appointmentsBodyValidationSchema = {
    consultantName: Joi.string(),
    date: Joi.date(),
    startTime: Joi.date(),
    endTime: Joi.date(),
};

export const appointmentsBodyValidationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    Joi.validate(
        request.params,
        appointmentsBodyValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const sendAppointmentsMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const { appointments } = response.locals;
        response.status(ResponseCodes.success).send(appointments);
    } catch (err) {
        next(new CustomError(ErrorType.SendAppointmentsMiddleware, err));
    }
};

export const getAppointmentsMiddlewares = [appointmentsBodyValidationMiddleware, sendAppointmentsMiddleware];
