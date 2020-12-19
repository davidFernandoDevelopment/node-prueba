import { Request, Response, NextFunction } from 'express';

export class AuthorizationGuard {
	static conActivate(...rolesAllowed: Array<string>) {
		return (req: Request, res: Response, next: NextFunction) => {
			const { roles } = res.locals.payload;
			let flag = false;
			roles.forEach((role: { [s: string]: string }) => {
				if (rolesAllowed.indexOf(role.name) > -1) {
					flag = true;
					next();
					return;
				}
			});
			if (!flag) {
				res.status(409).send('User not authorized');
			}
		};
	}
}
