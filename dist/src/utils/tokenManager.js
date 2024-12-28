"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const get_env_1 = require("./get-env");
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, get_env_1.jwtSecretKey, { expiresIn: get_env_1.jwtExpiredTime });
}
