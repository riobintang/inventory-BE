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
const userService_1 = __importDefault(require("../../service/mysql/userService"));
const userValidation_1 = require("../../utils/validation/userValidation");
function getAllUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield userService_1.default.getAllUser();
        const dataMsg = {
            status: "success",
            message: "Successfully get all User",
            data: { user: data },
        };
        return res.status(200).json(dataMsg);
    });
}
function getUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield userService_1.default.getUserById(id);
        if (!data) {
            const dataMsg = {
                status: "success",
                message: "Successfully get User by id",
                data: { user: data },
            };
            return res.status(200).json(dataMsg);
        }
    });
}
function userLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = userValidation_1.validateLogin.parse(req.body);
        const token = yield userService_1.default.userLogin(username, password);
        const dataMsg = {
            status: "success",
            message: "Successfully login",
            data: { token: token },
        };
        return res.status(200).json(dataMsg);
    });
}
function addAuditor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, username } = userValidation_1.validateCreate.parse(req.body);
        const data = yield userService_1.default.createUser(name, username);
        const dataMsg = {
            status: "success",
            message: "Successfully add Auditor",
            data: { user: data },
        };
        return res.status(201).json(dataMsg);
    });
}
function changePasswordUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { oldPassword, newPassword } = userValidation_1.validateChangePassword.parse(req.body);
        yield userService_1.default.changePassword(req.userauth.id, oldPassword, newPassword);
        const dataMsg = {
            status: "success",
            message: "Successfully change password",
        };
        return res.status(200).json(dataMsg);
    });
}
function settingActiveUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { isActive } = userValidation_1.validateSetIsActive.parse(req.body);
        yield userService_1.default.setActiveUser(id, isActive);
        const dataMsg = {
            status: "success",
            message: "Successfully setting active user",
        };
        return res.status(200).json(dataMsg);
    });
}
function resetPasswordAuditor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield userService_1.default.resetPassword(id);
        const dataMsg = {
            status: "success",
            message: "Successfully reset password auditor",
        };
        return res.status(200).json(dataMsg);
    });
}
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield userService_1.default.deleteUser(id);
        const dataMsg = {
            status: "success",
            message: "Successfully delete user",
        };
        return res.status(200).json(dataMsg);
    });
}
function getProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield userService_1.default.getUserById(req.userauth.id);
        const dataMsg = {
            status: "success",
            message: "Successfully get profile",
            data: { user: data },
        };
        return res.status(200).json(dataMsg);
    });
}
exports.default = {
    getAllUser,
    getUserById,
    userLogin,
    addAuditor,
    changePasswordUser,
    settingActiveUser,
    resetPasswordAuditor,
    deleteUser,
    getProfile,
};
