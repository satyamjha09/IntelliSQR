"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLog = void 0;
const errorLogSchema = new Schema({
    message: { type: String, required: true },
    stack: String,
    statusCode: { type: Number, required: true },
    userId: String,
    endpoint: { type: String, required: true },
    method: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
exports.ErrorLog = model('ErrorLog', errorLogSchema);
//# sourceMappingURL=ErrorLog.js.map