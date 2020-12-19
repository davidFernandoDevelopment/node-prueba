import { GenericUseCase } from './generic.usecase';

export abstract class GenericController<T> {
	constructor(private readonly usecaseGeneric: GenericUseCase<T>) {}
	async insertControllerGeneric(item: T): Promise<T> {
		return this.usecaseGeneric.insertUseCaseGeneric(item);
	}
	async updateControllerGeneric(query: any, item: T): Promise<T> {
		return this.usecaseGeneric.updateUseCaseGeneric(query, item);
	}
	async getControllerGeneric(query: any): Promise<T[]> {
		return this.usecaseGeneric.getUseCaseGeneric(query);
	}
	async getOneControllerGeneric(id: number | string): Promise<T> {
		return this.usecaseGeneric.getOneUseCaseGeneric(id);
	}
	async deleteControllerGeneric(id: number | string): Promise<T> {
		return this.usecaseGeneric.deleteUseCaseGeneric(id);
	}
	async getByPageControllerGeneric(
		query: any = {},
		page: number,
		pageSize: number
	): Promise<{ total: number; items: T[] }> {
		return this.usecaseGeneric.getByPageGeneric(query, page, pageSize);
	}
}
