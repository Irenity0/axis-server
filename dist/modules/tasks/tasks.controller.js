"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const tasks_service_1 = require("./tasks.service");
exports.TaskController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tasks = yield tasks_service_1.TaskService.getAll();
            res.json(tasks);
        }
        catch (err) {
            res.status(500).json({ message: "Failed to fetch tasks", error: err });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { text, priority } = req.body;
            if (!text)
                return res.status(400).json({ message: "Task text required" });
            const task = yield tasks_service_1.TaskService.create({
                text,
                priority: priority || "medium",
            });
            res.status(201).json(task);
        }
        catch (err) {
            res.status(500).json({ message: "Failed to create task", error: err });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updated = yield tasks_service_1.TaskService.update(id, req.body);
            if (!updated)
                return res.status(404).json({ message: "Task not found" });
            res.json(updated);
        }
        catch (err) {
            res.status(500).json({ message: "Failed to update task", error: err });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deleted = yield tasks_service_1.TaskService.delete(id);
            if (!deleted)
                return res.status(404).json({ message: "Task not found" });
            res.json({ message: "Task deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Failed to delete task", error: err });
        }
    }),
};
