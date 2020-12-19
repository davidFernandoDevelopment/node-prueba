import MedicModel from './medic.model';
import { GenericOperations } from '../../generics/generic.operations';
import { MedicType } from './medic.type';
import { MedicRepository } from '../domain/repositories/medic.repository';

export class MedicOperations
	extends GenericOperations<typeof MedicModel, MedicType>
	implements MedicRepository {
	constructor(private readonly model: typeof MedicModel) {
		super(model);
	}
	getLocation(): void {
		throw new Error('Method not implemented.');
	}
}
