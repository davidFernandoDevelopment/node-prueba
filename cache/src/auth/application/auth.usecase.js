"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_service_1 = require("./auth.service");
const role_token_dto_1 = require("./role-token.dto");
class AuthUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async loginUseCase(user) {
        const response = await this.repository.loginOperation(user);
        if (!response)
            return { status: false, message: 'El usuario no existe' };
        const { name, roles, password } = response;
        const userMatched = { name, roles, password };
        userMatched.roles = role_token_dto_1.RoleTokenDto(userMatched.roles);
        const matched = await bcryptjs_1.default.compare(user.password, userMatched.password);
        if (matched) {
            return {
                status: true,
                accessToken: auth_service_1.Tokens.generateAccessToken(userMatched),
                refreshToken: auth_service_1.Tokens.generateRefreshToken(),
            };
        }
        return { status: false, message: 'Contraseña incorrecta' };
    }
}
exports.AuthUseCase = AuthUseCase;
