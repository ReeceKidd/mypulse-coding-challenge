import * as mongoose from 'mongoose';
import { PatientModel } from './Patient';

export type ConsultationSlotModel = {
    patientName: string;
    patientId: string;
    consultantName: string;
    consultantId: string;
    startTime: Date;
} & mongoose.Document;

export const ConsultationSlotSchema = new mongoose.Schema(
    {
        availabilityStartTime: {
            type: Date,
            required: true,
        },
        availabilityEndTime: {
            type: Date,
            required: true,
        },
        consultantId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'ConsultationSlots',
    },
);

export const appointmentModel: mongoose.Model<ConsultationSlotModel> = mongoose.model<ConsultationSlotModel>(
    'ConsultationSlot',
    ConsultationSlotSchema,
);
