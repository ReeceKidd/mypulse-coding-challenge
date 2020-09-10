/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    patientParamsValidationMiddleware,
    sendPatientMiddleware,
    getPatientMiddlewares,
} from './getPatientMiddlewares';

describe(`patientParamsValidationMiddleware`, () => {
    const patientId = '5d43f0c2f4499975cb312b72';

    test('calls next() when correct params are supplied', () => {
        expect.assertions(1);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const request: any = {
            params: { patientId },
        };
        const response: any = {
            status,
        };
        const next = jest.fn();

        patientParamsValidationMiddleware(request, response, next);

        expect(next).toBeCalled();
    });
});

describe('sendRetrievePatientResponseMiddleware', () => {
    test('sends patient', () => {
        expect.assertions(3);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const patient = { _id: 'abc' };
        const request: any = {};
        const response: any = { locals: { patient }, status };
        const next = jest.fn();

        sendPatientMiddleware(request, response, next);

        expect(next).not.toBeCalled();
        expect(status).toBeCalledWith(200);
        expect(send).toBeCalledWith(patient);
    });
});

describe('getPatientMiddlewares', () => {
    test('are defined in the correct order', () => {
        expect.assertions(3);

        expect(getPatientMiddlewares.length).toEqual(2);
        expect(getPatientMiddlewares[0]).toEqual(patientParamsValidationMiddleware);
        expect(getPatientMiddlewares[1]).toEqual(sendPatientMiddleware);
    });
});
