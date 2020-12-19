"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens = void 0;
const moment_1 = __importDefault(require("moment"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const yenv_1 = __importDefault(require("yenv"));
const uuid_1 = require("uuid");
const env = yenv_1.default();
class Tokens {
    static generateAccessToken(user) {
        const payload = {
            iat: moment_1.default().unix(),
            exp: moment_1.default().add(env.TOKEN.TIMEOUT, env.TOKEN.UNITS).unix(),
            name: user.name,
            roles: user.roles,
        };
        const accessToken = jwt_simple_1.default.encode(payload, env.TOKEN.KEYWORD);
        return accessToken;
    }
    static generateRefreshToken() {
        const refreshToken = uuid_1.v4();
        return refreshToken;
    }
    static validateAccessToken(accessToken) {
        return new Promise((resolve, reject) => {
            try {
                const payload = jwt_simple_1.default.decode(accessToken, env.TOKEN.KEYWORD);
                resolve(payload);
            }
            catch (error) {
                if (error.message.toLowerCase() === 'token expired') {
                    reject({
                        status: 409,
                        message: 'Token expired',
                    });
                }
                else {
                    reject({
                        status: 401,
                        message: 'Token invalid, no seas raton modificando el token !!!',
                    });
                }
            }
        });
    }
}
exports.Tokens = Tokens;
