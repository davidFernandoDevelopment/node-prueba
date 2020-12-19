"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(usecase) {
        this.usecase = usecase;
    }
    async loginController(user) {
        return await this.usecase.loginUseCase(user);
    }
}
exports.AuthController = AuthController;
