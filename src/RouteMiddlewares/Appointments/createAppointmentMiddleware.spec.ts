/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createAppointmentMiddlewares,
    createAppointmentBodyValidationMiddleware,
    createAppointmentFromRequestMiddleware,
    getCreateAppointmentFromRequestMiddleware,
    sendCreatedAppointmentMiddleware,
} from './createAppointmentMiddlewares';
import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';

const patientName = 'Sue Smith';
const patientId = 'S12345';
const consultantName = 'Dr Big Toe';
const consultantId = 'abcdefg';
const startTime = new Date();

const body = {
    patientName,
    patientId,
    consultantName,
    consultantId,
    startTime,
};

describe('createAppointmentMiddlewares', () => {
    describe(`createAppointmentBodyValidationMiddleware`, () => {
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

            createAppointmentBodyValidationMiddleware(request, response, next);

            expect(next).toBeCalled();
        });
    });

    describe(`createAppointmentFromRequestMiddleware`, () => {
        test('sets response.locals.savedAppointment', async () => {
            expect.assertions(2);

            const save = jest.fn().mockResolvedValue(true);

            const appointment = jest.fn(() => ({ save }));

            const response: any = { locals: {} };
            const request: any = { body };
            const next = jest.fn();

            const middleware = getCreateAppointmentFromRequestMiddleware(appointment as any);

            await middleware(request, response, next);

            expect(response.locals.savedAppointment).toBeDefined();
            expect(next).toBeCalledWith();
        });

        test('calls next with CreateAppointmentFromRequestMiddleware error on middleware failure', () => {
            expect.assertions(1);

            const response: any = {};
            const request: any = {};
            const next = jest.fn();
            const middleware = getCreateAppointmentFromRequestMiddleware({} as any);

            middleware(request, response, next);

            expect(next).toBeCalledWith(
                new CustomError(ErrorType.CreateAppointmentFromRequestMiddleware, expect.any(Error)),
            );
        });
    });

    describe(`sendCreatedAppointmentMiddleware`, () => {
        const ERROR_MESSAGE = 'error';
        const savedAppointment = {
            userId: 'abc',
            streakName: 'Daily Spanish',
            streakDescription: 'Practice spanish every day',
            startDate: new Date(),
        };

        test('responds with status 201 with appointment', () => {
            expect.assertions(3);
            const send = jest.fn();
            const status = jest.fn(() => ({ send }));
            const appointmentResponseLocals = {
                savedAppointment,
            };
            const response: any = { locals: appointmentResponseLocals, status };
            const request: any = {};
            const next = jest.fn();

            sendCreatedAppointmentMiddleware(request, response, next);
            expect(next).not.toBeCalled();
            expect(status).toBeCalledWith(ResponseCodes.created);
            expect(send).toBeCalledWith(savedAppointment);
        });

        test('calls next with SendCreatedAppointmentMiddleware error on middleware failure', () => {
            expect.assertions(1);
            const send = jest.fn(() => {
                throw new Error(ERROR_MESSAGE);
            });
            const status = jest.fn(() => ({ send }));
            const response: any = { locals: { savedAppointment }, status };

            const request: any = {};
            const next = jest.fn();

            sendCreatedAppointmentMiddleware(request, response, next);

            expect(next).toBeCalledWith(new CustomError(ErrorType.SendCreatedAppointmentMiddleware, expect.any(Error)));
        });
    });

    test('that createAppointment middlewares are defined in the correct order', async () => {
        expect.assertions(4);

        expect(createAppointmentMiddlewares.length).toEqual(3);
        expect(createAppointmentMiddlewares[0]).toBe(createAppointmentBodyValidationMiddleware);
        expect(createAppointmentMiddlewares[1]).toBe(createAppointmentFromRequestMiddleware);
        expect(createAppointmentMiddlewares[2]).toBe(sendCreatedAppointmentMiddleware);
    });
});
