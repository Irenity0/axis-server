"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Catch invalid JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON payload. Please fix your request body.",
        });
    }
    next(err);
});
// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Axis server is running uwu",
        timestamp: new Date().toISOString(),
    });
});
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Axis server uwu",
    });
});
// Global error handler
app.use((error, req, res, next) => {
    console.error("Global Error:", error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
});
exports.default = app;
