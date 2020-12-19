"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicUseCase = void 0;
const generic_usecase_1 = require("../../generics/generic.usecase");
class MedicUseCase extends generic_usecase_1.GenericUseCase {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    getLocationUseCase() {
        this.repository.getLocation();
    }
}
exports.MedicUseCase = MedicUseCase;
// SOLO SE INSTANCIARA 1 VEZ
