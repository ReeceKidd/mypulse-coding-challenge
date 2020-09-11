/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createConsultationSlotBodyValidationMiddleware,
    createConsultationSlotFromRequestMiddleware,
    createConsultationSlotMiddlewares,
    getCreateConsultationSlotFromRequestMiddleware,
    sendCreatedConsultationSlotMiddleware,
} from './createConsultationSlotsMiddlewares';
import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';

const consultantId = 'consultantId';
const availabilityStartTime = new Date();
const availabilityEndTime = new Date();

const body = {
    consultantId,
    availabilityStartTime,
    availabilityEndTime,
};

describe('createConsultationSlotMiddlewares', () => {
    describe(`createConsultationSlotBodyValidationMiddleware`, () => {
        test('valid request passes validation', () => {
            expect.assertions(1);
            const send = jest.fn();
            const status = jest.fn(() => ({ send }));
            const request: any = {
                body,
            };
            const response: any = {
                status,
            };
            const next = jest.fn();

            createConsultationSlotBodyValidationMiddleware(request, response, next);

            expect(next).toBeCalled();
        });
    });

    describe(`createConsultationSlotFromRequestMiddleware`, () => {
        test('sets response.locals.savedConsultationSlot', async () => {
            expect.assertions(2);

            const save = jest.fn().mockResolvedValue(true);

            const consultant = jest.fn(() => ({ save }));

            const response: any = { locals: {} };
            const request: any = { body };
            const next = jest.fn();

            const middleware = getCreateConsultationSlotFromRequestMiddleware(consultant as any);

            await middleware(request, response, next);

            expect(response.locals.savedConsultationSlot).toBeDefined();
            expect(next).toBeCalledWith();
        });

        test('calls next with CreateConsultationSlotFromRequestMiddleware error on middleware failure', () => {
            expect.assertions(1);

            const response: any = {};
            const request: any = {};
            const next = jest.fn();
            const middleware = getCreateConsultationSlotFromRequestMiddleware({} as any);

            middleware(request, response, next);

            expect(next).toBeCalledWith(
                new CustomError(ErrorType.CreateConsultationSlotFromRequestMiddleware, expect.any(Error)),
            );
        });
    });

    describe(`sendCreatedConsultationSlotMiddleware`, () => {
        test('responds with status 201 with consultant', () => {
            expect.assertions(3);
            const send = jest.fn();
            const status = jest.fn(() => ({ send }));
            const savedConsultationSlot = {
                consultantId,
                availabilityStartTime,
                availabilityEndTime,
            };

            const response: any = { locals: { savedConsultationSlot }, status };
            const request: any = {};
            const next = jest.fn();

            sendCreatedConsultationSlotMiddleware(request, response, next);

            expect(status).toBeCalledWith(ResponseCodes.created);
            expect(send).toBeCalledWith(savedConsultationSlot);
            expect(next).not.toBeCalled();
        });

        test('calls next with SendCreatedConsultationSlotMiddleware error on middleware failure', () => {
            expect.assertions(1);

            const response: any = {};

            const request: any = {};
            const next = jest.fn();

            sendCreatedConsultationSlotMiddleware(request, response, next);

            expect(next).toBeCalledWith(
                new CustomError(ErrorType.SendCreatedConsultationSlotMiddleware, expect.any(Error)),
            );
        });
    });

    test('that createConsultationSlot middlewares are defined in the correct order', async () => {
        expect.assertions(4);

        expect(createConsultationSlotMiddlewares.length).toEqual(3);
        expect(createConsultationSlotMiddlewares[0]).toBe(createConsultationSlotBodyValidationMiddleware);
        expect(createConsultationSlotMiddlewares[1]).toBe(createConsultationSlotFromRequestMiddleware);
        expect(createConsultationSlotMiddlewares[2]).toBe(sendCreatedConsultationSlotMiddleware);
    });
});
