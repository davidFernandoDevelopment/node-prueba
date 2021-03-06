"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schemas = {
    POST_INSERT: {
        body: joi_1.default.object({
            name: joi_1.default.string().required().trim(),
        }),
    },
    PUT_UPDATE: {
        params: joi_1.default.object({
            id: joi_1.default.string(),
        }),
        body: joi_1.default.object({
            name: joi_1.default.string().trim(),
        }),
    },
    GET_GETONE: {
        params: joi_1.default.object({
            id: joi_1.default.string().required(),
        }),
    },
    DELETE: {
        params: joi_1.default.object({
            id: joi_1.default.string().required(),
        }),
    },
    GET_PAGINATION: {
        params: joi_1.default.object({
            page: joi_1.default.number().required(),
        }),
    },
};
