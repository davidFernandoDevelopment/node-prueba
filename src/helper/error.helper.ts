import { NextFunction, Response, Request } from 'express';

export interface IError extends Error {
	status?: number;
}

export class Errors {
	static handleError(
		fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
	) {
		return (req: Request, res: Response, next: NextFunction) =>
			fn(req, res, next).catch(err => {
				let error: IError;
				if (err['code']) {
					error = new Error('DATABASE ERROR');
					error.status = 500;
					error.message = err.name;
					error.stack = err;
				} else {
					error = new Error('ASYNC ERROR');
					error.status = err.status || 500;
					error.message = err.message;
					error.stack = err.stack;
				}

				next(error);
			});
	}
	static pathNotFound(req: Request, res: Response, next: NextFunction) {
		const error: IError = new Error('PATH NOT FOUND');
		error.status = 404;

		next(error);
	}
	static genericError(err: IError, req: Request, res: Response) {
		const objError: IError = {
			name: err.name,
			status: 500,
			message: err.message,
		};

		if (process.env.NODE_ENV === 'development') {
			objError.stack = err.stack;
		}

		res.status(500).json(objError);
	}
}
