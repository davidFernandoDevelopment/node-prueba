"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicController = void 0;
const generic_controller_1 = require("../../generics/generic.controller");
class MedicController extends generic_controller_1.GenericController {
    constructor(usecase) {
        super(usecase);
        this.usecase = usecase;
    }
    getLocationController() {
        this.usecase.getLocationUseCase();
    }
}
exports.MedicController = MedicController;
