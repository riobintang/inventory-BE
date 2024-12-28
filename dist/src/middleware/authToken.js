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
exports.verify = verify;
exports.verifyAdmin = verifyAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = require("http-errors");
const get_env_1 = require("../utils/get-env");
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = req.headers.authorization;
        if (!auth) {
            throw (0, http_errors_1.BadRequest)("Token is required");
        }
        const token = auth.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, get_env_1.jwtSecretKey);
        const { id, isAdmin } = JSON.parse(JSON.stringify(decoded));
        req.userauth.id = id;
        req.userauth.isAdmin = isAdmin;
        return next();
    });
}
function verifyAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAdmin = req.userauth.isAdmin;
        if (!isAdmin) {
            throw (0, http_errors_1.BadRequest)("You are not allowed to access");
        }
        return next();
    });
}
