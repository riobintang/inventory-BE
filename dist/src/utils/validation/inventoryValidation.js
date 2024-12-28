"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInventory = void 0;
const zod_1 = require("zod");
exports.validateInventory = zod_1.z.object({
    code: zod_1.z.string().min(3),
    name: zod_1.z.string().min(3),
    description: zod_1.z.string().min(5),
    quantity: zod_1.z.number().int().min(1),
    type: zod_1.z.number().int().min(1),
});
