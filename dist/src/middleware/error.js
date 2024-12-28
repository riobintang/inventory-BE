"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
function error(e, req, res, next) {
    const body = {
        status: "fail",
        message: e.message,
    };
    if (e instanceof http_errors_1.HttpError) {
        return res.status(e.statusCode).json(body);
    }
    if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return res.status(409).json(body);
    }
    if (e instanceof jsonwebtoken_1.JsonWebTokenError) {
        return res.status(401).json(body);
    }
    body.status = "error";
    body.message = "Internal Server Error";
    return res.status(500).json(body);
}
exports.default = error;
