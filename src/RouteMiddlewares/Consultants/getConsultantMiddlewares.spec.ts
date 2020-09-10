/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    consultantParamsValidationMiddleware,
    sendConsultantsMiddleware,
    getConsultantsMiddlewares,
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

describe('sendConsultantsMiddleware', () => {
    test('sends consultants', () => {
        expect.assertions(3);
        const send = jest.fn();
        const status = jest.fn(() => ({ send }));
        const consultants = [{ _id: 'abc' }];
        const request: any = {};
        const response: any = { locals: { consultants }, status };
        const next = jest.fn();

        sendConsultantsMiddleware(request, response, next);

        expect(next).not.toBeCalled();
        expect(status).toBeCalledWith(200);
        expect(send).toBeCalledWith(consultants);
    });
});

describe('getConsultantMiddlewares', () => {
    test('are defined in the correct order', () => {
        expect.assertions(3);

        expect(getConsultantsMiddlewares.length).toEqual(2);
        expect(getConsultantsMiddlewares[0]).toEqual(consultantParamsValidationMiddleware);
        expect(getConsultantsMiddlewares[1]).toEqual(sendConsultantsMiddleware);
    });
});
