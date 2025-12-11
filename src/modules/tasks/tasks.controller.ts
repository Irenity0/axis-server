import { Request, Response } from "express";
import { TaskService } from "./tasks.service";

export const TaskController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const tasks = await TaskService.getAll();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tasks", error: err });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { text, priority } = req.body;

      if (!text) return res.status(400).json({ message: "Task text required" });

      const task = await TaskService.create({
        text,
        priority: priority || "medium",
      });

      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: "Failed to create task", error: err });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updated = await TaskService.update(id, req.body);

      if (!updated) return res.status(404).json({ message: "Task not found" });

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Failed to update task", error: err });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deleted = await TaskService.delete(id);

      if (!deleted) return res.status(404).json({ message: "Task not found" });

      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete task", error: err });
    }
  },
};
