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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validation_1 = require("../../utils/validation");
const response_1 = require("../../utils/response");
const user_model_1 = require("../user/user.model");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validate request body
        const parseResult = validation_1.loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return (0, response_1.sendResponse)(res, 400, false, "Invalid input", parseResult.error.format());
        }
        const { email, password } = parseResult.data;
        // 2. Find me
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return (0, response_1.sendResponse)(res, 401, false, "Invalid email or password");
        }
        // 3. Compare passwords
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return (0, response_1.sendResponse)(res, 401, false, "Invalid email or password");
        }
        // 4. res
        return (0, response_1.sendResponse)(res, 200, true, "Login successful", {
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Server error", error.message);
    }
});
exports.login = login;
