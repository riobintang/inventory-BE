"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = __importDefault(require("../app/user/handler"));
const authToken_1 = require("../middleware/authToken");
const router = (0, express_1.Router)();
router.post("/login", handler_1.default.userLogin);
router.post("/change-password", authToken_1.verify, handler_1.default.changePasswordUser);
router.get("/me", authToken_1.verify, handler_1.default.getProfile);
exports.default = router;
