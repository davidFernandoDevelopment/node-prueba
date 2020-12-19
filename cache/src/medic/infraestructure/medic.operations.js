"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicOperations = void 0;
const generic_operations_1 = require("../../generics/generic.operations");
class MedicOperations extends generic_operations_1.GenericOperations {
    constructor(model) {
        super(model);
        this.model = model;
    }
    getLocation() {
        throw new Error('Method not implemented.');
    }
}
exports.MedicOperations = MedicOperations;
