import express, { Request, Response } from 'express';
import UserModel from './user.model';
import { UserOperations } from './user.operations';
import { UserUseCase } from '../application/user.usecase';
import { UserController } from './user.controller';
import { Errors } from '../../helper/error.helper';
import { UserEntity } from '../domain/entities/user.entity';
import { validarId } from '../../validators/mongo.utils';
import { SchemaValidator } from '../../validators/schema.validator';
import { schemas as UserSchema } from './user.schema';
import yenv from 'yenv';
import { AuthenticationGuard } from '../../guards/autenticacion.guard';
import { AuthorizationGuard } from '../../guards/authorizaton.guard';
import { Upload } from '../../middleware/upload.middleware';

const env = yenv();

const userOperations = new UserOperations(UserModel);
const userUseCase = new UserUseCase(userOperations);
const userController = new UserController(userUseCase);

const router = express.Router();

router.get(
	'/',
	[AuthenticationGuard.conActivate, AuthorizationGuard.conActivate('ADMIN')],
	Errors.handleError(async (req: Request, res: Response) => {
		const result = await userController.getControllerGeneric({
			isActive: true,
		});
		res.json(result);
	})
);
router.get(
	'/:id',
	[
		AuthenticationGuard.conActivate,
		AuthorizationGuard.conActivate('ADMIN'),
		validarId,
	],
	Errors.handleError(async (req: Request, res: Response) => {
		const id = req.params.id;
		const result = await userController.getOneControllerGeneric(id);
		res.json(result);
	})
);
router.post(
	'/',
	[Upload.S3('photo')],
	SchemaValidator.validate(UserSchema.POST_INSERT),
	Errors.handleError(async (req: Request, res: Response) => {
		const user: UserEntity = req.body;
		const result = await userController.insertControllerGeneric(user);
		res.json(result);
	})
);
router.put(
	'/:id',
	[
		AuthenticationGuard.conActivate,
		AuthorizationGuard.conActivate('ADMIN'),
		validarId,
		SchemaValidator.validate(UserSchema.PUT_UPDATE),
	],
	Errors.handleError(async (req: Request, res: Response) => {
		const id = req.params.id;
		const user: UserEntity = req.body;
		const result = await userController.updateControllerGeneric(
			{ _id: id },
			user
		);
		res.json(result);
	})
);
router.delete(
	'/:id',
	[
		AuthenticationGuard.conActivate,
		AuthorizationGuard.conActivate('ADMIN'),
		validarId,
	],
	Errors.handleError(async (req: Request, res: Response) => {
		const id = req.params.id;
		const result = await userController.deleteControllerGeneric(id);
		res.json(result);
	})
);
router.get(
	'/page/:page',
	[
		AuthenticationGuard.conActivate,
		AuthorizationGuard.conActivate('ADMIN'),
		SchemaValidator.validate(UserSchema.GET_PAGINATION),
	],
	Errors.handleError(async (req: Request, res: Response) => {
		const page: number = +req.params.page;
		const result = await userController.getByPageControllerGeneric(
			{
				isActive: true,
			},
			page,
			env.PAGINATION
		);
		res.json({
			status: 200,
			results: result,
		});
	})
);

router.post(
	'/upload/image',
	Upload.S3('photo'),
	async (req: Request, res: Response) => {
		res.json({ url: req.file.buffer });
	}
);

export { router };
