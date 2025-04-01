import mongoose, { Schema, Document, Model } from "mongoose";

interface IElementResponse {
  elementId: string;
  response: any;
}

export interface IResponse extends Document {
  formId: mongoose.Types.ObjectId;
  responses: IElementResponse[];
  createdAt: Date;
}

const responseSchema: Schema<IResponse> = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  responses: [
    {
      elementId: {
        type: String,
        required: true,
      },
      response: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ResponseModel: Model<IResponse> =
  mongoose.models.Response || mongoose.model<IResponse>("Response", responseSchema);

export default ResponseModel;
