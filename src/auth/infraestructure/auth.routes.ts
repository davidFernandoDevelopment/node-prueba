import express, { Response, Request } from 'express';
import { SchemaValidator } from '../../validators/schema.validator';
import { schemas as AuthSchema } from './auth.schema';
import { AuthController } from './auth.controller';
import { AuthUseCase } from '../application/auth.usecase';
import { AuthOperations } from './auth.operations';
import { UserEntity } from '../../user/domain/entities/user.entity';

const authOperations = new AuthOperations();
const authUseCase = new AuthUseCase(authOperations);
const authController = new AuthController(authUseCase);

const router = express.Router();

router.post(
	'/',
	SchemaValidator.validate(AuthSchema.LOGIN),
	async (req: Request, res: Response) => {
		const user: UserEntity = req.body;
		const result = await authController.loginController(user);
		if (result.status) {
			res.json(result);
		} else {
			res.status(404).send(result.message);
		}
	}
);

export { router };
