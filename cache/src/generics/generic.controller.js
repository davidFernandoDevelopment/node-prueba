"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericController = void 0;
class GenericController {
    constructor(usecaseGeneric) {
        this.usecaseGeneric = usecaseGeneric;
    }
    async insertControllerGeneric(item) {
        return this.usecaseGeneric.insertUseCaseGeneric(item);
    }
    async updateControllerGeneric(query, item) {
        return this.usecaseGeneric.updateUseCaseGeneric(query, item);
    }
    async getControllerGeneric(query) {
        return this.usecaseGeneric.getUseCaseGeneric(query);
    }
    async getOneControllerGeneric(id) {
        return this.usecaseGeneric.getOneUseCaseGeneric(id);
    }
    async deleteControllerGeneric(id) {
        return this.usecaseGeneric.deleteUseCaseGeneric(id);
    }
    async getByPageControllerGeneric(query = {}, page, pageSize) {
        return this.usecaseGeneric.getByPageGeneric(query, page, pageSize);
    }
}
exports.GenericController = GenericController;
