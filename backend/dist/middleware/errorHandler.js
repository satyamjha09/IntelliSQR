"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorLog_1 = require("../models/ErrorLog");
const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    try {
        await ErrorLog_1.ErrorLog.create({
            message,
            stack: err.stack,
            statusCode,
            userId: req.userId,
            endpoint: req.path,
            method: req.method
        });
    }
    catch (logError) {
        console.log('Failed to log error:', logError);
    }
    res.status(statusCode).json({ error: message });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map