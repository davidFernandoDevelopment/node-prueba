import { NextFunction, Request, Response } from 'express';
import { IError } from '../helper/error.helper';

export class SchemaValidator {
	static generateError(
		objError: {
			[s: string]: string | number;
		},
		next: NextFunction
	) {
		const error: IError = new Error(<string>objError.name);
		error.status = <number>objError.status;
		error.message = <string>objError.message;
		error.stack = <string>objError.stack;
		next(error);
	}
	static validate(schemaValidation: any) {
		return (req: Request, res: Response, next: NextFunction): Promise<any> => {
			const listContainerParameters = ['headers', 'body', 'params', 'query'];
			const listValidations: Array<Promise<any>> = [];
			listContainerParameters.forEach((container: string) => {
				if (schemaValidation['container']) {
					switch (container) {
						case 'body':
							listValidations.push(
								schemaValidation[container].validate(req.body)
							);
							break;
						case 'params':
							listValidations.push(
								schemaValidation[container].validate(req.params)
							);
							break;
						case 'query':
							listValidations.push(
								schemaValidation[container].validate(req.query)
							);
							break;
						case 'headers':
							listValidations.push(
								schemaValidation[container].validate(req.headers)
							);
							break;
					}
				}
			});
			return Promise.all(listValidations).then(
				results => {
					let hasError = false;
					results.forEach(result => {
						if (result.error && !hasError) {
							hasError = true;
							this.generateError(
								{
									status: 411,
									stack: result.error,
									name: 'PARAMETERS ERROR',
									message: 'ERROR IN PARAMETERS',
								},
								next
							);
						}
					});
					if (!hasError) next();
				},
				error => {
					this.generateError(
						{
							status: 411,
							stack: error.error,
							name: 'PARAMETERS ERROR',
							message: 'ERROR IN PARAMETERS',
						},
						next
					);
				}
			);
		};
	}
}

// schemaValidation: GENERAL PARA RECIBIR
// MAS DE 1 ESQUEMA DE VALIDACION
