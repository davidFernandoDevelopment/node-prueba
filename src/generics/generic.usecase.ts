import { IRepository } from './generic.repository';

export abstract class GenericUseCase<T> {
	constructor(private readonly repositoryGeneric: IRepository<T>) {}

	async insertUseCaseGeneric(item: T): Promise<T> {
		return this.repositoryGeneric.insertOperationGeneric(item);
	}
	async updateUseCaseGeneric(query: any, item: T): Promise<T> {
		return this.repositoryGeneric.updateOperationGeneric(query, item);
	}
	async getUseCaseGeneric(query: any): Promise<T[]> {
		return this.repositoryGeneric.getAllOperationGeneric(query);
	}
	async getOneUseCaseGeneric(id: number | string): Promise<T> {
		return this.repositoryGeneric.getByIDOperationGeneric(id);
	}
	async deleteUseCaseGeneric(id: number | string): Promise<T> {
		return this.repositoryGeneric.deleteOperationGeneric(id);
	}
	async getByPageGeneric(
		query: any,
		page: number,
		pageSize: number
	): Promise<{ total: number; items: T[] }> {
		return this.repositoryGeneric.getByPageOperationGeneric(
			query,
			page,
			pageSize
		);
	}
}
