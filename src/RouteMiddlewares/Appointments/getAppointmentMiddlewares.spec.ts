/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    appointmentParamsValidationMiddleware,
    sendAppointmentMiddleware,
    getAppointmentMiddlewares,
} from './getAppointmentMiddlewares';

describe(`appointmentParamsValidationMiddleware`, () => {
    const appointmentId = '5d43f0c2f4499975cb312b72';

    test('calls next() when correct params are supplied', () => {
        expect.assertions(1);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const request: any = {
            params: { appointmentId },
        };
        const response: any = {
            status,
        };
        const next = jest.fn();

        appointmentParamsValidationMiddleware(request, response, next);

        expect(next).toBeCalled();
    });
});

describe('sendRetrieveAppointmentResponseMiddleware', () => {
    test('sends appointment', () => {
        expect.assertions(3);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const appointment = { _id: 'abc' };
        const request: any = {};
        const response: any = { locals: { appointment }, status };
        const next = jest.fn();

        sendAppointmentMiddleware(request, response, next);

        expect(next).not.toBeCalled();
        expect(status).toBeCalledWith(200);
        expect(send).toBeCalledWith(appointment);
    });
});

describe('getAppointmentMiddlewares', () => {
    test('are defined in the correct order', () => {
        expect.assertions(3);

        expect(getAppointmentMiddlewares.length).toEqual(2);
        expect(getAppointmentMiddlewares[0]).toEqual(appointmentParamsValidationMiddleware);
        expect(getAppointmentMiddlewares[1]).toEqual(sendAppointmentMiddleware);
    });
});
