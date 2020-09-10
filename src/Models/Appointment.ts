import * as mongoose from 'mongoose';
import { PatientModel } from './Patient';

export type AppointmentModel = {
    patientName: string;
    patientId: string;
    consultantName: string;
    consultantId: string;
    startTime: Date;
} & mongoose.Document;

export const AppointmentSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true,
            trim: true,
        },
        patientId: {
            type: String,
            required: true,
        },
        consultantName: {
            type: String,
            required: true,
            trim: true,
        },
        consultantId: {
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'Appointments',
    },
);

export const appointmentModel: mongoose.Model<AppointmentModel> = mongoose.model<AppointmentModel>(
    'Appointment',
    AppointmentSchema,
);
