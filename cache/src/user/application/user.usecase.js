"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const generic_usecase_1 = require("../../generics/generic.usecase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserUseCase extends generic_usecase_1.GenericUseCase {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async insertUseCaseGeneric(user) {
        const password = await bcryptjs_1.default.hash(user.password, 10);
        user.password = password;
        return this.repository.insertOperationGeneric(user);
    }
}
exports.UserUseCase = UserUseCase;
