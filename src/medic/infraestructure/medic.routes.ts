import express, { Request, Response } from 'express';
import { MedicUseCase } from '../application/medic.usecase';
import { MedicController } from './medic.controller';
import { MedicOperations } from './medic.operations';
import { MedicEntity } from '../domain/entities/medic.entity';
import medicModel from './medic.model';
import { SchemaValidator } from '../../validators/schema.validator';
import { schemas as MedicSchema } from './medic.schema';
import { validarId } from '../../validators/mongo.utils';

import yenv from 'yenv';
import { Errors } from '../../helper/error.helper';
const env = yenv();

const medicOperations = new MedicOperations(medicModel);
const medicUseCase = new MedicUseCase(medicOperations);
const medicController = new MedicController(medicUseCase);

const router = express.Router();

router.get(
	'/',
	Errors.handleError(async (req: Request, res: Response) => {
		const result = await medicController.getControllerGeneric({
			isActive: true,
		});
		res.json(result);
	})
);
router.get(
	'/:id',
	Errors.handleError(async (req: Request, res: Response) => {
		const id: string = req.params.id;
		const result = await medicController.getOneControllerGeneric(id);
		res.json(result);
	})
);
router.post(
	'/',
	SchemaValidator.validate(MedicSchema.POST_INSERT),
	Errors.handleError(async (req: Request, res: Response) => {
		const medic: MedicEntity = req.body;
		const result = await medicController.insertControllerGeneric(medic);
		res.json(result);
	})
);
router.put(
	'/:id',
	[validarId, SchemaValidator.validate(MedicSchema.PUT_UPDATE)],
	Errors.handleError(async (req: Request, res: Response) => {
		const medic: MedicEntity = req.body;
		const id: string = req.params.id;
		const result = await medicController.updateControllerGeneric(
			{ _id: id },
			medic
		);
		res.json(result);
	})
);
router.delete(
	'/:id',
	[validarId],
	Errors.handleError(async (req: Request, res: Response) => {
		const id: string = req.params.id;
		const result = await medicController.deleteControllerGeneric(id);
		res.json(result);
	})
);
router.get(
	'/page/:page',
	SchemaValidator.validate(MedicSchema.GET_PAGINATION),
	Errors.handleError(async (req: Request, res: Response) => {
		const page = +req.params.page;
		const result = await medicController.getByPageControllerGeneric(
			{ isActive: false },
			page,
			env.PAGINATION
		);
		res.json({ status: 200, results: result });
	})
);

export { router };
