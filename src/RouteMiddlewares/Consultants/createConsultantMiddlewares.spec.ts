/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    createConsultantMiddlewares,
    createConsultantBodyValidationMiddleware,
    createConsultantFromRequestMiddleware,
    getCreateConsultantFromRequestMiddleware,
    sendCreatedConsultantMiddleware,
} from './createConsultantMiddlewares';
import { ResponseCodes } from '../../Server/responseCodes';
import { CustomError, ErrorType } from '../../customError';

const consultantName = 'Dr Big Toe';

const body = {
    consultantName,
};

describe('createConsultantMiddlewares', () => {
    describe(`createConsultantBodyValidationMiddleware`, () => {
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

            createConsultantBodyValidationMiddleware(request, response, next);

            expect(next).toBeCalled();
        });
    });

    describe(`createConsultantFromRequestMiddleware`, () => {
        test('sets response.locals.savedConsultant', async () => {
            expect.assertions(2);

            const save = jest.fn().mockResolvedValue(true);

            const consultant = jest.fn(() => ({ save }));

            const response: any = { locals: {} };
            const request: any = { body };
            const next = jest.fn();

            const middleware = getCreateConsultantFromRequestMiddleware(consultant as any);

            await middleware(request, response, next);

            expect(response.locals.savedConsultant).toBeDefined();
            expect(next).toBeCalledWith();
        });

        test('calls next with CreateConsultantFromRequestMiddleware error on middleware failure', () => {
            expect.assertions(1);

            const response: any = {};
            const request: any = {};
            const next = jest.fn();
            const middleware = getCreateConsultantFromRequestMiddleware({} as any);

            middleware(request, response, next);

            expect(next).toBeCalledWith(
                new CustomError(ErrorType.CreateConsultantFromRequestMiddleware, expect.any(Error)),
            );
        });
    });

    describe(`sendCreatedConsultantMiddleware`, () => {
        const ERROR_MESSAGE = 'error';
        const savedConsultant = {
            userId: 'abc',
            streakName: 'Daily Spanish',
            streakDescription: 'Practice spanish every day',
            startDate: new Date(),
        };

        test('responds with status 201 with consultant', () => {
            expect.assertions(3);
            const send = jest.fn();
            const status = jest.fn(() => ({ send }));
            const consultantResponseLocals = {
                savedConsultant,
            };
            const response: any = { locals: consultantResponseLocals, status };
            const request: any = {};
            const next = jest.fn();

            sendCreatedConsultantMiddleware(request, response, next);
            expect(next).not.toBeCalled();
            expect(status).toBeCalledWith(ResponseCodes.created);
            expect(send).toBeCalledWith(savedConsultant);
        });

        test('calls next with SendCreatedConsultantMiddleware error on middleware failure', () => {
            expect.assertions(1);
            const send = jest.fn(() => {
                throw new Error(ERROR_MESSAGE);
            });
            const status = jest.fn(() => ({ send }));
            const response: any = { locals: { savedConsultant }, status };

            const request: any = {};
            const next = jest.fn();

            sendCreatedConsultantMiddleware(request, response, next);

            expect(next).toBeCalledWith(new CustomError(ErrorType.SendCreatedConsultantMiddleware, expect.any(Error)));
        });
    });

    test('that createConsultant middlewares are defined in the correct order', async () => {
        expect.assertions(4);

        expect(createConsultantMiddlewares.length).toEqual(3);
        expect(createConsultantMiddlewares[0]).toBe(createConsultantBodyValidationMiddleware);
        expect(createConsultantMiddlewares[1]).toBe(createConsultantFromRequestMiddleware);
        expect(createConsultantMiddlewares[2]).toBe(sendCreatedConsultantMiddleware);
    });
});
