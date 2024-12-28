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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../utils/prisma");
function getAllTypes(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma_1.prisma.type.findMany({
            select: {
                id: true,
                name: true,
                description: true,
            },
            where: {
                name: {
                    contains: name,
                },
            },
        });
        return data;
    });
}
function getTypeById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma_1.prisma.type.findUnique({
            where: {
                id: id,
            },
        });
        return data;
    });
}
function createType(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = yield prisma_1.prisma.type.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return type;
    });
}
function editType(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = yield prisma_1.prisma.type.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return type;
    });
}
function deleteType(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = yield prisma_1.prisma.type.delete({
            where: {
                id: id,
            },
        });
        console.log(type);
        return type;
    });
}
exports.default = { getAllTypes, getTypeById, createType };
