"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, success, message, data) => {
    const response = Object.assign({ success,
        message }, (data && { data }));
    return res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
