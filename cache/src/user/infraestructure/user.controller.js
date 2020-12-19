"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const generic_controller_1 = require("../../generics/generic.controller");
class UserController extends generic_controller_1.GenericController {
    constructor(usecase) {
        super(usecase);
        this.usecase = usecase;
    }
}
exports.UserController = UserController;
