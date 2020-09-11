import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import * as mongoose from 'mongoose';

import { getValidationErrorMessageSenderMiddleware } from '../../SharedMiddleware/validationErrorMessageSenderMiddleware';

import { appointmentModel, ConsultationSlotModel } from '../../Models/ConsultationSlot';
import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';
import { consultantsRouter } from '../../Routers/versions/v1/consultantsRouter';

const createConsultationSlotBodyValidationSchema = {
    consultantId: Joi.string().required(),
    availabilityStartTime: Joi.date().required(),
    availabilityEndTime: Joi.date().required(),
};

export const createConsultationSlotBodyValidationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    Joi.validate(
        request.body,
        createConsultationSlotBodyValidationSchema,
        getValidationErrorMessageSenderMiddleware(request, response, next),
    );
};

export const getCreateConsultationSlotFromRequestMiddleware = (
    appointment: mongoose.Model<ConsultationSlotModel>,
) => async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const { consultantId, availabilityStartTime, availabilityEndTime } = request.body;
        const newConsultationSlot = new appointment({
            consultantId,
            availabilityStartTime,
            availabilityEndTime,
        });
        response.locals.savedConsultationSlot = await newConsultationSlot.save();
        next();
    } catch (err) {
        next(new CustomError(ErrorType.CreateConsultationSlotFromRequestMiddleware, err));
    }
};

export const createConsultationSlotFromRequestMiddleware = getCreateConsultationSlotFromRequestMiddleware(
    appointmentModel,
);

export const sendCreatedConsultationSlotMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    try {
        const { savedConsultationSlot } = response.locals;
        response.status(ResponseCodes.created).send(savedConsultationSlot);
    } catch (err) {
        next(new CustomError(ErrorType.SendCreatedConsultationSlotMiddleware, err));
    }
};

export const createConsultationSlotMiddlewares = [
    createConsultationSlotBodyValidationMiddleware,
    createConsultationSlotFromRequestMiddleware,
    sendCreatedConsultationSlotMiddleware,
];
