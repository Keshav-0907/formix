import mongoose, { Document, Model } from 'mongoose';
import { IForm } from '@/types/index';

export interface IFormDocument extends IForm, Document {}

const formSchema = new mongoose.Schema<IFormDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    theme: { type: String },
    elements: { type: [Object], default: [] },
    owner: { type: String, required: true },
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response', default: [] }],
}, {
    timestamps: true
});

const FormModel: Model<IFormDocument> = mongoose.models.Form || mongoose.model<IFormDocument>('Form', formSchema);
export default FormModel;
