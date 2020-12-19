"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericUseCase = void 0;
class GenericUseCase {
    constructor(repositoryGeneric) {
        this.repositoryGeneric = repositoryGeneric;
    }
    async insertUseCaseGeneric(item) {
        return this.repositoryGeneric.insertOperationGeneric(item);
    }
    async updateUseCaseGeneric(query, item) {
        return this.repositoryGeneric.updateOperationGeneric(query, item);
    }
    async getUseCaseGeneric(query) {
        return this.repositoryGeneric.getAllOperationGeneric(query);
    }
    async getOneUseCaseGeneric(id) {
        return this.repositoryGeneric.getByIDOperationGeneric(id);
    }
    async deleteUseCaseGeneric(id) {
        return this.repositoryGeneric.deleteOperationGeneric(id);
    }
    async getByPageGeneric(query, page, pageSize) {
        return this.repositoryGeneric.getByPageOperationGeneric(query, page, pageSize);
    }
}
exports.GenericUseCase = GenericUseCase;
