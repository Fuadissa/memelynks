import mongoose, { Schema, Document, Model, models } from "mongoose";

// Define the IUser interface
interface IUser extends Document {
  name?: string;
  email: string;
  image?: string;
}

// Define the schema
const userSchema: Schema<IUser> = new Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true }, // Optional and unique when present
  image: { type: String },
});

// Add a compound index for provider and providerId
userSchema.index({ provider: 1, providerId: 1 }, { unique: true });

// Export the User model
const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);

export default User;
