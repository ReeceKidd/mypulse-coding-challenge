import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';
import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

const consultantParamsValidationSchema = {
    consultantId: Joi.string()
        .required()
        .length(24),
};

export const consultantParamsValidationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    Joi.validate(
        request.params,
        consultantParamsValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const sendConsultantMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const { consultant } = response.locals;
        response.status(ResponseCodes.success).send(consultant);
    } catch (err) {
        next(new CustomError(ErrorType.SendConsultantMiddleware, err));
    }
};

export const getConsultantMiddlewares = [consultantParamsValidationMiddleware, sendConsultantMiddleware];
