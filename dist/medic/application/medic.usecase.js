"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MedicUseCase=void 0;const generic_usecase_1=require("../../generics/generic.usecase");class MedicUseCase extends generic_usecase_1.GenericUseCase{constructor(e){super(e),this.repository=e}getLocationUseCase(){this.repository.getLocation()}}exports.MedicUseCase=MedicUseCase;