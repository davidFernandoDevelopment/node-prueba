import { Model } from 'mongoose';
import { IRepository } from './generic.repository';

// INFRA: ESTE REPO GENERICO SOLO FUNCIONARA CON MONGOOSE

// T => MODELO
// U => FORMATO DE RPTA
export abstract class GenericOperations<T extends Model<any>, U>
	implements IRepository<U> {
	constructor(private readonly modelGeneric: T) {}
	async getAllOperationGeneric(query: any = {}): Promise<U[]> {
		const items: U[] = await this.modelGeneric.find(query);
		return items;
	}
	async getByIDOperationGeneric(id: number | string): Promise<U> {
		const item: U = await this.modelGeneric.findById(id);
		return item;
	}
	async getByPageOperationGeneric(
		query: any = {},
		page: number,
		pageSize: number
	): Promise<{ total: number; items: U[] }> {
		const items: U[] = await this.modelGeneric
			.find(query)
			.skip(page * pageSize)
			.limit(pageSize);
		const total: number = await this.modelGeneric.find(query).countDocuments();
		return { total, items };
	}
	async insertOperationGeneric(item: U): Promise<U> {
		const itemInserted: U = await this.modelGeneric.create(item);
		return itemInserted;
	}
	async updateOperationGeneric(query: any = {}, item: U): Promise<U> {
		const itemUpdated = await this.modelGeneric.findOneAndUpdate(query, item, {
			new: true,
		});
		return itemUpdated;
	}
	async deleteOperationGeneric(id: number | string): Promise<U> {
		const itemDeleted = await this.modelGeneric.findByIdAndUpdate(
			id,
			{
				isActive: false,
			},
			{ new: true }
		);
		return itemDeleted;
	}
}
