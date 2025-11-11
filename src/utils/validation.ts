import z from "zod";

export const loginSchema = z.object({
      email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

export const taskSchema = z.object({
  type: z.enum(["task", "event"]),
  status: z.enum(["todo", "in-progress", "done"]).default("todo"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  start: z.preprocess((val) => new Date(val as string), z.date()),
  end: z.preprocess((val) => new Date(val as string), z.date()),
  allDay: z.boolean().default(false),
  email: z.string().email("Invalid email format"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export const habitSchema = z.object({
  name: z.string().min(1, "Habit name is required"),
  email: z.email("Invalid email format"),
  month: z.number().int().min(1).max(12, "Month must be 1-12"),
  year: z.number().int().min(2000).max(2100, "Year must be 2000-2100"),
  days: z.record(z.string(), z.boolean()).optional(),
});
