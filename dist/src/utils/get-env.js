"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saltRounds = exports.jwtExpiredTime = exports.jwtSecretKey = void 0;
const zod_1 = require("zod");
exports.jwtSecretKey = zod_1.z.string().min(1).parse(process.env.JWT_SECRET);
exports.jwtExpiredTime = zod_1.z.string().min(1).parse(process.env.JWT_EXPIRED);
exports.saltRounds = zod_1.z.number().int().min(1).parse(process.env.SALT_ROUNDS);
