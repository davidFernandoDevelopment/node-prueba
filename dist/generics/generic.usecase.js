"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GenericUseCase=void 0;class GenericUseCase{constructor(e){this.repositoryGeneric=e}async insertUseCaseGeneric(e){return this.repositoryGeneric.insertOperationGeneric(e)}async updateUseCaseGeneric(e,r){return this.repositoryGeneric.updateOperationGeneric(e,r)}async getUseCaseGeneric(e){return this.repositoryGeneric.getAllOperationGeneric(e)}async getOneUseCaseGeneric(e){return this.repositoryGeneric.getByIDOperationGeneric(e)}async deleteUseCaseGeneric(e){return this.repositoryGeneric.deleteOperationGeneric(e)}async getByPageGeneric(e,r,s){return this.repositoryGeneric.getByPageOperationGeneric(e,r,s)}}exports.GenericUseCase=GenericUseCase;