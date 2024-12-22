import { model, models, Schema, Document } from "mongoose";

// Define the interface for the Event document
interface IEvent extends Document {
  type: string; // 'click' or 'view'
  page: string; // For example, "dawid"
  uri: string;  // e.g., "/dawid" or "https://example.com"
}

// Create the schema using the interface
const EventSchema = new Schema<IEvent>(
  {
    type: { type: String, required: true },
    page: { type: String, required: true },
    uri: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the model
export const Event = models?.Event || model<IEvent>("Event", EventSchema);
