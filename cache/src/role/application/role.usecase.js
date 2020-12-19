"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUseCase = void 0;
const generic_usecase_1 = require("../../generics/generic.usecase");
class RoleUseCase extends generic_usecase_1.GenericUseCase {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
}
exports.RoleUseCase = RoleUseCase;
