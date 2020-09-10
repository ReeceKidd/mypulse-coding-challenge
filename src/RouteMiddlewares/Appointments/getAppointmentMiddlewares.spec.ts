/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    appointmentsBodyValidationMiddleware,
    sendAppointmentsMiddleware,
    getAppointmentsMiddlewares,
} from './getAppointmentMiddlewares';

describe(`appointmentsBodyValidationMiddleware`, () => {
    const consultantName = 'Dr Big Toe';
    const date = new Date();
    const startTime = new Date();
    const endTime = new Date();

    test('calls next() when correct params are supplied', () => {
        expect.assertions(1);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const request: any = {
            body: { consultantName, date, startTime, endTime },
        };
        const response: any = {
            status,
        };
        const next = jest.fn();

        appointmentsBodyValidationMiddleware(request, response, next);

        expect(next).toBeCalled();
    });
});

describe('sendRetrieveAppointmentResponseMiddleware', () => {
    test('sends appointment', () => {
        expect.assertions(3);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const appointments = [{ _id: 'abc' }];
        const request: any = {};
        const response: any = { locals: { appointments }, status };
        const next = jest.fn();

        sendAppointmentsMiddleware(request, response, next);

        expect(next).not.toBeCalled();
        expect(status).toBeCalledWith(200);
        expect(send).toBeCalledWith(appointments);
    });
});

describe('getAppointmentMiddlewares', () => {
    test('are defined in the correct order', () => {
        expect.assertions(3);

        expect(getAppointmentsMiddlewares.length).toEqual(2);
        expect(getAppointmentsMiddlewares[0]).toEqual(appointmentsBodyValidationMiddleware);
        expect(getAppointmentsMiddlewares[1]).toEqual(sendAppointmentsMiddleware);
    });
});
