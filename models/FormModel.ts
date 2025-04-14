import mongoose, { Document, Model, Schema } from 'mongoose';
import { IForm } from '@/types/index';

export interface IFormDocument extends IForm, Document { }

const InputElementSchema = new Schema({
    placeholder: String,
    heading: String,
});

const TextAreaElementSchema = new Schema({
    placeholder: String,
    required: Boolean,
    label: String,
    heading: String,
});

const HeadingElementSchema = new Schema({
    level: String,
    heading: String,
});

const ParagraphElementSchema = new Schema({
    content: String,
});

const elementDataSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['input', 'textarea', 'heading', 'paragraph'],
            required: true,
        },
        data: {
            type: Schema.Types.Mixed, 
            required: true,
        },
    },
    { _id: false }
);

const FormElementSchema = new Schema({
    id: { type: String, required: true },
    position: Number,
    type: {
      type: String,
      enum: ['input', 'textarea', 'heading', 'paragraph'],
      required: true,
    },
    required: Boolean,
    data: Schema.Types.Mixed, 
  });

const formSchema = new mongoose.Schema<IFormDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    theme: { type: String },
    elements: [FormElementSchema],
    owner: { type: String, required: true },
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response', default: [] }],
}, {
    timestamps: true
});

const FormModel: Model<IFormDocument> = mongoose.models.Form || mongoose.model<IFormDocument>('Form', formSchema);
export default FormModel;
