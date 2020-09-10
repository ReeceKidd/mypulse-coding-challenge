import * as mongoose from 'mongoose';

export type ConsultantModel = { name: string } & mongoose.Document;

export const ConsultantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        collection: 'Consultants',
    },
);

export const consultantModel: mongoose.Model<ConsultantModel> = mongoose.model<ConsultantModel>(
    'Consultant',
    ConsultantSchema,
);
