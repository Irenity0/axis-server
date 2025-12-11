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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../../utils/response");
const user_model_1 = require("../user/user.model");
const generateToken = (payload) => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
    const signOptions = {
        expiresIn: jwtExpiresIn,
    };
    return jsonwebtoken_1.default.sign(payload, jwtSecret, signOptions);
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user and include password
        const user = yield user_model_1.User.findOne({ email }).select("+password");
        if (!user) {
            return (0, response_1.sendError)(res, 401, "Invalid email or password");
        }
        // Check password
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            return (0, response_1.sendError)(res, 401, "Invalid email or password");
        }
        // Generate JWT token
        const token = generateToken({ id: user._id });
        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return (0, response_1.sendResponse)(res, 200, true, "Login successful", {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token,
        });
    }
    catch (error) {
        return (0, response_1.sendError)(res, 500, "Login failed", error.message);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        return (0, response_1.sendResponse)(res, 200, true, "Logout successful");
    }
    catch (error) {
        return (0, response_1.sendError)(res, 500, "Logout failed", error.message);
    }
});
exports.logout = logout;
