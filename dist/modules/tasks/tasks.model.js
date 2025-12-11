"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", TaskSchema);
