/* eslint-disable */
import { ResponseCodes } from './Server/responseCodes';

export enum ErrorType {
    InternalServerError,
    SendConsultantsMiddleware,
    SendAppointmentsMiddleware,
    SendPatientsMiddleware,
    CreateAppointmentFromRequestMiddleware,
    SendCreatedAppointmentMiddleware,
    CreateConsultantFromRequestMiddleware,
    SendCreatedConsultantMiddleware,
    CreatePatientFromRequestMiddleware,
    SendCreatedPatientMiddleware,
    CreateConsultationSlotFromRequestMiddleware,
    SendCreatedConsultationSlotMiddleware,
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
            case ErrorType.SendConsultantsMiddleware:
                return {
                    code: `${ResponseCodes.warning}-02`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendPatientsMiddleware:
                return {
                    code: `${ResponseCodes.warning}-03`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendAppointmentsMiddleware:
                return {
                    code: `${ResponseCodes.warning}-04`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.CreateAppointmentFromRequestMiddleware:
                return {
                    code: `${ResponseCodes.warning}-05`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendCreatedAppointmentMiddleware:
                return {
                    code: `${ResponseCodes.warning}-06`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.CreateConsultantFromRequestMiddleware:
                return {
                    code: `${ResponseCodes.warning}-07`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendCreatedConsultantMiddleware:
                return {
                    code: `${ResponseCodes.warning}-08`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.CreatePatientFromRequestMiddleware:
                return {
                    code: `${ResponseCodes.warning}-09`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendCreatedPatientMiddleware:
                return {
                    code: `${ResponseCodes.warning}-10`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.CreateConsultationSlotFromRequestMiddleware:
                return {
                    code: `${ResponseCodes.warning}-11`,
                    message: internalServerMessage,
                    httpStatusCode: ResponseCodes.warning,
                };

            case ErrorType.SendCreatedConsultationSlotMiddleware:
                return {
                    code: `${ResponseCodes.warning}-12`,
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
