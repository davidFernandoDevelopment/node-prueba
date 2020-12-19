"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = void 0;
class AuthorizationGuard {
    static conActivate(...rolesAllowed) {
        return (req, res, next) => {
            const { roles } = res.locals.payload;
            let flag = false;
            roles.forEach((role) => {
                if (rolesAllowed.indexOf(role.name) > -1) {
                    flag = true;
                    next();
                    return;
                }
            });
            if (!flag) {
                res.status(409).send('User not authorized');
            }
        };
    }
}
exports.AuthorizationGuard = AuthorizationGuard;
