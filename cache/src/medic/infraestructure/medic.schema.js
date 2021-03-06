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
            surname: joi_1.default.string().required().trim(),
            lastname: joi_1.default.string().required().trim(),
            cmp: joi_1.default.string().required().trim(),
            dni: joi_1.default.string().required().trim(),
            photo: joi_1.default.string().required().trim(),
            email: joi_1.default.string().email().required().trim(),
            locations: joi_1.default.array().required(),
        }),
    },
    PUT_UPDATE: {
        params: joi_1.default.object({
            id: joi_1.default.string(),
        }),
        body: joi_1.default.object({
            name: joi_1.default.string().trim(),
            surname: joi_1.default.string().trim(),
            lastname: joi_1.default.string().trim(),
            cmp: joi_1.default.string().trim(),
            dni: joi_1.default.string().trim(),
            photo: joi_1.default.string().trim(),
            email: joi_1.default.string().email().trim(),
            locations: joi_1.default.array(),
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
