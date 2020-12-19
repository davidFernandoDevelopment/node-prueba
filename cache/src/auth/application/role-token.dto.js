"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleTokenDto = void 0;
const RoleTokenDto = (roles) => {
    const rolesToken = roles.map(role => ({
        name: role.name,
    }));
    return rolesToken;
};
exports.RoleTokenDto = RoleTokenDto;
