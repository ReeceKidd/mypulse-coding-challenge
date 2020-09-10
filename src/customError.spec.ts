/* eslint-disable */
import { CustomError, ErrorType } from './customError';

describe('customError', () => {
    test(`creates correct error when type is set to InternalServerError`, () => {
        expect.assertions(3);

        const customError = new CustomError(ErrorType.InternalServerError);
        const { code, message, httpStatusCode } = customError;

        expect(code).toBe(`500-01`);
        expect(message).toBe('Internal Server Error.');
        expect(httpStatusCode).toBe(500);
    });

    test(`creates correct error when type is set to SendConsultantMiddleware`, () => {
        expect.assertions(3);

        const customError = new CustomError(ErrorType.SendConsultantMiddleware);
        const { code, message, httpStatusCode } = customError;

        expect(code).toBe(`500-02`);
        expect(message).toBe('Internal Server Error.');
        expect(httpStatusCode).toBe(500);
    });

    test(`creates correct error when type is set to SendPatientMiddleware`, () => {
        expect.assertions(3);

        const customError = new CustomError(ErrorType.SendPatientMiddleware);
        const { code, message, httpStatusCode } = customError;

        expect(code).toBe(`500-03`);
        expect(message).toBe('Internal Server Error.');
        expect(httpStatusCode).toBe(500);
    });

    test(`creates correct error when type is set to SendAppointmentMiddleware`, () => {
        expect.assertions(3);

        const customError = new CustomError(ErrorType.SendAppointmentMiddleware);
        const { code, message, httpStatusCode } = customError;

        expect(code).toBe(`500-04`);
        expect(message).toBe('Internal Server Error.');
        expect(httpStatusCode).toBe(500);
    });

    test(`creates correct error when type is set to CreateAppointmentFromRequestMiddleware`, () => {
        expect.assertions(3);

        const customError = new CustomError(ErrorType.CreateAppointmentFromRequestMiddleware);
        const { code, message, httpStatusCode } = customError;

        expect(code).toBe(`500-05`);
        expect(message).toBe('Internal Server Error.');
        expect(httpStatusCode).toBe(500);
    });

    test(`creates correct error when type is set to SendCreatedAppointmentMiddleware`, () => {
        expect.assertions(3);

        const customError = new CustomError(ErrorType.SendCreatedAppointmentMiddleware);
        const { code, message, httpStatusCode } = customError;

        expect(code).toBe(`500-06`);
        expect(message).toBe('Internal Server Error.');
        expect(httpStatusCode).toBe(500);
    });
});
