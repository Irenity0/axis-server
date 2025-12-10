"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.habitSchema = exports.taskSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email format"),
    password: zod_1.default.string().min(1, "Password is required"),
});
exports.taskSchema = zod_1.default.object({
    type: zod_1.default.enum(["task", "event"]),
    status: zod_1.default.enum(["todo", "in-progress", "done"]).default("todo"),
    title: zod_1.default.string().min(1, "Title is required"),
    description: zod_1.default.string().optional(),
    start: zod_1.default.preprocess((val) => new Date(val), zod_1.default.date()),
    end: zod_1.default.preprocess((val) => new Date(val), zod_1.default.date()),
    allDay: zod_1.default.boolean().default(false),
    email: zod_1.default.string().email("Invalid email format"),
    priority: zod_1.default.enum(["low", "medium", "high"]).default("medium"),
});
exports.habitSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Habit name is required"),
    email: zod_1.default.email("Invalid email format"),
    month: zod_1.default.number().int().min(1).max(12, "Month must be 1-12"),
    year: zod_1.default.number().int().min(2000).max(2100, "Year must be 2000-2100"),
    days: zod_1.default.record(zod_1.default.string(), zod_1.default.boolean()).optional(),
});
