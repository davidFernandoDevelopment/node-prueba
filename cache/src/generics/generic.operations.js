"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericOperations = void 0;
// INFRA: ESTE REPO GENERICO SOLO FUNCIONARA CON MONGOOSE
// T => MODELO
// U => FORMATO DE RPTA
class GenericOperations {
    constructor(modelGeneric) {
        this.modelGeneric = modelGeneric;
    }
    async getAllOperationGeneric(query = {}) {
        const items = await this.modelGeneric.find(query);
        return items;
    }
    async getByIDOperationGeneric(id) {
        const item = await this.modelGeneric.findById(id);
        return item;
    }
    async getByPageOperationGeneric(query = {}, page, pageSize) {
        const items = await this.modelGeneric
            .find(query)
            .skip(page * pageSize)
            .limit(pageSize);
        const total = await this.modelGeneric.find(query).countDocuments();
        return { total, items };
    }
    async insertOperationGeneric(item) {
        const itemInserted = await this.modelGeneric.create(item);
        return itemInserted;
    }
    async updateOperationGeneric(query = {}, item) {
        const itemUpdated = await this.modelGeneric.findOneAndUpdate(query, item, {
            new: true,
        });
        return itemUpdated;
    }
    async deleteOperationGeneric(id) {
        const itemDeleted = await this.modelGeneric.findByIdAndUpdate(id, {
            isActive: false,
        }, { new: true });
        return itemDeleted;
    }
}
exports.GenericOperations = GenericOperations;
