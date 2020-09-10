import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import * as mongoose from 'mongoose';

import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

import { consultantModel, ConsultantModel } from '../../Models/Consultant';
import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';

const createConsultantBodyValidationSchema = {
    consultantName: Joi.string().required(),
};

export const createConsultantBodyValidationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    Joi.validate(
        request.body,
        createConsultantBodyValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const getCreateConsultantFromRequestMiddleware = (consultant: mongoose.Model<ConsultantModel>) => async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { consultantName } = request.body;
        const newConsultant = new consultant({
            consultantName,
        });
        response.locals.savedConsultant = await newConsultant.save();
        next();
    } catch (err) {
        next(new CustomError(ErrorType.CreateConsultantFromRequestMiddleware, err));
    }
};

export const createConsultantFromRequestMiddleware = getCreateConsultantFromRequestMiddleware(consultantModel);

export const sendCreatedConsultantMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const { savedConsultant } = response.locals;
        response.status(ResponseCodes.created).send(savedConsultant);
    } catch (err) {
        next(new CustomError(ErrorType.SendCreatedConsultantMiddleware, err));
    }
};

export const createConsultantMiddlewares = [
    createConsultantBodyValidationMiddleware,
    createConsultantFromRequestMiddleware,
    sendCreatedConsultantMiddleware,
];
