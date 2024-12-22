/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, models, Schema, Document, Types } from "mongoose";

// Define the interface for the Page document
interface IPage extends Document {
  uri: string;
  owner: string;
  ownerProvider: string;
  memeName?: string;
  embedded?: string;
  memeMoment?: string;
  bgType?: string;
  bgColor?: string;
  bgImage?: string;
  buttons?: Record<string, any>;
  links?: any[];
  memeColor?: string;
  userId?: Types.ObjectId; // Reference to the User model
}

// Create the schema using the interface
const PageSchema = new Schema<IPage>(
  {
    uri: { type: String, required: true, minlength: 1, unique: true },
    owner: { type: String, required: true },
    ownerProvider: { type: String, required: true },
    memeName: { type: String, default: "" },
    embedded: { type: String, default: "" },
    memeMoment: { type: String, default: "" },
    bgType: { type: String, default: "color" },
    bgColor: { type: String, default: "#000" },
    memeColor: { type: String, default: "#000" },
    bgImage: { type: String, default: "" },
    buttons: { type: Object, default: {} },
    links: { type: Array, default: [] },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  },
  { timestamps: true }
);

// Export the model
export const Page = models?.Page || model<IPage>("Page", PageSchema);
