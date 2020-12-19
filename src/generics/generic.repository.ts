export interface IRepository<U> {
	insertOperationGeneric(item: U): Promise<U>;
	updateOperationGeneric(query: any, medic: U): Promise<U>;
	getAllOperationGeneric(query: any): Promise<U[]>;
	getByIDOperationGeneric(id: number | string): Promise<U>;
	getByPageOperationGeneric(
		query: any,
		page: number,
		pageSize: number
	): Promise<{ total: number; items: U[] }>;
	deleteOperationGeneric(id: number | string): Promise<U>;
}

// DEBE SER AGNOSTICA:
// NO NECESITO INDICARLE EL TIPO DE DATO DEL MODELO,
// XQ LA INTERFACE NO IMPLEMENTA
