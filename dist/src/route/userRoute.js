"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_1 = __importDefault(require("../app/user/handler"));
const authToken_1 = require("../middleware/authToken");
const router = (0, express_1.Router)();
router.get("/:id", authToken_1.verify, authToken_1.verifyAdmin, handler_1.default.getUserById);
router.get("/all", authToken_1.verify, authToken_1.verifyAdmin, handler_1.default.getAllUser);
router.get("/:id", authToken_1.verify, authToken_1.verifyAdmin, handler_1.default.getUserById);
router.post("/add", authToken_1.verify, authToken_1.verifyAdmin, handler_1.default.addAuditor);
router.post("/setactive/:id", authToken_1.verify, authToken_1.verifyAdmin, handler_1.default.settingActiveUser);
router.post("resetpasswordaudit/:id", authToken_1.verify, authToken_1.verifyAdmin, handler_1.default.resetPasswordAuditor);
router.delete("/:id", authToken_1.verify, authToken_1.verifyAdmin, handler_1.default.deleteUser);
exports.default = router;
