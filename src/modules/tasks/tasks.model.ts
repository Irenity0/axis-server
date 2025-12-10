import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", TaskSchema);
