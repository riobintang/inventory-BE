"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generatePassword;
function generatePassword(size = 12) {
    const bytes = new Uint8Array(size);
    crypto.getRandomValues(bytes);
    return btoa(String.fromCharCode(...bytes)).substring(0, size);
}
