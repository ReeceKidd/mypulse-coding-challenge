/* eslint-disable */
import { ResponseCodes } from './Server/responseCodes';

export enum ErrorType {
    InternalServerError,
    SendConsultantMiddleware,
    SendAppointmentMiddleware,
    SendPatientMiddleware,
}

const internalServerMessage = 'Internal Server Error.';

export class CustomError extends Error {
    public code: string;
    public message: string;
    public httpStatusCode: ResponseCodes;

    constructor(type: ErrorType, err?: Error) {
        super();
        const { code, message, httpStatusCode } = this.createCustomErrorData(type);
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

    private createCustomErrorData(type: ErrorType): { code: string; message: string; httpStatusCode: ResponseCodes } {
        switch (type) {
            case ErrorType.SendConsultantMiddleware:
                return {
                    code: `${ResponseCodes.warning}-02`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendPatientMiddleware:
                return {
                    code: `${ResponseCodes.warning}-03`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendAppointmentMiddleware:
                return {
                    code: `${ResponseCodes.warning}-04`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            default:
                return {
                    code: `${ResponseCodes.warning}-01`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };
        }
    }
}
