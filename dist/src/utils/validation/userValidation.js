"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSetIsActive = exports.validateChangePassword = exports.validateCreate = exports.validateLogin = void 0;
const zod_1 = require("zod");
exports.validateLogin = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
});
exports.validateCreate = zod_1.z.object({
    username: zod_1.z.string().min(5),
    name: zod_1.z.string().min(4),
    password: zod_1.z.string().min(8),
});
exports.validateChangePassword = zod_1.z.object({
    oldPassword: zod_1.z.string().min(8),
    newPassword: zod_1.z.string().min(8),
});
exports.validateSetIsActive = zod_1.z.object({
    isActive: zod_1.z.boolean(),
});
