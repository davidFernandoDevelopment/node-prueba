"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleOperations = void 0;
const generic_operations_1 = require("../../generics/generic.operations");
class RoleOperations extends generic_operations_1.GenericOperations {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
exports.RoleOperations = RoleOperations;
