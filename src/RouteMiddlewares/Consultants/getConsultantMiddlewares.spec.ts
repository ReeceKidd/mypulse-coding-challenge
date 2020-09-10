/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    consultantParamsValidationMiddleware,
    sendConsultantMiddleware,
    getConsultantMiddlewares,
} from './getConsultantMiddlewares';

describe(`consultantParamsValidationMiddleware`, () => {
    const consultantId = '5d43f0c2f4499975cb312b72';

    test('calls next() when correct params are supplied', () => {
        expect.assertions(1);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const request: any = {
            params: { consultantId },
        };
        const response: any = {
            status,
        };
        const next = jest.fn();

        consultantParamsValidationMiddleware(request, response, next);

        expect(next).toBeCalled();
    });
});

describe('sendRetrieveConsultantResponseMiddleware', () => {
    test('sends consultant', () => {
        expect.assertions(3);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const consultant = { _id: 'abc' };
        const request: any = {};
        const response: any = { locals: { consultant }, status };
        const next = jest.fn();

        sendConsultantMiddleware(request, response, next);

        expect(next).not.toBeCalled();
        expect(status).toBeCalledWith(200);
        expect(send).toBeCalledWith(consultant);
    });
});

describe('getConsultantMiddlewares', () => {
    test('are defined in the correct order', () => {
        expect.assertions(3);

        expect(getConsultantMiddlewares.length).toEqual(2);
        expect(getConsultantMiddlewares[0]).toEqual(consultantParamsValidationMiddleware);
        expect(getConsultantMiddlewares[1]).toEqual(sendConsultantMiddleware);
    });
});
