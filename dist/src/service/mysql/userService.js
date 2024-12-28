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
const prisma_1 = require("../../utils/prisma");
const bcrypt_1 = require("bcrypt");
const get_env_1 = require("../../utils/get-env");
const tokenManager_1 = __importDefault(require("../../utils/tokenManager"));
const generatePassword_1 = __importDefault(require("../../utils/generatePassword"));
const http_errors_1 = require("http-errors");
function getAllUser(isActive, name, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma_1.prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: name,
                        },
                    },
                    {
                        username: {
                            contains: username,
                        },
                    },
                ],
                AND: {
                    isAdmin: false,
                    isActive: isActive,
                },
            },
            select: {
                id: true,
                username: true,
                name: true,
                isActive: true,
            },
        });
        return users;
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new http_errors_1.NotFound("User not found");
        }
        return user;
    });
}
function userLogin(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const hashPasword = (0, bcrypt_1.hashSync)(user.password, get_env_1.saltRounds);
        const isPasswordMatch = yield (0, bcrypt_1.compare)(password, hashPasword);
        if (!isPasswordMatch) {
            throw new Error("Password is incorrect");
        }
        if (!user.isActive) {
            throw new Error("User is not active");
        }
        const token = (0, tokenManager_1.default)({
            name: user.name,
            username: user.username,
            id: user.id,
            isAdmin: user.isAdmin,
        });
        return token;
    });
}
function createUser(username, name, isActive) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = (0, generatePassword_1.default)();
        const hashPassword = (0, bcrypt_1.hashSync)(password, get_env_1.saltRounds);
        const user = yield prisma_1.prisma.user.create({
            data: {
                username: username,
                name: name,
                password: hashPassword,
                isActive: isActive,
            },
        });
        return {
            username: user.username,
            name: user.name,
            password: password,
        };
    });
}
function changePassword(id, oldPassword, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const hashPassword = (0, bcrypt_1.hashSync)(user.password, get_env_1.saltRounds);
        const isPasswordMatch = yield (0, bcrypt_1.compare)(oldPassword, hashPassword);
        if (!isPasswordMatch) {
            throw new Error("Old password is incorrect");
        }
        const newHashPassword = (0, bcrypt_1.hashSync)(newPassword, get_env_1.saltRounds);
        const userNew = yield prisma_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: newHashPassword,
            },
            select: {
                username: true,
                name: true,
            },
        });
        return userNew;
    });
}
function setActiveUser(id, isActive) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                isActive: isActive,
            },
            select: {
                username: true,
                name: true,
            },
        });
        return user;
    });
}
function resetPassword(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = (0, generatePassword_1.default)();
        const hashPassword = (0, bcrypt_1.hashSync)(password, get_env_1.saltRounds);
        const user = yield prisma_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: hashPassword,
            },
            select: {
                username: true,
                name: true,
                password: true,
            },
        });
        return user;
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                username: true,
                name: true,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield prisma_1.prisma.user.delete({
            where: {
                id: id,
            },
        });
        return user;
    });
}
exports.default = { getAllUser, getUserById, userLogin, createUser, changePassword, setActiveUser, resetPassword, deleteUser };
