"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Tokens=void 0;const moment_1=__importDefault(require("moment")),jwt_simple_1=__importDefault(require("jwt-simple")),yenv_1=__importDefault(require("yenv")),uuid_1=require("uuid"),env=yenv_1.default();class Tokens{static generateAccessToken(e){const t={iat:moment_1.default().unix(),exp:moment_1.default().add(env.TOKEN.TIMEOUT,env.TOKEN.UNITS).unix(),name:e.name,roles:e.roles};return jwt_simple_1.default.encode(t,env.TOKEN.KEYWORD)}static generateRefreshToken(){return uuid_1.v4()}static validateAccessToken(e){return new Promise((t,s)=>{try{t(jwt_simple_1.default.decode(e,env.TOKEN.KEYWORD))}catch(e){"token expired"===e.message.toLowerCase()?s({status:409,message:"Token expired"}):s({status:401,message:"Token invalid, no seas raton modificando el token !!!"})}})}}exports.Tokens=Tokens;