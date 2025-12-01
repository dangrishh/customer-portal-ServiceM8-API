import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  bookingId: string;
  message: string;
  sender: "customer" | "system";
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    bookingId: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: String, enum: ["customer", "system"], required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
