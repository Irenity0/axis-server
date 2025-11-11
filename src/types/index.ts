import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export interface ITask extends Document {
  _id: string;
  type: "task" | "event";
  status: "todo" | "in-progress" | "done";
  title: String;
  description: String;
  start: Date;
  end: Date;
  allDay: Boolean;
  email: String;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

export interface IHabit extends Document {
  name: String; // e.g., "Workout", "Read 10 pages"
  email: String; // user identifier
  month: Number; // e.g., 11 for November
  year: Number; // e.g., 2025
  days: {
    [day: number]: boolean; // maps day (1–31) to completion status
  };
  createdAt: Date;
  updatedAt: Date;
}


export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}