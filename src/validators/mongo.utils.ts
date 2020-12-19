import { NextFunction, Request, Response } from 'express';

export function validarId(req: Request, res: Response, next: NextFunction) {
	const id = req.params.id;
	// regex = regular expressions
	if (id.match(/^[a-fA-F0-9]{24}$/) === null) {
		res.status(400).json({
			status: 400,
			result: `El id [${id}] suministrado en el URL no es válido`,
		});
		return;
	}
	next();
}
