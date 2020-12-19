"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOperations = void 0;
const generic_operations_1 = require("../../generics/generic.operations");
class UserOperations extends generic_operations_1.GenericOperations {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
exports.UserOperations = UserOperations;
