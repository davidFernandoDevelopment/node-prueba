"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthOperations = void 0;
const user_model_1 = __importDefault(require("../../user/infraestructure/user.model"));
class AuthOperations {
    async loginOperation(user) {
        const response = await user_model_1.default.findOne({
            email: user.email,
        }).populate('roles');
        return response;
    }
}
exports.AuthOperations = AuthOperations;
