import express, { Request, Response } from 'express';

import { Errors } from '../../helper/error.helper';
import { RoleEntity } from '../domain/entities/role.entity';
import { validarId } from '../../validators/mongo.utils';
import { SchemaValidator } from '../../validators/schema.validator';
import { schemas as RoleSchema } from './role.schema';
import yenv from 'yenv';
import { RoleOperations } from './role.operations';
import roleModel from './role.model';
import { RoleUseCase } from '../application/role.usecase';
import { RoleController } from './role.controller';

const env = yenv();

// SE INSTANCIAN X CADA PETICION Y LUEGO SE DESTRUYE
const roleOperations = new RoleOperations(roleModel);
const roleUseCase = new RoleUseCase(roleOperations);
const roleController = new RoleController(roleUseCase);

const router = express.Router();

router.get(
	'/',
	Errors.handleError(async (req: Request, res: Response) => {
		const result = await roleController.getControllerGeneric({
			isActive: true,
		});
		res.json(result);
	})
);
router.get(
	'/:id',
	[validarId],
	Errors.handleError(async (req: Request, res: Response) => {
		const id = req.params.id;
		const result = await roleController.getOneControllerGeneric(id);
		res.json(result);
	})
);
router.post(
	'/',
	SchemaValidator.validate(RoleSchema.POST_INSERT),
	Errors.handleError(async (req: Request, res: Response) => {
		const user: RoleEntity = req.body;
		const result = await roleController.insertControllerGeneric(user);
		res.json(result);
	})
);
router.put(
	'/:id',
	[validarId, SchemaValidator.validate(RoleSchema.PUT_UPDATE)],
	Errors.handleError(async (req: Request, res: Response) => {
		const id = req.params.id;
		const user: RoleEntity = req.body;
		const result = await roleController.updateControllerGeneric(
			{ _id: id },
			user
		);
		res.json(result);
	})
);
router.delete(
	'/:id',
	[validarId],
	Errors.handleError(async (req: Request, res: Response) => {
		const id = req.params.id;
		const result = await roleController.deleteControllerGeneric(id);
		res.json(result);
	})
);
router.get(
	'/page/:page',
	[SchemaValidator.validate(RoleSchema.GET_PAGINATION)],
	Errors.handleError(async (req: Request, res: Response) => {
		const page: number = +req.params.page;
		const result = await roleController.getByPageControllerGeneric(
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

export { router };
