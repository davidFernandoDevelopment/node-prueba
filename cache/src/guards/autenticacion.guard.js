"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const auth_service_1 = require("../auth/application/auth.service");
class AuthenticationGuard {
    static conActivate(req, res, next) {
        const headers = req.headers;
        const authorization = headers['authorization'];
        if (authorization) {
            const partsAuthorization = authorization.split(' ');
            if (partsAuthorization.length < 2) {
                res.status(401).send('User not logged');
            }
            else {
                const accessToken = partsAuthorization[1];
                auth_service_1.Tokens.validateAccessToken(accessToken).then(payload => {
                    res.locals.payload = payload;
                    next();
                }, (error) => {
                    res.status(error.status).send(error.message);
                });
            }
        }
        else {
            res.status(401).send('User not logged');
        }
    }
}
exports.AuthenticationGuard = AuthenticationGuard;
