"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const generic_controller_1 = require("../../generics/generic.controller");
class RoleController extends generic_controller_1.GenericController {
    constructor(usecase) {
        super(usecase);
        this.usecase = usecase;
    }
}
exports.RoleController = RoleController;
