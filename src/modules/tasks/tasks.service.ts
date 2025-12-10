import { Task } from "./tasks.model";

export const TaskService = {
  getAll: async () => {
    return await Task.find().sort({ createdAt: -1 });
  },

  create: async (data: { text: string; priority?: string }) => {
    return await Task.create({
      text: data.text,
      priority: data.priority || "medium",
    });
  },

  update: async (
    id: string,
    data: Partial<{ text: string; completed: boolean; priority: string }>
  ) => {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string) => {
    return await Task.findByIdAndDelete(id);
  },
};
