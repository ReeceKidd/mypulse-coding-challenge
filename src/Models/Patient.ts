import * as mongoose from 'mongoose';

export type PatientModel = { name: string } & mongoose.Document;

export const PatientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        collection: 'Patients',
    },
);

export const PatientModel: mongoose.Model<PatientModel> = mongoose.model<PatientModel>('Patient', PatientSchema);
